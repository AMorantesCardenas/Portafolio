document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    const modeToggle = document.getElementById('dark-mode-toggle');
    const modeIcon = document.getElementById('mode-icon');
    const svgImageMain = document.getElementById('svgImageMain'); // Referencia al SVG del main
    const redesLinks = document.querySelectorAll('#redes img'); // Obtener todas las imágenes de los enlaces de redes sociales
    let isAnimating = false; // Variable de control para verificar si hay una animación en curso

    // Guardar las rutas de las imágenes de los SVG en modo claro y oscuro
    const lightModeSVG = 'Logos/FullSV.svg';
    const darkModeSVG = 'Logos/FullSVW.svg';

    // Al hacer clic en el botón de cambio de modo, cambia el modo y guarda la preferencia en el almacenamiento local
    modeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        // Cambia el SVG dependiendo del modo
        if (body.classList.contains('dark-mode')) {
            modeIcon.src = 'Logos/noche.svg'; // Ruta del icono de modo oscuro
            svgImageMain.src = darkModeSVG; // Establece la imagen del SVG en modo oscuro

            // Cambiar las imágenes de las flechas en modo nocturno
            redesLinks.forEach(link => {
                link.src = 'Logos/flechanoche.svg';
            });
        } else {
            modeIcon.src = 'Logos/dia.svg'; // Ruta del icono de modo claro
            svgImageMain.src = lightModeSVG; // Establece la imagen del SVG en modo claro

            // Cambiar las imágenes de las flechas en modo claro
            redesLinks.forEach(link => {
                link.src = 'Logos/flecha.svg';
            });
        }

        // Guarda la preferencia del modo en el almacenamiento local
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode);
    });

    // Verifica si el usuario ya ha establecido una preferencia de modo y aplica ese modo si es así
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');

        // Cambia el SVG al modo oscuro si está activado
        modeIcon.src = 'Logos/noche.svg';
        svgImageMain.src = darkModeSVG; // Establece la imagen del SVG en modo oscuro

        // Cambiar las imágenes de las flechas en modo nocturno
        redesLinks.forEach(link => {
            link.src = 'Logos/flechanoche.svg';
        });
    }


    // Manejar el clic en el enlace "Inicio" para hacer scroll suave hacia arriba
    const inicioLink = document.querySelector('nav a[href="#inicio"]');
    if (inicioLink) {
        inicioLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (!isAnimating) { // Verificar si no hay animaciones en curso
                const targetPosition = 0;
                smoothScrollTo(targetPosition, 1000);
            }
        });
    }

    // Obtener altura del encabezado
    const headerHeight = document.querySelector('header').offsetHeight;
    const conocenosTitle = document.getElementById('conocenoss');

    // Manejar el clic en los enlaces de navegación
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            if (!isAnimating) { // Verificar si no hay animaciones en curso
                const href = this.getAttribute('href');

                if (href === '#inicio') {
                    const targetPosition = 0;
                    smoothScrollTo(targetPosition, 1000);
                } else {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    smoothScrollTo(targetPosition, 1000);
                }

                // Agregar margen superior al título "Conócenos" después del desplazamiento
                conocenosTitle.style.marginTop = `${headerHeight}px`; // Ajustar el margen superior
            }
        });
    });

    // Función para scroll suave con efecto de amortiguación
    function smoothScrollTo(to, duration) {
        isAnimating = true; // Marcar que hay una animación en curso
        const start = window.pageYOffset;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        function animateScroll() {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            window.scrollTo(0, val);
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                isAnimating = false; // Marcar que la animación ha terminado
            }
        }

        animateScroll();
    }
});

