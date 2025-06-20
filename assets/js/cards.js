 document.addEventListener("DOMContentLoaded", () => {
            const cards = document.querySelectorAll(".diferencial-card");

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("diferencial-animado");
                            observer.unobserve(entry.target); // evitar reanimação
                        }, index * 200); // 200ms de delay entre cada card
                    }
                });
            }, {
                threshold: 0.3 // Quando 30% do card estiver visível
            });

            cards.forEach((card) => observer.observe(card));
        });