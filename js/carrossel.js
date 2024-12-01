let items = document.querySelectorAll('.slider .item');
        let slider = document.querySelector('.slider');

        let active = 4; // Slide inicial
        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        function loadShow() {
            let offset = 0;
            items[active].style.transform = `none`;
            items[active].style.zIndex = 1;
            items[active].style.filter = 'none';
            items[active].style.opacity = 1;
            for (let i = active + 1; i < items.length; i++) {
                offset++;
                items[i].style.transform = `translateX(${70 * offset}px) scale(${1 - 0.1 * offset})`;
                items[i].style.zIndex = -offset;
                items[i].style.filter = 'blur(1px)';
                items[i].style.opacity = offset > 5 ? 0 : 0.6;
            }
            offset = 0;
            for (let i = active - 1; i >= 0; i--) {
                offset++;
                items[i].style.transform = `translateX(${-70 * offset}px) scale(${1 - 0.1 * offset})`;
                items[i].style.zIndex = -offset;
                items[i].style.filter = 'blur(1px)';
                items[i].style.opacity = offset > 5 ? 0 : 0.6;
            }
        }
        //ok
        function nextSlide() {
            active = (active + 1) % items.length;
            loadShow();
        }
        //ok
        function prevSlide() {
            active = (active - 1 + items.length) % items.length;
            loadShow();
        }

        // Adicionar eventos para navegação com o mouse
        document.querySelector('.slider').addEventListener('wheel', (event) => {
            if (event.deltaY > 0) nextSlide();
            else prevSlide();
        });

        loadShow();

        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
        });

        slider.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = 'grab';

            let delta = currentX - startX;
            if (delta > 50) {
                // Mover para o slide anterior
                active = active - 1 >= 0 ? active - 1 : active;
            } else if (delta < -50) {
                // Mover para o próximo slide
                active = active + 1 < items.length ? active + 1 : active;
            }
            loadShow();
        });
        
        slider.addEventListener('mouseleave', () => {
            isDragging = false;
            slider.style.cursor = 'grab';
        });