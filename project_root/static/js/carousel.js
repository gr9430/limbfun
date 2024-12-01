let currentIndex = 0; // Global current index for tracking carousel position

// Initialize Carousel
function initializeCarousel() {
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.carousel-btn.left');
    const nextButton = document.querySelector('.carousel-btn.right');
    const carouselWrapper = document.querySelector('.carousel-wrapper');

    // Show the image corresponding to the current index
    function showImage(index) {
        const totalImages = images.length;
        if (index >= totalImages) currentIndex = 0; // Loop back to start
        else if (index < 0) currentIndex = totalImages - 1; // Loop back to end

        console.log(`Displaying image at index: ${currentIndex}`); // Debug log

        // Move the carousel wrapper to the correct image position
        const offset = -currentIndex * 100; // Move wrapper to show the current image
        carouselWrapper.style.transform = `translateX(${offset}%)`;

        // Set the active image
        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex); // Only show the active image
        });
    }

    // Event listener for the previous button
    prevButton.addEventListener('click', () => {
        console.log('Previous button clicked');
        currentIndex--;
        showImage(currentIndex);
    });

    // Event listener for the next button
    nextButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentIndex++;
        showImage(currentIndex);
    });

    // Initialize with the first image
    showImage(currentIndex);
}

// Wait for the DOM to be fully loaded before initializing the carousel
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing carousel');
    initializeCarousel(); // Initialize the carousel functionality
});
