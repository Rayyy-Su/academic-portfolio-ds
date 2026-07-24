const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const navbar = $('#navbar');
const mobileMenuBtn = $('#mobileMenuBtn');
const mobileMenu = $('#mobileMenu');
const heroBackground = $('.hero-background');

const getCenteredScrollTop = (target) => {
    const navbarHeight = navbar?.offsetHeight || 64;
    const viewportHeight = window.innerHeight;
    const targetRect = target.getBoundingClientRect();
    const targetTop = window.scrollY + targetRect.top;
    const centeredTop = targetTop - (viewportHeight - targetRect.height) / 2 - navbarHeight / 2;
    return Math.max(0, centeredTop);
};

const closeMobileMenu = () => {
    mobileMenuBtn?.classList.remove('active');
    mobileMenu?.classList.remove('active');
};

const setNavbarState = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
};

const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
};

const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
};

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

$$('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (event) => {
    if (navbar && !navbar.contains(event.target) && mobileMenu?.classList.contains('active')) {
        closeMobileMenu();
    }
});

$$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = $(targetId);
        if (!target) return;

        event.preventDefault();
        window.scrollTo({
            top: getCenteredScrollTop(target),
            behavior: 'smooth'
        });
    });
});

$$('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        openModal($(`#${trigger.getAttribute('data-modal-open')}`));
    });
});

$$('[data-modal-close]').forEach((control) => {
    control.addEventListener('click', () => {
        closeModal(control.closest('.demo-modal'));
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    $$('.demo-modal.active').forEach(closeModal);
});

window.addEventListener('scroll', setNavbarState);
setNavbarState();
