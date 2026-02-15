import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Helper: wrap a promise with a timeout so it never hangs
 */
function withTimeout(promise, ms = 10000) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
        )
    ]);
}

/**
 * Helper: try to insert a quiz row. Uses .insert() WITHOUT .select().single()
 * to avoid the Supabase hang when RLS silently blocks the insert.
 * Then fetches the latest quiz by title to get the ID.
 */
async function tryInsertQuiz(insertData) {
    try {
        console.log('Inserting quiz:', JSON.stringify({ ...insertData, questions: `[${insertData.questions?.length} questions]` }));

        const { error } = await withTimeout(
            supabase.from('quizzes').insert([insertData]),
            8000
        );

        if (error) {
            console.warn('Insert returned error:', error.message, error.code);
            return { data: null, error };
        }

        // Insert succeeded (no error). Now fetch the quiz we just created.
        const { data: rows, error: fetchError } = await withTimeout(
            supabase
                .from('quizzes')
                .select('id')
                .eq('title', insertData.title)
                .order('created_at', { ascending: false })
                .limit(1),
            8000
        );

        if (fetchError || !rows || rows.length === 0) {
            console.warn('Insert reported success but quiz not found. RLS may have blocked it silently.');
            return { data: null, error: fetchError || new Error('Quiz not found after insert') };
        }

        return { data: rows[0], error: null };
    } catch (err) {
        console.warn('tryInsertQuiz caught error:', err.message);
        return { data: null, error: err };
    }
}

/**
 * Create a new quiz and save to Supabase
 * @param {Object} quizData - { title, questions, timeLimit, teacherId }
 * @returns {Promise<{id: string} | null>}
 */
export async function createQuiz({ title, questions, timeLimit = 600, teacherId = null }) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Quiz will not be saved.');
        return null;
    }

    try {
        // ── Attempt 1: Insert with teacher_id ──
        if (teacherId) {
            console.log('Attempt 1: Creating quiz with teacher_id:', teacherId);
            const { data, error } = await tryInsertQuiz({
                title, questions, time_limit: timeLimit, teacher_id: teacherId
            });

            if (data) {
                console.log('✅ Quiz created successfully:', data.id);
                return data;
            }

            console.warn('Attempt 1 failed:', error?.message);

            // ── Attempt 2: Auto-fix missing teacher profile, then retry ──
            console.log('Attempt 2: Checking if teacher profile exists...');
            try {
                const { data: { user } } = await withTimeout(supabase.auth.getUser(), 5000);
                if (user && user.id === teacherId) {
                    const { data: teacher } = await withTimeout(
                        supabase.from('teachers').select('id').eq('id', teacherId).maybeSingle(),
                        5000
                    );

                    if (!teacher) {
                        console.log('Teacher profile missing — creating it now...');
                        await withTimeout(
                            supabase.from('teachers').insert([{
                                id: teacherId,
                                email: user.email,
                                full_name: user.user_metadata?.full_name || 'Teacher'
                            }]),
                            5000
                        );
                        console.log('Teacher profile created. Retrying quiz insert...');

                        const { data: retryData } = await tryInsertQuiz({
                            title, questions, time_limit: timeLimit, teacher_id: teacherId
                        });

                        if (retryData) {
                            console.log('✅ Quiz created after auto-fix:', retryData.id);
                            return retryData;
                        }
                    }
                }
            } catch (autoFixErr) {
                console.warn('Auto-fix attempt failed:', autoFixErr.message);
            }
        }

        // ── Attempt 3: Insert WITHOUT teacher_id ──
        console.log('Attempt 3: Creating quiz without teacher_id...');
        const { data: fallbackData, error: fallbackError } = await tryInsertQuiz({
            title, questions, time_limit: timeLimit
        });

        if (fallbackData) {
            console.log('✅ Quiz created (no teacher_id):', fallbackData.id);
            return fallbackData;
        }

        console.error('❌ All 3 attempts failed. Last error:', fallbackError?.message);
        return null;
    } catch (err) {
        console.error('❌ Unexpected error creating quiz:', err.message);
        return null;
    }
}

/**
 * Get a quiz by ID
 * @param {string} id - Quiz ID
 * @returns {Promise<Object | null>}
 */
export async function getQuiz(id) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Cannot fetch quiz.');
        return null;
    }

    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching quiz:', error);
        return null;
    }

    return data;
}

/**
 * Save a quiz attempt
 * @param {Object} attemptData - { quizId, studentName, score, total, timeTaken }
 * @returns {Promise<Object | null>}
 */
export async function saveAttempt({ quizId, studentName, score, total, timeTaken }) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Attempt will not be saved.');
        return null;
    }

    const { data, error } = await supabase
        .from('attempts')
        .insert([
            {
                quiz_id: quizId,
                student_name: studentName,
                score,
                total,
                time_taken: timeTaken
            }
        ])
        .select()
        .single();

    if (error) {
        console.error('Error saving attempt:', error);
        return null;
    }

    return data;
}

/**
 * Get leaderboard for a quiz (sorted by score desc, then time asc)
 * @param {string} quizId - Quiz ID
 * @returns {Promise<Array>}
 */
export async function getLeaderboard(quizId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Returning empty leaderboard.');
        return [];
    }

    const { data, error } = await supabase
        .from('attempts')
        .select('*')
        .eq('quiz_id', quizId)
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true });

    if (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }

    return data || [];
}

/**
 * Generate shareable quiz URL
 * @param {string} quizId - Quiz ID
 * @returns {string}
 */
export function getQuizShareUrl(quizId) {
    return `${window.location.origin}/quiz/${quizId}/start`;
}

/**
 * Get all quizzes for a specific teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<Array>}
 */
export async function getTeacherQuizzes(teacherId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Returning empty quizzes list.');
        return [];
    }

    const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching teacher quizzes:', error);
        return [];
    }

    return data || [];
}

/**
 * Get quiz count stats for a teacher
 * @param {string} teacherId - Teacher's user ID
 * @returns {Promise<{totalQuizzes: number, totalAttempts: number}>}
 */
export async function getTeacherStats(teacherId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Returning zero stats.');
        return { totalQuizzes: 0, totalAttempts: 0 };
    }

    // Get quizzes
    const { data: quizzes, error: quizError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('teacher_id', teacherId);

    if (quizError) {
        console.error('Error fetching stats:', quizError);
        return { totalQuizzes: 0, totalAttempts: 0 };
    }

    const quizIds = quizzes?.map(q => q.id) || [];

    if (quizIds.length === 0) {
        return { totalQuizzes: 0, totalAttempts: 0 };
    }

    // Get attempts for those quizzes
    const { count, error: attemptError } = await supabase
        .from('attempts')
        .select('*', { count: 'exact', head: true })
        .in('quiz_id', quizIds);

    if (attemptError) {
        console.error('Error fetching attempt stats:', attemptError);
        return { totalQuizzes: quizIds.length, totalAttempts: 0 };
    }

    return {
        totalQuizzes: quizIds.length,
        totalAttempts: count || 0
    };
}

/**
 * Update a quiz
 * @param {string} quizId - Quiz ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object | null>}
 */
export async function updateQuiz(quizId, updates) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Quiz will not be updated.');
        return null;
    }

    const { data, error } = await supabase
        .from('quizzes')
        .update(updates)
        .eq('id', quizId)
        .select()
        .single();

    if (error) {
        console.error('Error updating quiz:', error);
        return null;
    }

    return data;
}

/**
 * Delete a quiz
 * @param {string} quizId - Quiz ID
 * @returns {Promise<boolean>}
 */
export async function deleteQuiz(quizId) {
    if (!isSupabaseConfigured) {
        console.warn('Supabase not configured. Quiz will not be deleted.');
        return false;
    }

    const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quizId);

    if (error) {
        console.error('Error deleting quiz:', error);
        return false;
    }

    return true;
}
