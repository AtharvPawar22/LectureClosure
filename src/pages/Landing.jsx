import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Sparkles, Share2, Trophy, BarChart3, Download, MessageCircle, Users, Clock, FileText, Check, Star, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

// Differentiator item
const DiffItem = ({ icon: Icon, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#505050', fontSize: '0.875rem', fontWeight: '500' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={16} strokeWidth={1.5} />
        </div>
        {label}
    </div>
);

// Step card for How It Works
const StepCard = ({ number, title, desc, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #EBEBEB',
        }}
    >
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: '#3D9A8B',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.125rem',
            fontWeight: '700',
        }}>
            {number}
        </div>
        <Icon size={28} strokeWidth={1.5} style={{ color: '#3D9A8B', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.375rem', color: '#1A1A1A' }}>{title}</h3>
        <p style={{ fontSize: '0.8125rem', color: '#707070', lineHeight: 1.5 }}>{desc}</p>
    </motion.div>
);

// Feature card
const FeatureCard = ({ icon: Icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
        style={{
            padding: '1.25rem',
            background: 'white',
            border: '1px solid #EBEBEB',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
        }}
    >
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: '#E8F5F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.875rem',
            color: '#3D9A8B',
        }}>
            <Icon size={20} strokeWidth={1.5} />
        </div>
        <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1A1A1A' }}>{title}</h3>
        <p style={{ color: '#707070', lineHeight: 1.5, fontSize: '0.8125rem' }}>{desc}</p>
    </motion.div>
);

// Testimonial card
const TestimonialCard = ({ name, role, quote, avatar }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
            background: 'white',
            borderRadius: '10px',
            padding: '1.25rem',
            border: '1px solid #EBEBEB',
        }}
    >
        <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} style={{ fill: '#F5A623', color: '#F5A623' }} />)}
        </div>
        <p style={{ color: '#404040', lineHeight: 1.5, marginBottom: '0.875rem', fontSize: '0.875rem' }}>"{quote}"</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#3D9A8B',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.6875rem',
            }}>
                {avatar}
            </div>
            <div>
                <div style={{ fontWeight: '600', fontSize: '0.8125rem', color: '#1A1A1A' }}>{name}</div>
                <div style={{ fontSize: '0.6875rem', color: '#707070' }}>{role}</div>
            </div>
        </div>
    </motion.div>
);

const Landing = () => {
    const features = [
        { icon: Trophy, title: "Live Leaderboards", desc: "Real-time rankings fuel healthy competition in your classroom." },
        { icon: BarChart3, title: "Smart Analytics", desc: "Track student performance with detailed insights and reports." },
        { icon: Share2, title: "One-Click Share", desc: "Send quiz links via WhatsApp, email, or Google Classroom." },
        { icon: Download, title: "Export Anywhere", desc: "Download as PDF, Word, or print-ready format instantly." },
        { icon: Users, title: "Teacher Dashboard", desc: "Manage all quizzes and classes from a central hub." },
        { icon: MessageCircle, title: "WhatsApp Ready", desc: "Built for Indian classrooms with WhatsApp integration." },
    ];

    const testimonials = [
        { name: "Priya Sharma", role: "Math Teacher, Delhi", quote: "LectureClosure cut my quiz prep from 2 hours to 5 minutes. My students love the leaderboard!", avatar: "PS" },
        { name: "Rahul Mehta", role: "Science Faculty, Pune", quote: "The analytics help me understand exactly where students struggle. Game changer!", avatar: "RM" },
        { name: "Anita Desai", role: "English Teacher, Mumbai", quote: "Sharing quizzes via WhatsApp is so convenient. Parents love the progress reports.", avatar: "AD" },
    ];

    return (
        <div style={{ background: '#FAFAFA', minHeight: '100vh' }}>

            {/* Hero Section */}
            <section style={{ padding: '4rem 1.5rem 3rem', background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.375rem 0.875rem',
                            background: '#E8F5F2',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#3D9A8B',
                            marginBottom: '1.5rem'
                        }}>
                            <Sparkles size={14} />
                            Free for teachers
                        </div>

                        {/* Headline */}
                        <h1 style={{
                            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                            marginBottom: '1rem',
                            lineHeight: 1.15,
                            fontFamily: 'var(--font-display)',
                            fontWeight: '700',
                            color: '#1A1A1A',
                            letterSpacing: '-0.02em',
                        }}>
                            Turn your lectures into<br />
                            <span style={{ color: '#3D9A8B' }}>quizzes in 30 seconds</span>
                        </h1>

                        <p style={{
                            fontSize: '1rem',
                            color: '#606060',
                            marginBottom: '1.5rem',
                            maxWidth: '480px',
                            margin: '0 auto 1.5rem',
                            lineHeight: 1.6
                        }}>
                            Upload notes, PPTs, or PDFs. Get AI-generated quizzes with live leaderboards. Share with unlimited students for free.
                        </p>

                        {/* Single CTA */}
                        <Link
                            to="/create"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9375rem',
                                padding: '0.875rem 1.75rem',
                                background: '#3D9A8B',
                                color: 'white',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                boxShadow: '0 4px 14px rgba(61, 154, 139, 0.3)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            Create Your First Quiz
                            <ArrowRight size={18} />
                        </Link>
                        <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.625rem' }}>No signup required • 100% free</p>
                    </motion.div>
                </div>
            </section>

            {/* Differentiators Bar */}
            <section style={{ padding: '1.5rem 1rem', background: 'white', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
                    <DiffItem icon={Sparkles} label="Free Forever" />
                    <DiffItem icon={Share2} label="Share Instantly" />
                    <DiffItem icon={Trophy} label="Live Leaderboard" />
                    <DiffItem icon={Download} label="Export Anywhere" />
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: '4rem 1.5rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: '#1A1A1A' }}>
                            How It Works
                        </h2>
                        <p style={{ fontSize: '0.9375rem', color: '#707070' }}>From upload to quiz in 3 simple steps</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <StepCard number="1" icon={Upload} title="Upload Content" desc="Drop your PDF, PPT, notes, or just paste text" />
                        <StepCard number="2" icon={Sparkles} title="AI Generates Quiz" desc="Get 10+ MCQ questions with explanations in seconds" />
                        <StepCard number="3" icon={Share2} title="Share & Track" desc="Send link to students and watch live leaderboard" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '3rem 1.5rem 4rem', background: 'white' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: '#1A1A1A' }}>
                            Built for Indian Teachers
                        </h2>
                        <p style={{ fontSize: '0.9375rem', color: '#707070' }}>Everything you need to engage your classroom</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                        {features.map((feature, idx) => (
                            <FeatureCard key={idx} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats + Testimonials */}
            <section style={{ padding: '4rem 1.5rem', background: '#FAFAFA' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {/* Stats */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
                        {[
                            { value: 10000, suffix: '+', label: 'Quizzes Created' },
                            { value: 500, suffix: '+', label: 'Teachers' },
                            { value: 50000, suffix: '+', label: 'Students Reached' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#3D9A8B' }}>
                                    <AnimatedCounter value={stat.value} duration={2} suffix={stat.suffix} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#707070', fontWeight: '500' }}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '1.5rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: '#1A1A1A' }}>
                            Loved by Teachers
                        </h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                        {testimonials.map((t, idx) => (
                            <TestimonialCard key={idx} {...t} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Pricing */}
            <section style={{ padding: '4rem 1.5rem', background: 'white' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: '#1A1A1A' }}>
                            Simple Pricing
                        </h2>
                        <p style={{ fontSize: '0.9375rem', color: '#707070' }}>Start free, upgrade when you need more</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                        {/* Free Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #EBEBEB',
                                background: 'white',
                            }}
                        >
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1A1A1A' }}>Free</h3>
                            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#1A1A1A' }}>
                                ₹0 <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#999' }}>forever</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem' }}>
                                {['5 quizzes per month', 'Up to 50 students', 'Basic analytics', 'Download as PDF'].map((f, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#505050', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                                        <Check size={14} style={{ color: '#3D9A8B' }} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/create" style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                background: 'white',
                                color: '#1A1A1A',
                                border: '1px solid #DCDCDC',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '0.875rem',
                            }}>
                                Get Started
                            </Link>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '2px solid #3D9A8B',
                                background: 'white',
                                position: 'relative',
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: '#3D9A8B',
                                color: 'white',
                                fontSize: '0.625rem',
                                fontWeight: '600',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                textTransform: 'uppercase',
                            }}>
                                Popular
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', color: '#1A1A1A' }}>Pro</h3>
                            <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#1A1A1A' }}>
                                ₹199 <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#999' }}>/month</span>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem' }}>
                                {['Unlimited quizzes', 'Unlimited students', 'Advanced analytics', 'All export formats', 'Priority support'].map((f, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#505050', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>
                                        <Check size={14} style={{ color: '#3D9A8B' }} /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/create" style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                background: '#3D9A8B',
                                color: 'white',
                                textDecoration: 'none',
                                fontWeight: '500',
                                fontSize: '0.875rem',
                            }}>
                                Upgrade to Pro
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section style={{ padding: '4rem 1.5rem', background: '#3D9A8B' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)', marginBottom: '0.625rem', fontFamily: 'var(--font-display)', fontWeight: '700', color: 'white' }}>
                            Ready to save hours on quiz prep?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
                            Join 500+ teachers already using LectureClosure
                        </p>
                        <Link
                            to="/create"
                            style={{
                                display: 'inline-block',
                                background: 'white',
                                color: '#3D9A8B',
                                padding: '0.875rem 2rem',
                                fontSize: '0.9375rem',
                                fontWeight: '600',
                                borderRadius: '8px',
                                textDecoration: 'none',
                            }}
                        >
                            Get Started for Free
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '2rem 1.5rem', borderTop: '1px solid #EBEBEB', background: 'white' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '24px', height: '24px', background: '#3D9A8B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <GraduationCap size={14} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '0.9375rem', color: '#1A1A1A' }}>LectureClosure</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#707070' }}>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                    </div>
                    <p style={{ fontSize: '0.6875rem', color: '#999' }}>© 2026 LectureClosure. Made with ❤️ in India</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
