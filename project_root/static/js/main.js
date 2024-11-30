// Ensure 'allRatedBooks' is only defined once globally and not redefined later.
if (typeof allRatedBooks === 'undefined') {
    var allRatedBooks = new Set();
}

(function() {
    // Function to load a component into a specific element.
    async function loadComponent(filePath, elementId) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(`Loading component from ${filePath} into #${elementId}`);
            const data = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with ID '${elementId}' not found.`);
            }
        } catch (error) {
            console.error(`Error loading ${filePath}:`, error);
        }
    }

    // Function to load a CSS file dynamically.
    function loadCSS(filePath) {
        if (!document.querySelector(`link[href="${filePath}"]`)) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = filePath;
            link.type = "text/css";
            link.onload = () => console.log(`CSS Loaded: ${filePath}`);
            link.onerror = () => console.error(`Failed to load CSS: ${filePath}`);
            document.head.appendChild(link);
        }
    }

    (function() {
        function initializeCarousel() {
          let currentIndex = 0;
      
          function showImage(index) {
            const images = document.querySelectorAll('.carousel-image');
            if (!images.length) return;
      
            // Loop through all images, making sure only the current one is visible
            images.forEach((img, i) => {
              img.classList.toggle('active', i === index);
              img.style.opacity = i === index ? '1' : '0';
              img.style.transition = 'opacity 0.5s ease-in-out'; // Smooth transition
            });
          }
      
          function prevImage() {
            const images = document.querySelectorAll('.carousel-image');
            if (images.length === 0) return;
      
            currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
            showImage(currentIndex);
          }
      
          function nextImage() {
            const images = document.querySelectorAll('.carousel-image');
            if (images.length === 0) return;
      
            currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
            showImage(currentIndex);
          }
      
          // Initial load
          showImage(currentIndex);
      
          // Carousel button handlers
          document.querySelector('.carousel-btn.left')?.addEventListener('click', prevImage);
          document.querySelector('.carousel-btn.right')?.addEventListener('click', nextImage);
      
          // Automatic carousel (Optional)
          setInterval(nextImage, 5000); // Change images every 5 seconds
        }
      
        // Initialize the Carousel when DOM is ready
        document.addEventListener("DOMContentLoaded", () => {
          initializeCarousel();
        });
      })();
      
    // Navbar dropdown menu handling.
    function initializeNavbarDropdown() {
        document.querySelectorAll('.navbar li').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'block';
                }
            });
            item.addEventListener('mouseleave', () => {
                const dropdown = item.querySelector('.dropdown-menu');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            });
        });
    }

    // Paragraph Generator Functionality.
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

    // JSON Data Fetch and Book Display Functionality.
    async function fetchJsonData() {
        try {
            const response = await fetch("/ENG6806/originalprojects/newnovelcuriosity/newnovel.json");
            if (!response.ok) throw new Error("Network response was not ok");
            const jsonData = await response.json();
            const displayedBooks = getRandomBooks(jsonData, 10);
            displayBooks(displayedBooks);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    function getRandomBooks(jsonData, count) {
        const books = [
            ...jsonData.Proto_New_Novel_Precursors_to_the_Movement_Before_1948.map(book => ({ ...book, genre: "Proto-New Novel" })),
            ...jsonData.New_Novel_Core_Works_of_the_Movement_1948_1965.Key_Authors.map(book => ({ ...book, genre: "New Novel Core Works" })),
            ...jsonData.New_Novel_Core_Works_of_the_Movement_1948_1965.Other_Authors_Aligning_with_the_Movement.map(book => ({ ...book, genre: "New Novel Core Works" })),
            ...jsonData.Post_New_Novel_Influenced_by_the_Movement_1966_Present.map(book => ({ ...book, genre: "Post-New Novel" }))
        ].filter(book => !allRatedBooks.has(book.title));
        return books.sort(() => 0.5 - Math.random()).slice(0, count);
    }

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

    // Load components, initialize features, and load CSS once DOM is fully loaded.
    document.addEventListener("DOMContentLoaded", async () => {
        // Load reusable components into the page.
        await loadComponent("/ENG6806/banner.html", "banner-container");
        await loadComponent("/ENG6806/navbar.html", "navbar-container");
        await loadComponent("/ENG6806/footer.html", "footer-container");

        // Load the CSS dynamically.
        loadCSS("/ENG6806/project_root/static/css/style.css");

        // Initialize features only after components are loaded.
        initializeCarousel();
        initializeNavbarDropdown();
        initializeParagraphGenerator();
        fetchJsonData();
    });

})();
