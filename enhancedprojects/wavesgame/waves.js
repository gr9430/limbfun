let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];
let resetButton;

// Preload the image
function preload() {
    img = loadImage(
        'https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => {
            console.log('Image loaded successfully');
        },
        () => console.error('Failed to load image')
    );
}

// Set up the game canvas and message area
function setup() {
    console.log('Starting setup...');
    let canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        // Create the canvas with the dimensions of the image
        let canvas = createCanvas(img.width, img.height);
        canvas.parent(canvasContainer);

        // Set container dimensions to match the canvas dimensions
        canvasContainer.style.width = img.width + 'px';
        canvasContainer.style.height = (img.height * 0.75) + 'px';
        canvasContainer.style.backgroundColor = '#ffffff'; // Set background color to white

        canvas.style('max-width', '100%');
        canvas.style('height', 'auto');
    } else {
        console.error("Canvas container not found");
    }
    
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');

    // Move title and opening line to container
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        messageContainer.style.height = (img.height * 0.75) + 'px';
        messageContainer.style.backgroundColor = "#000000"; // Set background color to black
        let title = document.createElement("h1");
        title.textContent = "The Waves Forget the Structure";
        title.className = "message-title"; // Added class for consistency with CSS styling
        messageContainer.appendChild(title);

        let openingLine = document.createElement("p");
        openingLine.textContent = "here,";
        openingLine.className = "message-opening-line"; // Added class for consistency with CSS styling
        messageContainer.appendChild(openingLine);
    }

    // Create the reset button but keep it hidden initially
    resetButton = createButton('Reset Game');
    resetButton.position(width / 2 - 50, height / 2); // Center the button on the canvas
    resetButton.mousePressed(resetGame);
    resetButton.hide(); // Initially hide the reset button
}

// Draw the canvas and check for interactive zones
function draw() {
    if (img) {
        background(255);
        image(img, 0, 0, width, height);
    } else {
        background(255);
    }

    displayStanzasCompleted();
    displayRevealedMessages();

    // Define interactive zones
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) {
        cursor('pointer');
        highlightZone(115, 770, 218, 845);
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) {
        cursor('pointer');
        highlightZone(225, 750, 500, 910);
    } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) {
        cursor('pointer');
        highlightZone(465, 470, 955, 735);
    } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) {
        cursor('pointer');
        highlightZone(125, 75, 420, 740);
    } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) {
        cursor('pointer');
        highlightZone(640, 5, 955, 325);
    } else {
        cursor('default');
    }

    // Show the reset button when all stanzas are completed
    if (stanzasRead >= totalInteractions) {
        resetButton.show(); // Show the reset button
    } else {
        resetButton.hide(); // Hide the reset button until the game is complete
    }
}

// Check if the mouse is within a defined zone
function isWithinZone(x, y, x1, y1, x2, y2) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

// Highlight the interactive zone when mouse is hovering
function highlightZone(x1, y1, x2, y2) {
    fill(200, 200, 200, 100); // Light grey color with 40% opacity
    noStroke();
    rect(x1, y1, x2 - x1, y2 - y1);
}

// Display the number of completed stanzas
function displayStanzasCompleted() {
    fill(0);
    textSize(20); // Increased text size for better visibility
    text(`Stanzas Completed: ${stanzasRead} / ${totalInteractions}`, 10, 30);
}

// Display the revealed messages
function displayRevealedMessages() {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        // Clear previous messages, but keep the title and opening line
        const titleHTML = messageContainer.querySelector("h1") ? messageContainer.querySelector("h1").outerHTML : "";
        const openingLineHTML = messageContainer.querySelector("p") ? messageContainer.querySelector("p").outerHTML : "";
        
        messageContainer.innerHTML = titleHTML + openingLineHTML;

        for (let i = 0; i < revealedMessages.length; i++) {
            let paragraph = document.createElement("p");
            paragraph.textContent = revealedMessages[i];
            paragraph.className = "message-stanza"; // Added class for consistency with CSS styling
            messageContainer.appendChild(paragraph);
        }
    }
}

// Handle mouse click interactions
function mousePressed() {
    if (stanzasRead < totalInteractions) {
        // Update revealed messages and stanzasRead when user interacts
        revealedMessages.push(`Stanza ${stanzasRead + 1} revealed!`);
        stanzasRead++;
    }
}

// Reset the game
function resetGame() {
    stanzasRead = 0; // Reset the number of stanzas
    interactions = 0; // Reset interactions
    revealedMessages = []; // Clear revealed messages
    resetButton.hide(); // Hide the reset button again after resetting
    // Optionally, you can reset the canvas here if needed
}
