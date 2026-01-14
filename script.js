/**
 * Pure Extracts TX - Theme Switcher & Interactions
 * Supports 3 themes: Clinical White, Earth Apothecary, Modern Herbalist
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initThemeSwitcher();
    initNavigation();
    initScrollEffects();
    initForms();
    initAnimations();
});

/**
 * Theme Switcher
 */
function initThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeToggle = document.getElementById('themeToggle');
    const themeOptions = document.querySelectorAll('.theme-option');

    // Load saved theme or default to 'clinical'
    const savedTheme = localStorage.getItem('pureextracts-theme') || 'clinical';
    setTheme(savedTheme);

    // Toggle theme dropdown
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeSwitcher.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!themeSwitcher.contains(e.target)) {
            themeSwitcher.classList.remove('active');
        }
    });

    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            setTheme(theme);
            themeSwitcher.classList.remove('active');

            // Add a subtle animation
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
        });
    });

    // Keyboard navigation
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeSwitcher.classList.toggle('active');
        }
    });

    themeOptions.forEach((option, index) => {
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const next = themeOptions[index + 1] || themeOptions[0];
                next.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = themeOptions[index - 1] || themeOptions[themeOptions.length - 1];
                prev.focus();
            }
        });
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pureextracts-theme', theme);

    // Update active state in options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.toggle('active', option.dataset.theme === theme);
    });

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

/**
 * Navigation
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Toggle aria-expanded
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    links.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    e.preventDefault();
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without scrolling
                    history.pushState(null, '', targetId);
                }
            });
        }
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;

    // Throttled scroll handler
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Add scrolled class for nav styling
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show nav on scroll (optional - can enable if desired)
        // if (currentScrollY > lastScrollY && currentScrollY > 200) {
        //     nav.style.transform = 'translateY(-100%)';
        // } else {
        //     nav.style.transform = 'translateY(0)';
        // }

        lastScrollY = currentScrollY;
    }

    // Reveal animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for reveal animation
    document.querySelectorAll('.research-card, .product-card, .service-card, .trust-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

/**
 * Forms
 */
function initForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            const button = newsletterForm.querySelector('button');
            const originalText = button.innerHTML;

            // Show loading state
            button.innerHTML = '<span>Joining...</span>';
            button.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success
            button.innerHTML = '<span>Joined!</span>';
            newsletterForm.reset();

            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);

            // Show success message (could be a toast notification)
            console.log('Newsletter signup:', email);
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            // Show loading state
            button.innerHTML = '<span>Sending...</span>';
            button.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success
            button.innerHTML = '<span>Message Sent!</span>';
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 3000);

            console.log('Contact form submission:', data);
        });
    }

    // Add floating label effect (optional enhancement)
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check initial state
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

/**
 * Animations
 */
function initAnimations() {
    // Add CSS for revealed state
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger reveal animations
    const cards = document.querySelectorAll('.research-card, .product-card, .service-card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Hero animations
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        // Trigger animation after a short delay
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // Molecule animation enhancement
    const molecule = document.querySelector('.hero-molecule');
    if (molecule) {
        let rotation = 0;
        const animate = () => {
            rotation += 0.1;
            molecule.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(animate);
        };
        // Uncomment to enable slow rotation:
        // animate();
    }
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setTheme };
}
