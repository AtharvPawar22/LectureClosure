import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, profile, signOut, loading } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Create', path: '/create' },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <>
            {/* Desktop Header - Clean, Static, macOS-inspired */}
            <header className="desktop-header" style={{
                position: 'relative',
                padding: '1.25rem 0',
                background: 'transparent',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: '#2D8B75',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <GraduationCap size={18} style={{ color: 'white' }} />
                        </div>
                        <span style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#1A1A1A',
                            letterSpacing: '-0.02em',
                        }}>
                            LectureClosure
                        </span>
                    </Link>

                    {/* Center Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        fontSize: '0.9375rem',
                                        fontWeight: '500',
                                        color: isActive ? '#1A1A1A' : '#7A7A7A',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                        position: 'relative',
                                    }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-4px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                background: '#1A1A1A',
                                                borderRadius: '1px',
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right - Auth */}
                    {!loading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {isAuthenticated ? (
                                <>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '6px 12px 6px 8px',
                                        background: '#F5F5F5',
                                        borderRadius: '20px',
                                    }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <User size={12} style={{ color: 'white' }} />
                                        </div>
                                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1A1A1A' }}>
                                            {profile?.full_name?.split(' ')[0] || 'Account'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#7A7A7A',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        style={{
                                            padding: '8px 16px',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#7A7A7A',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        style={{
                                            padding: '10px 20px',
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            background: '#2D8B75',
                                            color: 'white',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Header - Floating Island Style */}
            <header className="mobile-header" style={{
                display: 'none',
                position: 'fixed',
                top: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                width: 'auto',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'rgba(10, 10, 10, 0.9)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '50px',
                        padding: '6px 6px 6px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <GraduationCap size={14} style={{ color: 'white' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white' }}>
                            Closure
                        </span>
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                        }}
                    >
                        {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </motion.div>

                {/* Mobile Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '240px',
                                background: 'rgba(10, 10, 10, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '8px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        display: 'block',
                                        padding: '12px 14px',
                                        fontSize: '0.9375rem',
                                        fontWeight: '500',
                                        color: location.pathname === link.path ? 'white' : 'rgba(255, 255, 255, 0.6)',
                                        textDecoration: 'none',
                                        borderRadius: '12px',
                                        background: location.pathname === link.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '8px 12px' }} />

                            {isAuthenticated ? (
                                <button
                                    onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px',
                                        fontSize: '0.9375rem',
                                        fontWeight: '500',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '12px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        display: 'block',
                                        padding: '12px 14px',
                                        fontSize: '0.9375rem',
                                        fontWeight: '600',
                                        color: '#0A0A0A',
                                        background: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '12px',
                                        textAlign: 'center',
                                    }}
                                >
                                    Get Started
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-header { display: none !important; }
                    .mobile-header { display: block !important; }
                }
                @media (min-width: 769px) {
                    .desktop-header { display: block !important; }
                    .mobile-header { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default Header;
