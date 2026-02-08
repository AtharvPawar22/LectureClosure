import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, getSession, getTeacherProfile, signOut as authSignOut } from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check initial session
        const initAuth = async () => {
            const { session } = await getSession();
            if (session?.user) {
                setUser(session.user);
                const { profile } = await getTeacherProfile(session.user.id);
                setProfile(profile);
            }
            setLoading(false);
        };

        initAuth();

        // Subscribe to auth changes
        const { data: { subscription } } = onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                const { profile } = await getTeacherProfile(session.user.id);
                setProfile(profile);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        await authSignOut();
        setUser(null);
        setProfile(null);
    };

    const value = {
        user,
        profile,
        loading,
        signOut,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
