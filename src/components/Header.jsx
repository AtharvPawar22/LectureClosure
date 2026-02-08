import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Create Quiz', path: '/create' },
    ];

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '0.875rem 0',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1.5rem',
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: '#1A1A1A',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}>
                        <GraduationCap size={18} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1A1A1A',
                        letterSpacing: '-0.02em',
                    }}>
                        LectureClosure
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: location.pathname === link.path ? '#1A1A1A' : '#6B6B6B',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                                letterSpacing: '0.01em',
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/create"
                        style={{
                            padding: '0.625rem 1.25rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            background: '#1A1A1A',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Get Started
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none',
                        padding: '0.5rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#1A1A1A',
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mobile-nav"
                        style={{
                            display: 'none',
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(16px)',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                            padding: '1rem 1.5rem',
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '0.875rem 0',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    color: '#1A1A1A',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/create"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                marginTop: '1rem',
                                padding: '1rem',
                                background: '#1A1A1A',
                                color: 'white',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '500',
                            }}
                        >
                            Get Started
                        </Link>
                    </motion.nav>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                    .mobile-nav { display: flex !important; flex-direction: column; }
                }
            `}</style>
        </header>
    );
};

export default Header;
