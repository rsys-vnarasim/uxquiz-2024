// Create a new file: js/confetti.js

export class Confetti {
    constructor() {
        this.colors = ['#00FF00', '#4CAF50', '#45a049', '#39ff14', '#32CD32'];
        this.particleCount = 150;
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.top = '0';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        return particle;
    }

    celebrate() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            document.body.appendChild(particle);

            const destinationX = Math.random() * window.innerWidth;
            const destinationY = Math.random() * window.innerHeight;
            const rotation = Math.random() * 520;
            const delay = Math.random() * 200;

            particle.animate([
                {
                    transform: 'translate(-50%, -50%) translate(50vw, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(-50%, -50%) translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0,0,0.2,1)',
                delay: delay
            });

            setTimeout(() => {
                document.body.removeChild(particle);
            }, 2000 + delay);
        }
    }
}
