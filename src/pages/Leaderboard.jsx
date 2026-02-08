import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Search, ArrowLeft, Share2, Download, Crown, TrendingUp, TrendingDown, Minus, Clock, Target, Users, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';
import { getLeaderboard, getQuiz, getQuizShareUrl } from '../services/quizService';

const Leaderboard = () => {
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [leaders, setLeaders] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [quizData, leaderboardData] = await Promise.all([
                getQuiz(id),
                getLeaderboard(id)
            ]);
            setQuiz(quizData);
            // Transform leaderboard data
            const formattedLeaders = leaderboardData.map((attempt, idx) => ({
                rank: idx + 1,
                name: attempt.student_name,
                score: Math.round((attempt.score / attempt.total) * 1000), // Score out of 1000
                time: formatTime(attempt.time_taken),
                rawScore: attempt.score,
                total: attempt.total,
                trend: 'same',
                avatar: getInitials(attempt.student_name),
            }));
            setLeaders(formattedLeaders);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleShare = async () => {
        const url = getQuizShareUrl(id);
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const filteredLeaders = leaders.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const TrendIcon = ({ trend }) => {
        if (trend === 'up') return <TrendingUp size={16} style={{ color: '#22C55E' }} />;
        if (trend === 'down') return <TrendingDown size={16} style={{ color: '#EF4444' }} />;
        return <Minus size={16} style={{ color: '#9CA3AF' }} />;
    };

    const podiumOrder = leaders.length >= 3
        ? [leaders[1], leaders[0], leaders[2]]
        : leaders.length === 2
            ? [null, leaders[0], leaders[1]]
            : leaders.length === 1
                ? [null, leaders[0], null]
                : [];

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F9FF 0%, #FFFFFF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader2 size={48} style={{ color: '#4361EE' }} />
                </motion.div>
            </div>
        );
    }

    const avgScore = leaders.length > 0
        ? Math.round(leaders.reduce((acc, l) => acc + l.score, 0) / leaders.length)
        : 0;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FAFBFC 0%, #FFFFFF 100%)', padding: '2rem 0 4rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                {/* Back Link */}
                <Link
                    to="/dashboard"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#6B7280',
                        marginBottom: '2rem',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                    }}
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>

                {/* Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4361EE', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            Quiz Results
                        </div>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                            {quiz?.title || 'Quiz Leaderboard'}
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '1.125rem' }}>
                            Live leaderboard • <AnimatedCounter value={leaders.length} duration={1} /> students participated
                        </p>
                    </motion.div>
                </div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '3rem' }}
                >
                    {[
                        { label: 'Avg Score', value: avgScore, icon: Target, color: '#4361EE', bg: '#EEF2FF' },
                        { label: 'Fastest', value: leaders[0]?.time || '--', icon: Clock, color: '#22C55E', bg: '#F0FDF4' },
                        { label: 'Participants', value: leaders.length, icon: Users, color: '#F59E0B', bg: '#FFFBEB' },
                    ].map((stat, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'white',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                border: '1px solid #F3F4F6',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <stat.icon size={14} style={{ color: stat.color }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '600' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1A1A2E' }}>
                                {typeof stat.value === 'number' ? <AnimatedCounter value={stat.value} duration={1.5} /> : stat.value}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Podium - Only show if we have entries */}
                {leaders.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '0.75rem',
                            marginBottom: '3rem',
                            padding: '2rem 0',
                        }}
                    >
                        {podiumOrder.map((leader, idx) => {
                            if (!leader) return <div key={idx} />;

                            const isFirst = idx === 1;
                            const isSecond = idx === 0;
                            const isThird = idx === 2;

                            const heights = { first: 180, second: 140, third: 110 };
                            const height = isFirst ? heights.first : isSecond ? heights.second : heights.third;

                            const colors = {
                                first: { bg: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)', border: '#FCD34D', accent: '#F59E0B' },
                                second: { bg: 'linear-gradient(180deg, #F3F4F6 0%, #E5E7EB 100%)', border: '#D1D5DB', accent: '#6B7280' },
                                third: { bg: 'linear-gradient(180deg, #FED7AA 0%, #FDBA74 100%)', border: '#FB923C', accent: '#EA580C' },
                            };
                            const color = isFirst ? colors.first : isSecond ? colors.second : colors.third;

                            return (
                                <div key={leader.rank} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {/* Crown/Medal */}
                                    <motion.div
                                        initial={{ scale: 0, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.1, type: 'spring' }}
                                        style={{ marginBottom: '0.75rem' }}
                                    >
                                        {isFirst ? (
                                            <Crown size={36} style={{ color: '#F59E0B', filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.4))' }} />
                                        ) : (
                                            <Medal size={28} style={{ color: color.accent }} />
                                        )}
                                    </motion.div>

                                    {/* Avatar */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                                        style={{
                                            width: isFirst ? '64px' : '52px',
                                            height: isFirst ? '64px' : '52px',
                                            borderRadius: '50%',
                                            background: color.bg,
                                            border: `3px solid ${color.border}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '700',
                                            fontSize: isFirst ? '1.25rem' : '1rem',
                                            color: color.accent,
                                            marginBottom: '0.5rem',
                                            boxShadow: isFirst ? '0 8px 24px rgba(245, 158, 11, 0.3)' : 'none',
                                        }}
                                    >
                                        {leader.avatar}
                                    </motion.div>

                                    {/* Name & Score */}
                                    <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                                        <div style={{ fontWeight: '700', fontSize: isFirst ? '1rem' : '0.875rem', color: '#1A1A2E' }}>
                                            {leader.name.split(' ')[0]}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: color.accent, fontWeight: '600' }}>
                                            {leader.score} pts
                                        </div>
                                    </div>

                                    {/* Podium Bar */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height }}
                                        transition={{ delay: 0.3 + idx * 0.15, duration: 0.8, ease: 'easeOut' }}
                                        style={{
                                            width: '100%',
                                            background: color.bg,
                                            borderRadius: '12px 12px 0 0',
                                            border: `1px solid ${color.border}`,
                                            borderBottom: 'none',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center',
                                            paddingBottom: '1rem',
                                            boxShadow: isFirst ? '0 -4px 20px rgba(245, 158, 11, 0.2)' : 'none',
                                        }}
                                    >
                                        <span style={{
                                            fontSize: isFirst ? '2rem' : '1.5rem',
                                            fontWeight: '800',
                                            color: color.accent,
                                        }}>
                                            {isFirst ? '1st' : isSecond ? '2nd' : '3rd'}
                                        </span>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}
                >
                    <button
                        onClick={handleShare}
                        className="btn btn-outline"
                        style={{ flex: 1, minWidth: '140px', padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <Share2 size={18} />
                        {copied ? 'Link Copied!' : 'Share Quiz'}
                    </button>
                    <button className="btn btn-primary" style={{ flex: 1, minWidth: '140px', padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Download size={18} />
                        Export CSV
                    </button>
                </motion.div>

                {/* Full Rankings Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        background: 'white',
                        borderRadius: '20px',
                        border: '1px solid #E5E7EB',
                        overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    }}
                >
                    {/* Table Header */}
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Full Rankings</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                            <input
                                type="text"
                                placeholder="Find a student..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '0.625rem 1rem 0.625rem 2.25rem',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '10px',
                                    fontSize: '0.875rem',
                                    width: '200px',
                                    outline: 'none',
                                }}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        {filteredLeaders.length === 0 ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                                {leaders.length === 0 ? 'No attempts yet. Share the quiz to get started!' : 'No students found matching your search.'}
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#FAFBFC' }}>
                                        <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rank</th>
                                        <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student</th>
                                        <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score</th>
                                        <th style={{ padding: '0.875rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</th>
                                        <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trend</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeaders.map((student, idx) => {
                                        return (
                                            <motion.tr
                                                key={student.rank}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7 + idx * 0.05 }}
                                                style={{
                                                    borderBottom: '1px solid #F3F4F6',
                                                    background: 'transparent',
                                                }}
                                            >
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <span style={{
                                                        fontFamily: 'monospace',
                                                        fontWeight: '700',
                                                        color: student.rank <= 3 ? '#4361EE' : '#9CA3AF',
                                                        fontSize: '0.875rem',
                                                    }}>
                                                        #{student.rank}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                        <div style={{
                                                            width: '36px',
                                                            height: '36px',
                                                            borderRadius: '10px',
                                                            background: '#F3F4F6',
                                                            color: '#6B7280',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: '600',
                                                            fontSize: '0.75rem',
                                                        }}>
                                                            {student.avatar}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontWeight: '600', color: '#1A1A2E' }}>
                                                                {student.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1rem 1.5rem' }}>
                                                    <span style={{ fontWeight: '700', color: '#4361EE' }}>{student.score}</span>
                                                </td>
                                                <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>{student.time}</td>
                                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                                    <TrendIcon trend={student.trend} />
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Leaderboard;
