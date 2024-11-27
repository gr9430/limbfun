// Function to load a component into a specific element
function loadComponent(filePath, elementId) {
    const isRootPath = window.location.pathname.includes("enhancedprojects");
    const resolvedPath = isRootPath ? `../${filePath}` : filePath;

    fetch(resolvedPath)
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
            console.error(`Error loading ${resolvedPath}:`, error);
        });
}

// Load the banner, navbar, and footer
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("ENG6806/banner.html", "banner-container");
    loadComponent("ENG6806/navbar.html", "navbar-container");
    loadComponent("ENG6806/footer.html", "footer-container");
});

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

// Typing logic for the poem
let titleIndex = 0;
let bodyIndex = 0;
const poemTitle = "The Waves Forget the Shoreline";
const poemBody = `here, before the smoke painted the sky
with shadows, before stone towers rose
to watch over the sand like sentinels.
No room remains for the sea’s slow song—
edges cutting across the sky, blind
to the waves.

Paths carve where sand once shifted
beneath unsteady feet. Iron holds firm,
sharp lines drawn into the earth,
a geometry leading forward.
The weight of time falls in rhythm,
not like waves that forget what they touch.`;

function typeTitle() {
    const titleElement = document.getElementById("poem-title");
    if (titleIndex < poemTitle.length) {
        titleElement.innerHTML += poemTitle.charAt(titleIndex++);
        setTimeout(typeTitle, 100);
    } else {
        setTimeout(typeBody, 500);
    }
}

function typeBody() {
    const bodyElement = document.getElementById("poem-text");
    if (bodyIndex < poemBody.length) {
        const char = poemBody.charAt(bodyIndex++);
        bodyElement.innerHTML += char === "\n" ? "<br>" : char;
        setTimeout(typeBody, char === "," || char === "." ? 300 : 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeTitle();
});
