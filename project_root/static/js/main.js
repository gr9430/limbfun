// Navbar Loader with LocalStorage Cache
const navbarCacheKey = "cachedNavbar";

const cachedNavbar = localStorage.getItem(navbarCacheKey);
if (cachedNavbar) {
    document.getElementById("navbar").innerHTML = cachedNavbar;
} else {
    fetch("https://gr9430.github.io/ENG6806/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar").innerHTML = data;
            localStorage.setItem(navbarCacheKey, data);
        })
        .catch(error => {
            console.error("Error loading navbar:", error);
        });
}

// Carousel Functionality
let currentIndex = 0;
let isThrottled = false;

function showImage(index) {
    const images = document.querySelectorAll('.carousel-image');
    if (!images.length) return; // Guard clause for empty NodeList
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
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
            }
        });
    });

    overlay?.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "Escape" && overlay?.style.display === "flex") {
            overlay.style.display = "none";
        }
    });
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
            output.innerText = `Error: ${error.message}`;
        }
    });
}
