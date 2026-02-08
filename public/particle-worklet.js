// Particle Paint Worklet for CSS Houdini
// This runs on a separate thread and is GPU-accelerated

class ParticlePainter {
    static get inputProperties() {
        return [
            '--particle-count',
            '--particle-colors',
            '--mouse-x',
            '--mouse-y',
            '--time'
        ];
    }

    paint(ctx, size, properties) {
        const particleCount = parseInt(properties.get('--particle-count')) || 40;
        const mouseX = parseFloat(properties.get('--mouse-x')) || -1000;
        const mouseY = parseFloat(properties.get('--mouse-y')) || -1000;
        const time = parseFloat(properties.get('--time')) || 0;

        const colors = [
            'rgba(67, 97, 238, 0.6)',   // Blue
            'rgba(124, 58, 237, 0.5)',  // Purple
            'rgba(244, 63, 94, 0.45)',  // Pink
            'rgba(245, 158, 11, 0.5)',  // Orange
            'rgba(34, 197, 94, 0.45)',  // Green
            'rgba(6, 182, 212, 0.5)',   // Cyan
        ];

        // Seeded random for consistent particle positions
        const seededRandom = (seed) => {
            const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
            return x - Math.floor(x);
        };

        for (let i = 0; i < particleCount; i++) {
            const seed = i * 1.618;

            // Base position (deterministic based on seed)
            let baseX = seededRandom(seed) * size.width;
            let baseY = seededRandom(seed + 100) * size.height;

            // Slow floating animation
            const floatOffsetX = Math.sin(time * 0.0003 + seed) * 30;
            const floatOffsetY = Math.cos(time * 0.0002 + seed * 1.5) * 25;

            let x = baseX + floatOffsetX;
            let y = baseY + floatOffsetY;

            // Mouse interaction - orbit effect
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 180;

            if (distance < maxDist && mouseX > 0) {
                const angle = Math.atan2(dy, dx) + time * 0.002 * (i % 2 === 0 ? 1 : -1);
                const orbitRadius = 60 + (distance / maxDist) * 40;
                const attraction = (1 - distance / maxDist) * 0.6;

                x += (mouseX + Math.cos(angle) * orbitRadius - x) * attraction;
                y += (mouseY + Math.sin(angle) * orbitRadius - y) * attraction;
            }

            // Particle size based on seed and proximity to mouse
            let particleSize = 2 + seededRandom(seed + 50) * 3;
            if (distance < maxDist && mouseX > 0) {
                particleSize += (1 - distance / maxDist) * 2;
            }

            // Color from palette
            const colorIndex = Math.floor(seededRandom(seed + 200) * colors.length);
            ctx.fillStyle = colors[colorIndex];

            ctx.beginPath();
            ctx.arc(x, y, particleSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

registerPaint('particles', ParticlePainter);
