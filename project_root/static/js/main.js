// Function to load a component into a specific element
function loadComponent(filePath, elementId) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
        });
}

// Load the banner, navbar, and footer
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("banner.html", "banner-container");
    loadComponent("navbar.html", "navbar-container");
    loadComponent("footer.html", "footer-container");
});

footer {
    text-align: center; /* Horizontally center the text */
    padding: 10px; /* Add some spacing inside the footer */
    background-color: #111111; /* Optional: Add a background color */
    color: #ffffff; /* Optional: Set text color */
    font-size: 14px; /* Optional: Adjust font size */
}

// Carousel Functionality
let currentIndex = 0;
let isThrottled = false;

function showImage(index) {
    const images = document.querySelectorAll('.carousel-image');
    if (!images.length) return;
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
        img.setAttribute('aria-hidden', i !== index); // Accessibility
    });
}

function prevImage() {
    if (isThrottled) return;
    isThrottled = true;
    const images = document.querySelectorAll('.carousel-image');
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
    setTimeout(() => (isThrottled = false), 500);
}

function nextImage() {
    if (isThrottled) return;
    isThrottled = true;
    const images = document.querySelectorAll('.carousel-image');
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
    setTimeout(() => (isThrottled = false), 500);
}

document.addEventListener('DOMContentLoaded', () => {
    showImage(currentIndex);

    const overlay = document.querySelector('.fullscreen-overlay');
    const overlayImg = overlay?.querySelector('img');

    document.querySelectorAll('.carousel-image').forEach((img) => {
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

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "Escape" && overlay?.style.display === "flex") {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Paragraph Generator
    const generateBtn = document.getElementById('generateBtn');
    const output = document.getElementById('output');

    if (generateBtn && output) {
        generateBtn.addEventListener('click', async () => {
            const apiURL = "https://recapitating-massive.onrender.com/generate_paragraph?num_sentences=10";
            output.innerText = "Loading...";
            try {
                const response = await fetch(apiURL);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                output.innerText = data.paragraph || "Error: Unable to generate a paragraph.";
            } catch (error) {
                console.error("Fetch Error:", error);
                output.innerText = `Error: Unable to connect to the server. Please try again later.`;
            }
        });
    }
});
