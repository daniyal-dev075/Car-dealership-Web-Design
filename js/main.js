// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initNavbar();
});

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const ring = document.querySelector('.custom-cursor-ring');
    const ringText = document.querySelector('.cursor-text');
    
    if (!cursor || !ring) return;

    // Use GSAP quickTo for performance
    const cursorX = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
    const cursorY = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});
    const ringX = gsap.quickTo(ring, "x", {duration: 0.15, ease: "power3"});
    const ringY = gsap.quickTo(ring, "y", {duration: 0.15, ease: "power3"});

    window.addEventListener('mousemove', (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
    });

    // Handle interactive elements
    const interactives = document.querySelectorAll('a, button, input, .interactive');
    
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('active');
            const actionText = el.getAttribute('data-cursor') || '';
            if (actionText) {
                ringText.textContent = actionText;
            } else {
                ringText.textContent = '';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            ring.classList.remove('active');
            ringText.textContent = '';
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnetic-wrap');
    
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Adjust the pull strength (0.3 = 30% of movement)
            gsap.to(magnet, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
