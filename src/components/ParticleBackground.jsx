import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ particleCount = 100 }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = 0;
                this.vy = 0;

                // UNIFORM SIZE - all particles same size
                this.size = 3;

                // Neutral gray color - solid, not blurry
                this.color = 'rgba(180, 175, 170, 0.7)';

                // Physics
                this.friction = 0.94;
                this.floatOffset = Math.random() * Math.PI * 2;
                this.floatSpeed = 0.003 + Math.random() * 0.005;
                this.floatAmplitude = 15 + Math.random() * 20;
            }

            update(time) {
                const mouse = mouseRef.current;
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Large interaction radius
                const magnetRadius = 300;

                if (distance < magnetRadius && mouse.x > 0) {
                    const force = Math.pow((magnetRadius - distance) / magnetRadius, 2);
                    const angle = Math.atan2(dy, dx);

                    // SLOWER orbit - reduced from 0.4 to 0.15
                    const orbitStrength = 0.15;
                    const tangentAngle = angle + Math.PI / 2;

                    // Gentle attraction
                    const attractionStrength = 1.5 * force;
                    this.vx += Math.cos(angle) * attractionStrength;
                    this.vy += Math.sin(angle) * attractionStrength;

                    // Slow orbital motion
                    this.vx += Math.cos(tangentAngle) * attractionStrength * orbitStrength;
                    this.vy += Math.sin(tangentAngle) * attractionStrength * orbitStrength;
                } else {
                    // Return to base with gentle float
                    const floatX = Math.sin(time * this.floatSpeed + this.floatOffset) * this.floatAmplitude;
                    const floatY = Math.cos(time * this.floatSpeed * 0.7 + this.floatOffset) * (this.floatAmplitude * 0.6);

                    const targetX = this.baseX + floatX;
                    const targetY = this.baseY + floatY;

                    this.vx += (targetX - this.x) * 0.008;
                    this.vy += (targetY - this.y) * 0.008;
                }

                this.vx *= this.friction;
                this.vy *= this.friction;
                this.x += this.vx;
                this.y += this.vy;

                // Wrap edges
                if (this.x < -20) this.x = width + 20;
                if (this.x > width + 20) this.x = -20;
                if (this.y < -20) this.y = height + 20;
                if (this.y > height + 20) this.y = -20;
            }

            draw(ctx) {
                // SOLID circle - no gradient, no blur
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particlesRef.current.forEach(p => {
                p.baseX = Math.random() * width;
                p.baseY = Math.random() * height;
            });
        };

        let time = 0;
        const animate = () => {
            time++;
            ctx.clearRect(0, 0, width, height);

            particlesRef.current.forEach(particle => {
                particle.update(time);
                particle.draw(ctx);
            });

            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [particleCount]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    );
};

export default ParticleBackground;
