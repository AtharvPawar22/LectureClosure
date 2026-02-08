import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Clock, HelpCircle, Loader2, AlertCircle, User } from 'lucide-react';
import { getQuiz } from '../services/quizService';

const QuizStart = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            const quizData = await getQuiz(id);
            if (quizData) {
                setQuiz(quizData);
            } else {
                setError('Quiz not found. The link may be invalid or expired.');
            }
            setLoading(false);
        };
        fetchQuiz();
    }, [id]);

    const handleStart = () => {
        if (!studentName.trim()) return;
        navigate(`/quiz/${id}`, {
            state: {
                studentName: studentName.trim(),
                quiz: quiz
            }
        });
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                    <Loader2 size={48} style={{ color: '#4361EE' }} />
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #FEF2F2 0%, #FFFFFF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        textAlign: 'center',
                        maxWidth: '400px',
                    }}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#FEE2E2',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                    }}>
                        <AlertCircle size={40} style={{ color: '#EF4444' }} />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1A1A2E' }}>
                        Quiz Not Found
                    </h1>
                    <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
                        {error}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-primary"
                        style={{ padding: '1rem 2rem' }}
                    >
                        Go to Home
                    </button>
                </motion.div>
            </div>
        );
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        return `${mins} minute${mins !== 1 ? 's' : ''}`;
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    maxWidth: '480px',
                    width: '100%',
                }}
            >
                {/* Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #E5E7EB',
                }}>
                    {/* Header Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                        padding: '0.5rem 1rem',
                        borderRadius: '999px',
                        marginBottom: '1.5rem',
                    }}>
                        <HelpCircle size={16} style={{ color: '#4361EE' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4361EE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Quiz Challenge
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        fontFamily: 'var(--font-display)',
                        color: '#1A1A2E',
                        lineHeight: 1.2,
                    }}>
                        {quiz.title}
                    </h1>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: '#F0FDF4',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <HelpCircle size={18} style={{ color: '#22C55E' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Questions</div>
                                <div style={{ fontWeight: '700', color: '#1A1A2E' }}>{quiz.questions?.length || 0}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                background: '#FFFBEB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Clock size={18} style={{ color: '#F59E0B' }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Time Limit</div>
                                <div style={{ fontWeight: '700', color: '#1A1A2E' }}>{formatTime(quiz.time_limit)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Name Input */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#4B5563',
                            marginBottom: '0.5rem',
                        }}>
                            Enter your name
                        </label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9CA3AF',
                            }} />
                            <input
                                type="text"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="Your name"
                                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 2.75rem',
                                    borderRadius: '14px',
                                    border: '2px solid #E5E7EB',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4361EE'}
                                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                            />
                        </div>
                    </div>

                    {/* Start Button */}
                    <motion.button
                        onClick={handleStart}
                        disabled={!studentName.trim()}
                        whileHover={studentName.trim() ? { scale: 1.02 } : {}}
                        whileTap={studentName.trim() ? { scale: 0.98 } : {}}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            fontSize: '1.125rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            opacity: studentName.trim() ? 1 : 0.5,
                            cursor: studentName.trim() ? 'pointer' : 'not-allowed',
                            boxShadow: studentName.trim() ? '0 8px 24px rgba(67, 97, 238, 0.3)' : 'none',
                        }}
                    >
                        <Play size={22} />
                        Start Quiz
                    </motion.button>

                    {/* Footer note */}
                    <p style={{
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: '#9CA3AF',
                        marginTop: '1.5rem',
                    }}>
                        Your score will appear on the leaderboard
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default QuizStart;
