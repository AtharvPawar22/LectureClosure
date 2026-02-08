import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Sparkles, Share2, Trophy, BarChart3, Download, MessageCircle, Users, Clock, Check, Star, GraduationCap, Zap, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

/*
 * 60-30-10 Color Rule:
 * 60% - Warm white/cream (#FDFBF7)
 * 30% - Soft sage green (#E8F0EC) + Light backgrounds
 * 10% - Deep teal accent (#2D7A6E) for CTAs, highlights
 */

const Landing = () => {
    const accentPrimary = '#2D7A6E';    // Deep teal (10% - CTAs, highlights)
    const accentLight = '#E8F0EC';       // Soft sage (30% - backgrounds)
    const textPrimary = '#2C3E50';       // Warm charcoal
    const textSecondary = '#5D6D7E';     // Muted blue-gray
    const bgPrimary = '#FDFBF7';         // Warm cream white (60%)
    const bgCard = '#FFFFFF';

    const features = [
        { icon: Trophy, title: "Live Leaderboards", desc: "Watch students compete in real-time with engaging rankings." },
        { icon: BarChart3, title: "Smart Analytics", desc: "Detailed insights on student performance and progress." },
        { icon: Share2, title: "One-Click Share", desc: "Send via WhatsApp, email, or Google Classroom instantly." },
        { icon: Download, title: "Export Anywhere", desc: "Download as PDF, Word, or print-ready format." },
        { icon: Users, title: "Teacher Dashboard", desc: "Manage all your quizzes and classes in one place." },
        { icon: MessageCircle, title: "WhatsApp Ready", desc: "Built specifically for Indian classrooms." },
    ];

    const testimonials = [
        { name: "Priya Sharma", role: "Math Teacher, Delhi Public School", quote: "LectureClosure saves me 2+ hours every week. The leaderboard feature keeps my students motivated!", avatar: "PS" },
        { name: "Rahul Mehta", role: "Science Faculty, Pune", quote: "Finally, a tool that understands Indian educators. The WhatsApp sharing is brilliant.", avatar: "RM" },
        { name: "Anita Desai", role: "English Teacher, Mumbai", quote: "My class participation has doubled since I started using live quizzes. Parents love the reports!", avatar: "AD" },
    ];

    return (
        <div style={{ background: bgPrimary, minHeight: '100vh' }}>

            {/* Hero Section - Modern Split Layout */}
            <section style={{ padding: '5rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Eyebrow */}
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: accentPrimary,
                            marginBottom: '1rem',
                        }}>
                            AI Quiz Generator for Teachers
                        </div>

                        {/* Headline */}
                        <h1 style={{
                            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                            lineHeight: 1.1,
                            fontFamily: 'var(--font-display)',
                            fontWeight: '700',
                            color: textPrimary,
                            marginBottom: '1.25rem',
                        }}>
                            Create Quizzes<br />
                            <span style={{ color: accentPrimary }}>in Seconds</span>
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: '1.0625rem',
                            color: textSecondary,
                            lineHeight: 1.7,
                            marginBottom: '2rem',
                            maxWidth: '420px',
                        }}>
                            Upload your notes, PPTs, or PDFs. Our AI generates engaging quizzes with live leaderboards—share with unlimited students for free.
                        </p>

                        {/* CTAs */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2rem' }}>
                            <Link
                                to="/create"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9375rem',
                                    padding: '0.9rem 1.75rem',
                                    background: accentPrimary,
                                    color: 'white',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <Zap size={18} />
                                Create Quiz
                            </Link>
                            <Link
                                to="/dashboard"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.9375rem',
                                    padding: '0.9rem 1.5rem',
                                    background: 'transparent',
                                    color: textPrimary,
                                    border: `1.5px solid #D5D9DD`,
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                }}
                            >
                                <Play size={16} />
                                See Demo
                            </Link>
                        </div>

                        {/* Trust Indicator */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: textSecondary, fontSize: '0.8125rem' }}>
                            <div style={{ display: 'flex' }}>
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} style={{ fill: '#F5B041', color: '#F5B041' }} />)}
                            </div>
                            <span>Trusted by <strong style={{ color: textPrimary }}>500+</strong> teachers across India</span>
                        </div>
                    </motion.div>

                    {/* Right: Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}
                    >
                        {[
                            { value: '10K+', label: 'Quizzes Created' },
                            { value: '30s', label: 'Avg Generation Time' },
                            { value: '50K+', label: 'Students Reached' },
                            { value: '₹0', label: 'To Get Started' },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '1.5rem',
                                    background: bgCard,
                                    borderRadius: '14px',
                                    border: '1px solid #E8ECF0',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: textPrimary, fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '0.6875rem', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '500' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works - 3 Steps */}
            <section style={{ padding: '4rem 2rem', background: accentLight }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontFamily: 'var(--font-display)', fontWeight: '700', color: textPrimary, marginBottom: '0.5rem' }}>
                            How It Works
                        </h2>
                        <p style={{ fontSize: '1rem', color: textSecondary }}>From upload to live quiz in under a minute</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: Upload, step: '01', title: 'Upload Content', desc: 'Drop your PDF, PPT, notes, or paste any text.' },
                            { icon: Sparkles, step: '02', title: 'AI Generates Quiz', desc: 'Get 10+ MCQs with explanations in seconds.' },
                            { icon: Share2, step: '03', title: 'Share & Track', desc: 'Send link to students, watch live leaderboard.' },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    padding: '1.75rem',
                                    background: bgCard,
                                    borderRadius: '16px',
                                    border: '1px solid #E0E4E8',
                                    position: 'relative',
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '1.5rem',
                                    background: accentPrimary,
                                    color: 'white',
                                    fontSize: '0.625rem',
                                    fontWeight: '700',
                                    padding: '0.25rem 0.625rem',
                                    borderRadius: '999px',
                                }}>
                                    Step {item.step}
                                </div>
                                <item.icon size={32} strokeWidth={1.5} style={{ color: accentPrimary, marginBottom: '1rem', marginTop: '0.5rem' }} />
                                <h3 style={{ fontSize: '1.0625rem', fontWeight: '600', color: textPrimary, marginBottom: '0.375rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: textSecondary, lineHeight: 1.5 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '5rem 2rem', background: bgPrimary }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontFamily: 'var(--font-display)', fontWeight: '700', color: textPrimary, marginBottom: '0.5rem' }}>
                            Everything You Need
                        </h2>
                        <p style={{ fontSize: '1rem', color: textSecondary }}>Built for the modern Indian classroom</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
                                style={{
                                    padding: '1.5rem',
                                    background: bgCard,
                                    border: '1px solid #E8ECF0',
                                    borderRadius: '14px',
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: accentLight,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    color: accentPrimary,
                                }}>
                                    <feature.icon size={22} strokeWidth={1.5} />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: textPrimary, marginBottom: '0.375rem' }}>{feature.title}</h3>
                                <p style={{ color: textSecondary, lineHeight: 1.55, fontSize: '0.875rem' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '5rem 2rem', background: bgCard }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontFamily: 'var(--font-display)', fontWeight: '700', color: textPrimary, marginBottom: '0.5rem' }}>
                            Loved by Teachers
                        </h2>
                        <p style={{ fontSize: '1rem', color: textSecondary }}>Join hundreds of educators transforming their classrooms</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    background: bgPrimary,
                                    borderRadius: '14px',
                                    padding: '1.5rem',
                                    border: '1px solid #E8ECF0',
                                }}
                            >
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} style={{ fill: '#F5B041', color: '#F5B041' }} />)}
                                </div>
                                <p style={{ color: textPrimary, lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9375rem' }}>"{t.quote}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: accentPrimary,
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '600',
                                        fontSize: '0.8125rem',
                                    }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.9375rem', color: textPrimary }}>{t.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: textSecondary }}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section style={{ padding: '5rem 2rem', background: accentLight }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontFamily: 'var(--font-display)', fontWeight: '700', color: textPrimary, marginBottom: '0.5rem' }}>
                            Simple, Honest Pricing
                        </h2>
                        <p style={{ fontSize: '1rem', color: textSecondary }}>Start free and upgrade when you're ready</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {/* Free */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid #D5DAE0', background: bgCard }}
                        >
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: textPrimary, marginBottom: '0.25rem' }}>Free</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: textPrimary, marginBottom: '1.5rem' }}>
                                ₹0 <span style={{ fontSize: '0.875rem', fontWeight: '400', color: textSecondary }}>forever</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                {['5 quizzes per month', 'Up to 50 students/quiz', 'Basic analytics', 'PDF export'].map((f, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: textSecondary, marginBottom: '0.625rem', fontSize: '0.9375rem' }}>
                                        <Check size={16} style={{ color: accentPrimary }} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/create" style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '0.875rem',
                                borderRadius: '10px',
                                background: 'transparent',
                                color: textPrimary,
                                border: `1.5px solid #D5DAE0`,
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '0.9375rem',
                            }}>
                                Get Started
                            </Link>
                        </motion.div>

                        {/* Pro */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ padding: '2rem', borderRadius: '16px', border: `2px solid ${accentPrimary}`, background: bgCard, position: 'relative' }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: '1.5rem',
                                transform: 'translateY(-50%)',
                                background: accentPrimary,
                                color: 'white',
                                fontSize: '0.625rem',
                                fontWeight: '700',
                                padding: '0.375rem 0.875rem',
                                borderRadius: '999px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                            }}>
                                Best Value
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: textPrimary, marginBottom: '0.25rem' }}>Pro</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: textPrimary, marginBottom: '1.5rem' }}>
                                ₹199 <span style={{ fontSize: '0.875rem', fontWeight: '400', color: textSecondary }}>/month</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                                {['Unlimited quizzes', 'Unlimited students', 'Advanced analytics', 'All export formats', 'Priority support'].map((f, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: textSecondary, marginBottom: '0.625rem', fontSize: '0.9375rem' }}>
                                        <Check size={16} style={{ color: accentPrimary }} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/create" style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '0.875rem',
                                borderRadius: '10px',
                                background: accentPrimary,
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '0.9375rem',
                            }}>
                                Upgrade to Pro
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ padding: '5rem 2rem', background: accentPrimary }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontFamily: 'var(--font-display)', fontWeight: '700', color: 'white', marginBottom: '0.75rem' }}>
                            Ready to Transform Your Classroom?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1.0625rem' }}>
                            Join 500+ teachers saving hours on quiz preparation
                        </p>
                        <Link
                            to="/create"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'white',
                                color: accentPrimary,
                                padding: '1rem 2.25rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                borderRadius: '10px',
                                textDecoration: 'none',
                            }}
                        >
                            Get Started for Free
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '2.5rem 2rem', borderTop: '1px solid #E8ECF0', background: bgCard }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '28px', height: '28px', background: accentPrimary, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <GraduationCap size={16} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '1.0625rem', color: textPrimary }}>LectureClosure</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8125rem', color: textSecondary }}>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: textSecondary }}>© 2026 LectureClosure. Made with ❤️ in India</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
