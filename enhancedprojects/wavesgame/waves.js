let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];

// Load the image
function preload() {
    img = loadImage('https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => console.log('Image loaded successfully'),
        () => console.error('Failed to load image')
    );
}

// Set up the canvas and styling
function setup() {
    console.log('Starting setup...');
    let canvas = createCanvas(800, 1000); // Canvas dimensions
    canvas.parent('canvas-container');
    canvas.style('max-width', '100%');
    canvas.style('height', 'auto');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');
}

// Draw the image and interactive zones
function draw() {
    if (img) {
        background(255); // Clear the background to white before drawing the image
        let imgWidth = img.width;
        let imgHeight = img.height;

        // Calculate scaling to fit within the canvas while maintaining aspect ratio
        let aspectRatio = imgWidth / imgHeight;
        let canvasAspectRatio = width / height;

        if (aspectRatio > canvasAspectRatio) {
            // Fit by width
            let newWidth = width;
            let newHeight = newWidth / aspectRatio;
            image(img, 0, (height - newHeight) / 2, newWidth, newHeight);
        } else {
            // Fit by height
            let newHeight = height;
            let newWidth = newHeight * aspectRatio;
            image(img, (width - newWidth) / 2, 0, newWidth, newHeight);
        }
    } else {
        background(255); // Fallback if image fails to load
    }

    displayStanzasRead();
    displayRevealedMessages();

    // Define interactive zones and change cursor when hovering over elements
    if (mouseX > 115 && mouseX < 218 && mouseY > 770 && mouseY < 845) { // Bird
        highlightZone(115, 770, 103, 75);
    } else if (mouseX > 225 && mouseX < 500 && mouseY > 750 && mouseY < 910) { // Shore
        highlightZone(225, 750, 275, 160);
    } else if (mouseX > 465 && mouseX < 955 && mouseY > 470 && mouseY < 735) { // Waves
        highlightZone(465, 470, 490, 265);
    } else if (mouseX > 125 && mouseX < 420 && mouseY > 75 && mouseY < 740) { // Building
        highlightZone(125, 75, 295, 665);
    } else if (mouseX > 640 && mouseX < 955 && mouseY > 5 && mouseY < 325) { // Plume
        highlightZone(640, 5, 315, 320);
    } else {
        cursor('default');
    }
}

// Function to draw a translucent rectangle when an element is highlighted
function highlightZone(x, y, width, height) {
    cursor('pointer');
    fill(200, 200, 200, 100); // Light gray color with 40% opacity
    noStroke();
    rect(x, y, width, height);
}

// Display the number of stanzas read
function displayStanzasRead() {
    fill(0);
    textSize(16);
    text(`Stanzas Read: ${stanzasRead} / ${totalInteractions}`, 10, 30);
}

// Display revealed messages in the message container below the canvas
function displayRevealedMessages() {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        messageContainer.innerHTML = ""; // Clear previous messages
        revealedMessages.forEach(message => {
            const p = document.createElement("p");
            p.textContent = message;
            messageContainer.appendChild(p);
        });
    }
}

// Handle mouse click events on the interactive zones
function mousePressed() {
    // Interactive zones with messages
    if (mouseX > 115 && mouseX < 218 && mouseY > 770 && mouseY < 845) { // Bird
        if (!revealedMessages.includes("The bird sings softly, echoing over the waves.")) {
            revealedMessages.push("The bird sings softly, echoing over the waves.");
            interactions++;
            stanzasRead++;
        }
    } else if (mouseX > 225 && mouseX < 500 && mouseY > 750 && mouseY < 910) { // Shore
        if (!revealedMessages.includes("The shore glimmers under the fading sunlight.")) {
            revealedMessages.push("The shore glimmers under the fading sunlight.");
            interactions++;
            stanzasRead++;
        }
    } else if (mouseX > 465 && mouseX < 955 && mouseY > 470 && mouseY < 735) { // Waves
        if (!revealedMessages.includes("The waves crash with a rhythmic persistence.")) {
            revealedMessages.push("The waves crash with a rhythmic persistence.");
            interactions++;
            stanzasRead++;
        }
    } else if (mouseX > 125 && mouseX < 420 && mouseY > 75 && mouseY < 740) { // Building
        if (!revealedMessages.includes("The building stands tall, weathered by time.")) {
            revealedMessages.push("The building stands tall, weathered by time.");
            interactions++;
            stanzasRead++;
        }
    } else if (mouseX > 640 && mouseX < 955 && mouseY > 5 && mouseY < 325) { // Plume
        if (!revealedMessages.includes("Smoke plumes rise, blurring into the sky.")) {
            revealedMessages.push("Smoke plumes rise, blurring into the sky.");
            interactions++;
            stanzasRead++;
        }
    }

    // Check if all interactions are complete
    if (interactions >= totalInteractions) {
        endGame();
    }
}

// End the game and reveal all messages if finished early
function endGame(finishedEarly = false) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);

    if (finishedEarly) {
        text("You've chosen to end the poem early. Here's the complete scene.", width / 2, height / 2);
        // Reveal all messages as if interactions were completed
        revealedMessages = [
            "The bird sings softly, echoing over the waves.",
            "The shore glimmers under the fading sunlight.",
            "The waves crash with a rhythmic persistence.",
            "The building stands tall, weathered by time.",
            "Smoke plumes rise, blurring into the sky."
        ];
        stanzasRead = totalInteractions;
        interactions = totalInteractions;
        displayRevealedMessages();
    } else if (stanzasRead >= totalInteractions) {
        text("You have unveiled all the secrets of the scene.", width / 2, height / 2);
    } else {
        text("The story remains incomplete. Try again.", width / 2, height / 2);
    }
}

// Assign p5.js functions to the window object for accessibility
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

console.log('Script loaded successfully');
