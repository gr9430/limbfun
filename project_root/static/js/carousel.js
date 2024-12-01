// Declare `currentIndex` only once globally
let currentIndex = 0; // Correct declaration

// Carousel Functionality
function initializeCarousel() {
    function showImage(index) {
        const images = document.querySelectorAll('.carousel-image');
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function prevImage() {
        const images = document.querySelectorAll('.carousel-image');
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    }

    function nextImage() {
        const images = document.querySelectorAll('.carousel-image');
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }

    // Show the initial image
    showImage(currentIndex);

    // Attach event listeners to the buttons if they exist
    const prevButton = document.querySelector('.carousel-btn.left');
    const nextButton = document.querySelector('.carousel-btn.right');

    if (prevButton) {
        prevButton.addEventListener('click', prevImage);
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextImage);
    }

    // Fullscreen functionality
    const images = document.querySelectorAll('.carousel-image');
    const overlay = document.querySelector('.fullscreen-overlay');
    const overlayImg = overlay?.querySelector('img');

    images.forEach(img => {
        img.addEventListener('click', () => {
            if (overlay && overlayImg) {
                overlay.style.display = 'flex';
                overlayImg.src = img.src;
                document.body.style.overflow = 'hidden'; // Disable scrolling
            }
        });
    });

    overlay?.addEventListener('click', () => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Initialize everything once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeCarousel(); // Initialize carousel functionality
});
