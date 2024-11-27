// Carousel Functionality
let currentIndex = 0; // Index of the currently visible image

// Function to show the image at the specified index
function showImage(index) {
    const images = document.querySelectorAll('.carousel-image'); // Select all images
    images.forEach((img, i) => {
        img.classList.remove('active'); // Hide all images
        if (i === index) {
            img.classList.add('active'); // Show the active image
        }
    });
}

// Function to navigate to the previous image
function prevImage() {
    const images = document.querySelectorAll('.carousel-image');
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1; // Loop back to the last image if at the start
    showImage(currentIndex);
}

// Function to navigate to the next image
function nextImage() {
    const images = document.querySelectorAll('.carousel-image');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1; // Loop back to the first image if at the end
    showImage(currentIndex);
}

// Initial setup: Show the first image on page load
document.addEventListener('DOMContentLoaded', () => {
    showImage(currentIndex);
});

// Paragraph Generator Functionality
document.getElementById("generateBtn").addEventListener("click", function () {
    const apiURL = "https://recapitating-massive.onrender.com/generate_paragraph?num_sentences=10";
    const output = document.getElementById("output");

    output.innerText = "Loading..."; // Show a loading message while waiting for the response

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.paragraph) {
                output.innerText = data.paragraph; // Display the generated paragraph
            } else {
                output.innerText = "Error: No paragraph generated.";
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            output.innerText = `Error: ${error.message}`;
        });
});
