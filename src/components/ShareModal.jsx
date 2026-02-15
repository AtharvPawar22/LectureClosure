import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Link2, MessageCircle, Mail } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, quizUrl, quizTitle }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(quizUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareWhatsApp = () => {
        const text = `Hey class! Here's the quiz for today: ${quizTitle || 'Quiz'}. Take it at: ${quizUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareEmail = () => {
        const subject = `Quiz: ${quizTitle || 'Lecture Closer'}`;
        const body = `Hi students,\n\nPlease complete this quiz using the following link:\n${quizUrl}\n\nGood luck!`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    zIndex: 1000,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-primary)',
                        borderRadius: '6px',
                        padding: '2rem',
                        maxWidth: '440px',
                        width: '100%',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.5rem',
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontFamily: 'var(--font-display)',
                                fontWeight: '400',
                                color: 'var(--text-primary)',
                                marginBottom: '0.25rem',
                            }}>
                                Quiz ready
                            </h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
                                Share this link with your students.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-primary)',
                                background: 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-dim)',
                            }}
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Quiz Title */}
                    <div style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        padding: '0.875rem 1rem',
                        marginBottom: '1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                    }}>
                        <Link2 size={16} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                        <div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-dim)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Quiz
                            </div>
                            <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                                {quizTitle}
                            </div>
                        </div>
                    </div>

                    {/* URL + Copy */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '1.5rem',
                    }}>
                        <input
                            type="text"
                            value={quizUrl}
                            readOnly
                            style={{
                                flex: 1,
                                fontSize: '0.8125rem',
                                padding: '0.625rem 0.875rem',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-primary)',
                                borderRadius: '4px',
                                color: 'var(--text-secondary)',
                            }}
                        />
                        <button
                            onClick={handleCopy}
                            className={copied ? 'btn' : 'btn btn-primary'}
                            style={{
                                padding: '0.625rem 1rem',
                                fontSize: '0.8125rem',
                                flexShrink: 0,
                                background: copied ? 'var(--success)' : undefined,
                                color: copied ? '#fff' : undefined,
                                minWidth: '90px',
                                justifyContent: 'center',
                            }}
                        >
                            {copied ? (
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    <Check size={14} />
                                    Copied
                                </motion.div>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>

                    {/* Social Buttons */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem',
                        marginBottom: '1.5rem',
                    }}>
                        <button
                            onClick={shareWhatsApp}
                            className="btn btn-outline"
                            style={{
                                padding: '0.75rem',
                                fontSize: '0.8125rem',
                                gap: '0.625rem',
                                color: 'var(--success)',
                                borderColor: 'var(--success-muted)',
                            }}
                        >
                            <MessageCircle size={16} />
                            WhatsApp
                        </button>
                        <button
                            onClick={shareEmail}
                            className="btn btn-outline"
                            style={{
                                padding: '0.75rem',
                                fontSize: '0.8125rem',
                                gap: '0.625rem',
                            }}
                        >
                            <Mail size={16} />
                            Email
                        </button>
                    </div>

                    {/* Tip */}
                    <p style={{
                        fontSize: '0.6875rem',
                        color: 'var(--text-dim)',
                        lineHeight: 1.6,
                        background: 'var(--bg-secondary)',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        borderLeft: '2px solid var(--accent)',
                    }}>
                        <strong>Tip:</strong> Students will enter their name before starting. Scores appear on the leaderboard automatically.
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ShareModal;

