import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
    console.warn('Supabase credentials not found. Running in demo mode.');
}

// Create Supabase client
// NOTE: persistSession is disabled to prevent GoTrueClient localStorage deadlock
// that causes ALL Supabase operations (queries, inserts) to hang indefinitely.
export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        },
    })
    : null;

