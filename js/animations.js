// js/animations.js

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

let lenis;

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    runPreloader();
    initHomeSpecifics();
});

// Smooth Scrolling with Lenis
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);
}

// Preloader & Initial Animations
function runPreloader() {
    const tl = gsap.timeline();
    const preloader = document.querySelector('.preloader');
    const logo = document.querySelector('.preloader-logo');
    const bar = document.querySelector('.preloader-bar');
    const barWrap = document.querySelector('.preloader-bar-wrap');

    if (!preloader) {
        initPageAnimations();
        return;
    }

    // Logo fade in
    tl.to(logo, { opacity: 1, duration: 1, ease: "power2.out" })
      .to(barWrap, { opacity: 1, duration: 0.5 }, "-=0.5")
      // Loading bar fills up
      .to(bar, { width: "100%", duration: 1.5, ease: "power4.inOut" })
      // Curtain pulls up
      .to(preloader, { 
          yPercent: -100, 
          duration: 1, 
          ease: "power4.inOut",
          onComplete: () => {
              preloader.style.display = 'none';
              initPageAnimations();
          }
      }, "+=0.2");
}

// Global Page Reveal Animations
function initPageAnimations() {
    // 1. Reveal hidden elements with .invisible-init class (excluding hero which we handle custom)
    const initialReveals = document.querySelectorAll('.invisible-init:not(.hero-title):not(.hero-subtitle):not(.hero-actions):not(.floating-badge):not(.scroll-indicator)');
    
    gsap.to(initialReveals, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all" // Clear GSAP inline styles after animation so CSS takes over
    });

    // 2. Setup standard scroll reveals for sections
    const sections = document.querySelectorAll('.section:not(.hero-section)');
    sections.forEach(section => {
        gsap.fromTo(section, 
            { autoAlpha: 0, y: 50 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%", // Trigger when top of section is 85% down the viewport
                    once: true // Only animate once
                }
            }
        );
    });
}

function initHomeSpecifics() {
    // Split text animation for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Simple manual character split since GSAP SplitText is a premium plugin
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // preserve spaces
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(100px)';
            heroTitle.appendChild(span);
        });
        
        heroTitle.style.visibility = 'visible';

        const tl = gsap.timeline({delay: 0.2});
        
        tl.to('.hero-title span', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out"
        })
        .to('.hero-subtitle', { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .to('.hero-actions', { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to('.floating-badge', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.4")
        .to('.scroll-indicator', { autoAlpha: 1, duration: 1 }, "-=0.2");
        
        // Scroll indicator dot animation
        gsap.to('.scroll-dot', {
            y: 40,
            duration: 1.5,
            repeat: -1,
            ease: "power2.inOut"
        });

        // Hero Parallax
        gsap.to('.hero-bg', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Floating Badges Parallax
        const badges = document.querySelectorAll('.floating-badge');
        badges.forEach(badge => {
            const speed = badge.getAttribute('data-speed') || 1;
            gsap.to(badge, {
                y: -100 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // Marquee Animation
    const marqueeContent = document.querySelectorAll('.marquee-content');
    if (marqueeContent.length > 0) {
        gsap.to('.marquee-container', {
            xPercent: -50, // scroll half the container (since it's duplicated)
            ease: "none",
            duration: 20,
            repeat: -1
        });
    }

    // Initialize Swiper
    if (typeof Swiper !== 'undefined' && document.querySelector('.featured-swiper')) {
        new Swiper('.featured-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            grabCursor: true
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        counter.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
                    }
                });
            }
        });
    });

    // Configurator Color Swap Teaser
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const configImg = document.getElementById('config-car-img');
    
    if (colorSwatches.length > 0 && configImg) {
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                // Update active state
                colorSwatches.forEach(s => s.style.boxShadow = '0 0 0 2px transparent');
                swatch.style.boxShadow = '0 0 0 2px var(--color-accent)';
                
                const color = swatch.getAttribute('data-color');
                
                // Extremely simple hue-rotate simulation for placeholder
                // In production, you would crossfade between actual asset images
                if (color === 'red') configImg.style.filter = 'hue-rotate(0deg)';
                if (color === 'blue') configImg.style.filter = 'hue-rotate(220deg)';
                if (color === 'white') configImg.style.filter = 'grayscale(100%) brightness(1.5)';
                if (color === 'black') configImg.style.filter = 'grayscale(100%) brightness(0.5)';
                
                gsap.fromTo(configImg, 
                    { opacity: 0.5, scale: 0.98 }, 
                    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
                );
            });
        });
        
        // Init active state
        colorSwatches[0].style.boxShadow = '0 0 0 2px var(--color-accent)';
    }
}

// Expose page transition helper for navigation links
window.navigateTo = function(url) {
    const curtain = document.querySelector('.page-transition-curtain');
    if (!curtain) {
        window.location.href = url;
        return;
    }

    // Curtain slides down
    gsap.fromTo(curtain, 
        { yPercent: 100 },
        { 
            yPercent: 0, 
            duration: 0.5, 
            ease: "power3.inOut",
            onComplete: () => {
                window.location.href = url;
            }
        }
    );
};

// Intercept links to apply page transition
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && 
        link.hostname === window.location.hostname && 
        !link.hash && 
        link.target !== "_blank") {
        
        e.preventDefault();
        window.navigateTo(link.href);
    }
});
