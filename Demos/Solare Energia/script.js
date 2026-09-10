// =========================================================
// MENU MOBILE
// =========================================================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-list a');

if (menuToggle && nav) {

    menuToggle.addEventListener('click', () => {

        const isOpen = nav.classList.toggle('active');

        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Fechar menu' : 'Abrir menu'
        );

        document.body.classList.toggle('menu-open', isOpen);

        const icon = menuToggle.querySelector('i');

        if (icon) {
            icon.classList.toggle('fa-bars', !isOpen);
            icon.classList.toggle('fa-xmark', isOpen);
        }
    });


    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            nav.classList.remove('active');

            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');

            document.body.classList.remove('menu-open');

            const icon = menuToggle.querySelector('i');

            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

    });


    // Fecha ao pressionar ESC
    document.addEventListener('keydown', (event) => {

        if (event.key === 'Escape' && nav.classList.contains('active')) {

            nav.classList.remove('active');

            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');

            document.body.classList.remove('menu-open');

            const icon = menuToggle.querySelector('i');

            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }

    });


    // Se voltar para desktop, reseta o menu
    window.addEventListener('resize', () => {

        if (window.innerWidth > 900) {

            nav.classList.remove('active');

            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');

            document.body.classList.remove('menu-open');

            const icon = menuToggle.querySelector('i');

            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }

    });
}