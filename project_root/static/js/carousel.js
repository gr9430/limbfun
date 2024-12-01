// Declare `currentIndex` only once globally
let currentIndex = 0; // Correct declaration

// Carousel Functionality
function initializeCarousel() {
    const prevButton = document.querySelector('.carousel-btn.left');
    const nextButton = document.querySelector('.carousel-btn.right');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const images = document.querySelectorAll('.carousel-image');

    // Function to show image based on currentIndex
    function showImage(index) {
        const totalImages = images.length;
        if (index >= totalImages) currentIndex = 0; // Loop to start
        else if (index < 0) currentIndex = totalImages - 1; // Loop to end

        const offset = -currentIndex * 100; // Move wrapper to show the current image
        carouselWrapper.style.transform = `translateX(${offset}%)`;
    }

    // Event listeners for carousel buttons
    prevButton.addEventListener('click', () => {
        currentIndex--;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex++;
        showImage(currentIndex);
    });

    // Fullscreen functionality for images
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

    // Initialize with the first image
    showImage(currentIndex);
}

// Initialize carousel when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeCarousel(); // Initialize carousel functionality
});
