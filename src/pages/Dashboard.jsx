import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Users, BarChart2, Share2, Trash2, ExternalLink, TrendingUp, Clock, Sparkles, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';
import { useAuth } from '../context/AuthContext';
import { getTeacherQuizzes, getTeacherStats, getQuizShareUrl } from '../services/quizService';

const Dashboard = () => {
    const { user, profile } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [stats, setStats] = useState({ totalQuizzes: 0, totalAttempts: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!user?.id) return;

            setLoading(true);
            const [quizzesData, statsData] = await Promise.all([
                getTeacherQuizzes(user.id),
                getTeacherStats(user.id)
            ]);
            setQuizzes(quizzesData);
            setStats(statsData);
            setLoading(false);
        };

        loadData();
    }, [user?.id]);

    const filteredQuizzes = quizzes.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const statsCards = [
        {
            label: 'Total Quizzes',
            value: stats.totalQuizzes,
            icon: FileText,
            gradient: 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)',
            bgLight: '#EEF2FF',
        },
        {
            label: 'Total Attempts',
            value: stats.totalAttempts,
            icon: Users,
            gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
            bgLight: '#F3E8FF',
        },
    ];

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Loader2 size={48} style={{ color: '#4361EE', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)', padding: '2rem 0 4rem' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem' }}
                >
                    <div>
                        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                            Welcome back, {profile?.full_name?.split(' ')[0] || 'Professor'}!
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
                            Here's what's happening with your quizzes.
                        </p>
                    </div>
                    <Link
                        to="/create"
                        className="btn btn-primary"
                        style={{
                            padding: '1rem 1.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 8px 24px rgba(67, 97, 238, 0.25)',
                        }}
                    >
                        <Plus size={20} />
                        Create New Quiz
                    </Link>
                </motion.div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    {statsCards.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            style={{
                                background: 'white',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                border: '1px solid #E5E7EB',
                                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                            }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                background: stat.gradient,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(67, 97, 238, 0.2)',
                            }}>
                                <stat.icon size={24} style={{ color: 'white' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.25rem' }}>{stat.label}</p>
                                <p style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                                    <AnimatedCounter value={stat.value} />
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quizzes Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                            Your Quizzes
                        </h2>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                            <input
                                type="text"
                                placeholder="Search quizzes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                                    borderRadius: '12px',
                                    border: '2px solid #E5E7EB',
                                    width: '280px',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4361EE'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                            />
                        </div>
                    </div>

                    {filteredQuizzes.length === 0 ? (
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            border: '1px solid #E5E7EB',
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#EEF2FF',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }}>
                                <FileText size={32} style={{ color: '#4361EE' }} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                {searchQuery ? 'No quizzes found' : 'No quizzes yet'}
                            </h3>
                            <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                                {searchQuery ? 'Try a different search term' : 'Create your first quiz to get started!'}
                            </p>
                            {!searchQuery && (
                                <Link to="/create" className="btn btn-primary" style={{ padding: '0.875rem 1.5rem' }}>
                                    <Plus size={18} />
                                    Create Quiz
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {filteredQuizzes.map((quiz, idx) => (
                                <motion.div
                                    key={quiz.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ backgroundColor: '#FAFBFC' }}
                                    style={{
                                        background: 'white',
                                        borderRadius: '16px',
                                        padding: '1.25rem 1.5rem',
                                        border: '1px solid #E5E7EB',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: '1rem',
                                        transition: 'background-color 0.2s',
                                    }}
                                >
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                            {quiz.title}
                                        </h3>
                                        <p style={{ fontSize: '0.875rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Calendar size={14} />
                                            {formatDate(quiz.created_at)}
                                            <span style={{ margin: '0 0.5rem' }}>•</span>
                                            {quiz.questions?.length || 0} questions
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(getQuizShareUrl(quiz.id))}
                                            style={{
                                                padding: '0.5rem',
                                                background: '#EEF2FF',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            title="Copy share link"
                                        >
                                            <Share2 size={16} style={{ color: '#4361EE' }} />
                                        </button>
                                        <Link
                                            to={`/leaderboard/${quiz.id}`}
                                            style={{
                                                padding: '0.5rem',
                                                background: '#F0FDF4',
                                                border: 'none',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            title="View leaderboard"
                                        >
                                            <BarChart2 size={16} style={{ color: '#22C55E' }} />
                                        </Link>
                                        <Link
                                            to={`/quiz/${quiz.id}/start`}
                                            style={{
                                                padding: '0.5rem',
                                                background: '#F3F4F6',
                                                border: 'none',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            title="Preview quiz"
                                        >
                                            <ExternalLink size={16} style={{ color: '#6B7280' }} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
