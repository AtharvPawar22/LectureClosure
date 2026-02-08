import { supabase } from '../lib/supabase';

/**
 * Sign up a new teacher
 */
export const signUp = async ({ email, password, fullName }) => {
    try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) throw authError;

        // Create teacher profile
        if (authData.user) {
            const { error: profileError } = await supabase
                .from('teachers')
                .insert({
                    id: authData.user.id,
                    email: email,
                    full_name: fullName,
                });

            if (profileError) throw profileError;
        }

        return { user: authData.user, error: null };
    } catch (error) {
        console.error('Signup error:', error);
        return { user: null, error: error.message };
    }
};

/**
 * Sign in an existing teacher
 */
export const signIn = async ({ email, password }) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        return { user: data.user, session: data.session, error: null };
    } catch (error) {
        console.error('Login error:', error);
        return { user: null, session: null, error: error.message };
    }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Logout error:', error);
        return { error: error.message };
    }
};

/**
 * Get current session
 */
export const getSession = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return { session, error: null };
    } catch (error) {
        console.error('Session error:', error);
        return { session: null, error: error.message };
    }
};

/**
 * Get current user
 */
export const getCurrentUser = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        console.error('Get user error:', error);
        return { user: null, error: error.message };
    }
};

/**
 * Get teacher profile
 */
export const getTeacherProfile = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return { profile: data, error: null };
    } catch (error) {
        console.error('Get profile error:', error);
        return { profile: null, error: error.message };
    }
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange(callback);
};
