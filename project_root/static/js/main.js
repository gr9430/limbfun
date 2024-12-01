// Declare `currentIndex` only once globally
let currentIndex = 0; // Correct declaration

// Function to load a component into a specific element
function loadComponent(filePath, elementId, callback = null) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                if (callback) {
                    callback(); // Call callback if provided, for additional initialization
                }
            } else {
                console.error(`Element with ID '${elementId}' not found.`);
            }
        })
        .catch(error => {
            console.error(`Error loading ${filePath}:`, error);
        });
}

// Function to initialize navbar dropdown functionality
function initializeNavBar() {
    const navBarElement = document.getElementById("navbar-container");
    if (navBarElement) {
        navBarElement.addEventListener('mouseover', (e) => {
            if (e.target.matches('.navbar li')) {
                const dropdown = e.target.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'block';
                }
            }
        });

        navBarElement.addEventListener('mouseout', (e) => {
            if (e.target.matches('.navbar li')) {
                const dropdown = e.target.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
    }
}

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

// Paragraph Generator Initialization
function initializeParagraphGenerator() {
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
}

// Fetch JSON data for books
let jsonData;
let allRatedBooks = new Set();

async function fetchJsonData() {
    try {
        const response = await fetch("/ENG6806/originalprojects/newnovelcuriosity/newnovel.json");
        if (!response.ok) throw new Error("Network response was not ok");
        jsonData = await response.json();
        const displayedBooks = getRandomBooks(jsonData, 10);
        displayBooks(displayedBooks);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

// Generate random books
function getRandomBooks(jsonData, count) {
    const books = [
        ...jsonData.Proto_New_Novel_Precursors_to_the_Movement_Before_1948.map(book => ({ ...book, genre: "Proto-New Novel" })),
        ...jsonData.New_Novel_Core_Works_of_the_Movement_1948_1965.Key_Authors.map(book => ({ ...book, genre: "New Novel Core Works" })),
        ...jsonData.New_Novel_Core_Works_of_the_Movement_1948_1965.Other_Authors_Aligning_with_the_Movement.map(book => ({ ...book, genre: "New Novel Core Works" })),
        ...jsonData.Post_New_Novel_Influenced_by_the_Movement_1966_Present.map(book => ({ ...book, genre: "Post-New Novel" }))
    ].filter(book => !allRatedBooks.has(book.title));
    return books.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Display books for rating
function displayBooks(books) {
    const bookList = document.getElementById("book-list");
    if (!bookList) return;
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        const bookContainer = document.createElement("div");
        bookContainer.className = "book-container";

        const bookTitle = document.createElement("div");
        bookTitle.className = "book-title";
        bookTitle.textContent = `${book.title} by ${book.author} (${book.year}, ${book.country})`;

        const ratingOptions = document.createElement("div");
        ratingOptions.className = "rating-options";
        [1, 2, 3, 4, 5].forEach(rating => {
            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `rating-${index}`;
            input.value = rating;
            label.appendChild(input);
            label.appendChild(document.createTextNode(rating));
            ratingOptions.appendChild(label);
        });

        const notReadLabel = document.createElement("label");
        const notReadInput = document.createElement("input");
        notReadInput.type = "radio";
        notReadInput.name = `rating-${index}`;
        notReadInput.value = "not-read";
        notReadLabel.appendChild(notReadInput);
        notReadLabel.appendChild(document.createTextNode("Haven't read it"));
        ratingOptions.appendChild(notReadLabel);

        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(ratingOptions);
        bookList.appendChild(bookContainer);
    });
}

// Load the CSS once DOM is ready
function loadCSS(filePath) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = filePath;
    link.type = "text/css";
    link.onload = () => console.log(`CSS Loaded: ${filePath}`);
    link.onerror = () => console.error(`Failed to load CSS: ${filePath}`);
    document.head.appendChild(link);
}

// Initialize everything once DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("/ENG6806/banner.html", "banner-container");
    loadComponent("/ENG6806/navbar.html", "navbar-container", initializeNavBar);
    loadComponent("/ENG6806/footer.html", "footer-container");
    initializeCarousel(); // Initialize carousel functionality
    initializeParagraphGenerator(); // Initialize paragraph generator
    fetchJsonData(); // Fetch book data
    loadCSS("/ENG6806/project_root/static/css/style.css"); // Load CSS
});
