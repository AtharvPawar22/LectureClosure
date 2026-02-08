import { supabase } from '../lib/supabase';

/**
 * Create a new quiz and save to Supabase
 * @param {Object} quizData - { title, questions, timeLimit }
 * @returns {Promise<{id: string} | null>}
 */
export async function createQuiz({ title, questions, timeLimit = 600 }) {
    const { data, error } = await supabase
        .from('quizzes')
        .insert([
            {
                title,
                questions,
                time_limit: timeLimit
            }
        ])
        .select('id')
        .single();

    if (error) {
        console.error('Error creating quiz:', error);
        return null;
    }

    return data;
}

/**
 * Get a quiz by ID
 * @param {string} id - Quiz ID
 * @returns {Promise<Object | null>}
 */
export async function getQuiz(id) {
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
