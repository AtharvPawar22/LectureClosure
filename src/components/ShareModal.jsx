import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Link2, QrCode } from 'lucide-react';

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
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    zIndex: 1000,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2rem',
                        maxWidth: '480px',
                        width: '100%',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                                Quiz Ready! 🎉
                            </h2>
                            <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                                Share this link with your students
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: '1px solid #E5E7EB',
                                background: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <X size={18} style={{ color: '#6B7280' }} />
                        </button>
                    </div>

                    {/* Quiz Title */}
                    <div style={{
                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                        borderRadius: '14px',
                        padding: '1rem 1.25rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Link2 size={20} style={{ color: 'white' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500' }}>Quiz Title</div>
                            <div style={{ fontWeight: '600', color: '#1A1A2E' }}>{quizTitle}</div>
                        </div>
                    </div>

                    {/* URL Box */}
                    <div style={{
                        background: '#FAFBFC',
                        borderRadius: '14px',
                        border: '1px solid #E5E7EB',
                        padding: '1rem',
                        marginBottom: '1.5rem',
                    }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                            Share Link
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'center',
                        }}>
                            <input
                                type="text"
                                value={quizUrl}
                                readOnly
                                style={{
                                    flex: 1,
                                    padding: '0.875rem 1rem',
                                    borderRadius: '10px',
                                    border: '1px solid #E5E7EB',
                                    background: 'white',
                                    fontSize: '0.875rem',
                                    color: '#4B5563',
                                    outline: 'none',
                                }}
                            />
                            <motion.button
                                onClick={handleCopy}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    padding: '0.875rem 1.5rem',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: copied
                                        ? 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
                                        : 'linear-gradient(135deg, #4361EE 0%, #7C3AED 100%)',
                                    color: 'white',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'background 0.2s ease',
                                }}
                            >
                                {copied ? (
                                    <>
                                        <Check size={18} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={18} />
                                        Copy
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div style={{
                        background: '#FFFBEB',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid #FDE68A',
                    }}>
                        <div style={{ fontSize: '0.875rem', color: '#92400E', lineHeight: 1.6 }}>
                            <strong>💡 Tip:</strong> Students will enter their name before starting the quiz. Their scores will appear on the leaderboard automatically.
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ShareModal;
