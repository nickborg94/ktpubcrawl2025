// Confetti animation for celebrations
class ConfettiCannon {
    constructor() {
        this.canvas = document.getElementById('confettiCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;
        
        this.colors = ['#2C0603', '#EFEBE2', '#8B2E2B', '#c4b89c', '#FFD700'];
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle(x, y) {
        return {
            x: x,
            y: y,
            size: Math.random() * 8 + 4,
            speedX: (Math.random() - 0.5) * 8,
            speedY: Math.random() * -15 - 5,
            gravity: 0.5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            opacity: 1
        };
    }
    
    fire(x = this.canvas.width / 2, y = this.canvas.height / 2, particleCount = 80) {
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle(x, y));
        }
        
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }
    
    animate() {
        if (this.particles.length === 0) {
            this.isActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return;
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.speedY += p.gravity;
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            
            // Fade out
            if (p.y > this.canvas.height - 100) {
                p.opacity -= 0.02;
            }
            
            // Remove if off screen or invisible
            if (p.y > this.canvas.height + 10 || p.opacity <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;
            
            // Draw rectangle confetti
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
            
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    celebration() {
        // Fire from multiple points
        const points = [
            { x: this.canvas.width * 0.2, y: this.canvas.height * 0.8 },
            { x: this.canvas.width * 0.5, y: this.canvas.height * 0.8 },
            { x: this.canvas.width * 0.8, y: this.canvas.height * 0.8 }
        ];
        
        points.forEach(point => {
            this.fire(point.x, point.y, 50);
        });
    }
}

// Initialize confetti cannon
let confetti;
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        confetti = new ConfettiCannon();
    });
}
