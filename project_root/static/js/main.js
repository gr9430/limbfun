fetch("navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => {
        console.error("Error loading navbar:", error);
    });

// Carousel Functionality
let currentIndex = 0; // Index of the currently visible image
let isThrottled = false; // Throttle state for navigation buttons

// Function to show the image at the specified index
function showImage(index) {
    const images = document.querySelectorAll('.carousel-image');
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
    });
}

// Function to navigate to the previous image
function prevImage() {
    if (isThrottled) return; // Prevent action if throttled
    isThrottled = true;
    const images = document.querySelectorAll('.carousel-image');
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
    setTimeout(() => (isThrottled = false), 500); // Throttle duration matches transition time
}

// Function to navigate to the next image
function nextImage() {
    if (isThrottled) return; // Prevent action if throttled
    isThrottled = true;
    const images = document.querySelectorAll('.carousel-image');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
    setTimeout(() => (isThrottled = false), 500); // Throttle duration matches transition time
}

// Initial setup: Show the first image on page load
document.addEventListener('DOMContentLoaded', () => {
    showImage(currentIndex);

    // Fullscreen functionality
    const overlay = document.querySelector('.fullscreen-overlay');
    const overlayImg = overlay?.querySelector('img');

    document.querySelectorAll('.carousel-image').forEach((img) => {
        img.addEventListener('click', () => {
            if (overlay && overlayImg) {
                overlay.style.display = 'flex';
                overlayImg.src = img.src;
            }
        });
    });

    // Close fullscreen when clicking outside the image
    overlay?.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
});

// Paragraph Generator Functionality
const generateBtn = document.getElementById('generateBtn');
const output = document.getElementById('output');

if (generateBtn && output) {
    generateBtn.addEventListener('click', () => {
        const apiURL = "https://recapitating-massive.onrender.com/generate_paragraph?num_sentences=10";
        output.innerText = "Loading...";

        fetch(apiURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.paragraph) {
                    output.innerText = data.paragraph;
                } else {
                    output.innerText = "Error: No paragraph generated.";
                }
            })
            .catch((error) => {
                console.error("Fetch Error:", error);
                output.innerText = `Error: ${error.message}`;
            });
    });
}
