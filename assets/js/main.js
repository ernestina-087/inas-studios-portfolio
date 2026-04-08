/**
 * Main JavaScript File for Ina's Studios
 * Handles core functionality: Component loading, Mobile Menu, Scroll Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Components (Header and Footer)
    loadComponents().then(() => {
        // Initialize UI components after HTML is loaded
        initMobileMenu();
        initActiveNavLinks();
    });

    // 2. Initialize Scroll Animations
    initScrollAnimations();
    
    // 3. Initialize Sticky Header
    initStickyHeader();
});

/**
 * Dynamically loads the navbar and footer components
 * This allows us to have a single source of truth for navigation without a framework
 */
async function loadComponents() {
    try {
        // Get placeholders
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        // Fetch component HTML
        if (headerPlaceholder) {
            const headerRes = await fetch('components/navbar.html');
            const headerHtml = await headerRes.text();
            headerPlaceholder.innerHTML = headerHtml;
        }

        if (footerPlaceholder) {
            const footerRes = await fetch('components/footer.html');
            const footerHtml = await footerRes.text();
            footerPlaceholder.innerHTML = footerHtml;
        }
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

/**
 * Handles the mobile hamburger menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon (assuming using FontAwesome or similar, or just relying on CSS)
            if (navLinks.classList.contains('active')) {
                menuBtn.innerHTML = '✕'; // Close icon
            } else {
                menuBtn.innerHTML = '☰'; // Hamburger icon
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '☰';
            });
        });
    }
}

/**
 * Highlights the active link based on the current page URL
 */
function initActiveNavLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            // Special case for root / targeting index.html
            if(currentPage === '' && linkPage === 'index.html') {
                link.classList.add('active');
            }
        }
    });
}

/**
 * Uses IntersectionObserver to trigger fade-in animations when scrolling
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animating to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Get all elements with the animation classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Changes header styling when page is scrolled
 */
function initStickyHeader() {
    const header = document.querySelector('header') || document.getElementById('header-placeholder');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
