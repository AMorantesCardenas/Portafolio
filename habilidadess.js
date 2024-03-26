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

    let position = 0;
    let speed = 1; // Velocidad de desplazamiento
    let observer;

    // Iniciar el movimiento del carrusel
    startCarousel();

    // Función para iniciar el movimiento del carrusel
    function startCarousel() {
        moveCarousel();
        observeLogos();
    }

    // Función para mover el carrusel
    function moveCarousel() {
        position -= speed;
        carousel.style.transform = `translateX(${position}px)`;

        requestAnimationFrame(moveCarousel);
    }

    // Función para observar los logos y moverlos al final del carrusel cuando salen del área visible
    function observeLogos() {
        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.parentNode.appendChild(entry.target);
                }
            });
        }, { root: carousel });

        logos.forEach(logo => {
            observer.observe(logo);
        });
    }

    // Agregar evento hover a cada imagen del carrusel
    logos.forEach(logo => {
        logo.addEventListener('mouseover', function() {
            const level = this.getAttribute('data-level'); // Obtener el nivel de habilidad del atributo data-level
            alert('Nivel de habilidad: ' + level); // Mostrar nivel de habilidad al pasar el mouse sobre la imagen
        });
    });
});
