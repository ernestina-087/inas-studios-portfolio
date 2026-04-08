/**
 * Gallery JS
 * Handles Portfolio Filtering and Lightbox Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initGalleryFiltering();
    initLightbox();
});

function initGalleryFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    // Small delay to allow CSS display change before animating opacity
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    // Wait for transition before hiding
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 400); // matches CSS transition time
                }
            });
        });
    });
}

function initLightbox() {
    const items = Array.from(document.querySelectorAll('.portfolio-item'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    // We only want to navigate through currently visible items
    let visibleItems = [];

    // Open lightbox
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Update visible items array based on what is currently not hidden
            visibleItems = items.filter(i => !i.classList.contains('hidden'));
            currentIndex = visibleItems.indexOf(item);

            showImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        // Optionally clear src after fade out
        setTimeout(() => lightboxImg.src = '', 300);
    };

    closeBtn.addEventListener('click', closeLightbox);

    // Close on clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation
    const showPrev = () => {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showImage(currentIndex);
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showImage(currentIndex);
    };

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    // Display image function
    function showImage(index) {
        if (visibleItems.length === 0) return;

        const item = visibleItems[index];
        const highResSrc = item.getAttribute('data-src');
        const title = item.querySelector('.item-title').textContent;
        const category = item.querySelector('.item-category').textContent;

        lightboxImg.src = highResSrc;
        lightboxCaption.innerHTML = `<span style="color:var(--accent-color); font-size:0.9rem; text-transform:uppercase;">${category}</span><br>${title}`;
    }

    // Keyboard bindings
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}
