// Declare `currentIndex` only once globally
let currentIndex = 0; // Correct declaration

// Carousel Functionality
function initializeCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.carousel-btn.left');
    const nextButton = document.querySelector('.carousel-btn.right');
    const carouselWrapper = document.querySelector('.carousel-wrapper');

    // Function to show image based on currentIndex
    function showImage(index) {
        const totalImages = images.length;
        if (index >= totalImages) currentIndex = 0; // Loop to start
        else if (index < 0) currentIndex = totalImages - 1; // Loop to end

        const offset = -currentIndex * 100; // Move wrapper to show the current image
        carouselWrapper.style.transform = `translateX(${offset}%)`;

        // Hide all images and show the current one
        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });
    }

    // Show the initial image
    showImage(currentIndex);

    // Event listeners for buttons
    prevButton.addEventListener('click', () => {
        currentIndex--;
        showImage(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex++;
        showImage(currentIndex);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeCarousel(); // Initialize carousel functionality
});
