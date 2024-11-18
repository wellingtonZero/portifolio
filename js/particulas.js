const canvas2 = document.getElementById("background");
        const ctx = canvas2.getContext("2d");

        // Ajustar o tamanho do canvas para preencher a tela
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;

        const particlesArray = [];
        const numParticles = 100;

        // Função para redimensionar o canvas ao ajustar o tamanho da janela
        window.addEventListener("resize", () => {
            canvas2.width = window.innerWidth;
            canvas2.height = window.innerHeight;
        });

        // Classe para criar as partículas
        class Particle {
            constructor(x, y, size, dx, dy) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.dx = dx; // Direção x
                this.dy = dy; // Direção y
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = "#00bfff";
                ctx.shadowColor = "#00bfff";
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                this.x += this.dx;
                this.y += this.dy;

                // Rebater nas bordas
                if (this.x < 0 || this.x > canvas2.width) this.dx *= -1;
                if (this.y < 0 || this.y > canvas2.height) this.dy *= -1;
            }
        }

        // Criar partículas
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 1 + 4; // Tamanho da partícula
            const x = Math.random() * canvas2.width;
            const y = Math.random() * canvas2.height;
            const dx = (Math.random() - 0.5) ; // Velocidade horizontal
            const dy = (Math.random() - 0.5) ; // Velocidade vertical

            particlesArray.push(new Particle(x, y, size, dx, dy));
        }

        // Conectar as partículas com linhas
        function connectParticles() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = 1 - distance / 120;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`; 
                        ctx.lineWidth = 3;
                        ctx.shadowColor = "#00bfff";
                        ctx.shadowBlur = 10;
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Função de animação
        function animate() {
            ctx.clearRect(0, 0, canvas2.width, canvas2.height);

            particlesArray.forEach((particle) => {
                particle.draw();
                particle.update();
            });

            connectParticles();
            requestAnimationFrame(animate);
        }

        animate();