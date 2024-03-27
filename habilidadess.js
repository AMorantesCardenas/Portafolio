document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const logos = carousel.querySelectorAll('.logo');
    const totalLogos = logos.length;
    const cloneCount = Math.ceil(window.innerWidth / logos[0].offsetWidth) + 1;

    // Clonar logos para llenar el carrusel
    for (let i = 0; i < cloneCount; i++) {
        logos.forEach(logo => {
            const clone = logo.cloneNode(true);
            carousel.appendChild(clone);
        });
    }

    // Establecer el ancho del carrusel
    carousel.style.width = `${carousel.scrollWidth}px`;

    let position = 0;
    let speed = 1; // Velocidad de desplazamiento
    let observer;
    let animationFrameId;

    // Iniciar el movimiento del carrusel
    startCarousel();

    // Función para iniciar el movimiento del carrusel
    function startCarousel() {
        moveCarousel();
        observeLogos();
        
        // Escuchar eventos de visibilidad de la página
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // Función para detener el movimiento del carrusel cuando la página no está visible
    function handleVisibilityChange() {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            moveCarousel();
        }
    }

    // Función para mover el carrusel
    function moveCarousel() {
        position -= speed;
        carousel.style.transform = `translateX(${position}px)`;

        animationFrameId = requestAnimationFrame(moveCarousel);
    }

    // Función para observar los logos y moverlos al final del carrusel cuando salen del área visible
    function observeLogos() {
        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.parentNode.appendChild(entry.target);
                }
            });
        }, { root: null, threshold: 0.5 }); // Cambiado root a null y threshold ajustado

        logos.forEach(logo => {
            observer.observe(logo);
        });
    }
});
