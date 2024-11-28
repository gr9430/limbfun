let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];
let highlightedZone = null; // Stores the currently highlighted zone

function preload() {
    img = loadImage('https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => console.log('Image loaded successfully'),
        () => console.error('Failed to load image')
    );
}

function setup() {
    console.log('Starting setup...');
    let canvas = createCanvas(800, 1000); // Increased height for more space
    canvas.parent('canvas-container');
    canvas.style('max-width', '100%');
    canvas.style('height', 'auto');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');
}

function draw() {
    if (img) {
        background(255); // Clear the background to white before drawing the image
        let imgWidth = img.width;
        let imgHeight = img.height;

        // Calculate scaling to fit within the canvas while maintaining aspect ratio
        let aspectRatio = imgWidth / imgHeight;
        let canvasAspectRatio = width / height;
        let newWidth, newHeight, xOffset, yOffset;

        if (aspectRatio > canvasAspectRatio) {
            // Fit by width
            newWidth = width;
            newHeight = newWidth / aspectRatio;
            xOffset = 0;
            yOffset = (height - newHeight) / 2;
        } else {
            // Fit by height
            newHeight = height;
            newWidth = newHeight * aspectRatio;
            xOffset = (width - newWidth) / 2;
            yOffset = 0;
        }

        // Draw the scaled image
        image(img, xOffset, yOffset, newWidth, newHeight);

        // Calculate the scaling factors to adjust mouse coordinates
        let xScale = newWidth / imgWidth;
        let yScale = newHeight / imgHeight;

        // Adjusted mouse coordinates for scaled image
        let adjustedMouseX = (mouseX - xOffset) / xScale;
        let adjustedMouseY = (mouseY - yOffset) / yScale;

        highlightedZone = null;

        // Define interactive zones based on adjusted coordinates
        if (adjustedMouseX > 50 && adjustedMouseX < 150 && adjustedMouseY > 300 && adjustedMouseY < 400) { // Bird
            cursor('pointer');
            highlightedZone = { x: 50 * xScale + xOffset, y: 300 * yScale + yOffset, w: 100 * xScale, h: 100 * yScale };
        } else if (adjustedMouseX > 200 && adjustedMouseX < 400 && adjustedMouseY > 500 && adjustedMouseY < 600) { // Shore
            cursor('pointer');
            highlightedZone = { x: 200 * xScale + xOffset, y: 500 * yScale + yOffset, w: 200 * xScale, h: 100 * yScale };
        } else if (adjustedMouseX > 600 && adjustedMouseX < 700 && adjustedMouseY > 600 && adjustedMouseY < 700) { // Waves
            cursor('pointer');
            highlightedZone = { x: 600 * xScale + xOffset, y: 600 * yScale + yOffset, w: 100 * xScale, h: 100 * yScale };
        } else if (adjustedMouseX > 700 && adjustedMouseX < 800 && adjustedMouseY > 100 && adjustedMouseY < 300) { // Building
            cursor('pointer');
            highlightedZone = { x: 700 * xScale + xOffset, y: 100 * yScale + yOffset, w: 100 * xScale, h: 200 * yScale };
        } else if (adjustedMouseX > 400 && adjustedMouseX < 500 && adjustedMouseY > 100 && adjustedMouseY < 200) { // Smoke Plumes
            cursor('pointer');
            highlightedZone = { x: 400 * xScale + xOffset, y: 100 * yScale + yOffset, w: 100 * xScale, h: 100 * yScale };
        } else {
            cursor('default');
        }

        // Draw highlighted zone if applicable
        if (highlightedZone) {
            fill(200, 200, 200, 100); // Light grey color with 40% opacity
            rect(highlightedZone.x, highlightedZone.y, highlightedZone.w, highlightedZone.h);
        }

        // Display information on canvas
        displayCoordinates();
        displayStanzasRead();
        displayRevealedMessages();
    } else {
        background(255); // Fallback if image fails to load
    }
}

function displayCoordinates() {
    // Draw a white rectangle to improve the visibility of coordinates
    fill(255);
    rect(0, height - 30, 120, 30); // Slightly increased width for more space

    // Draw mouse coordinates
    fill(0);
    textSize(14);
    text(`X: ${mouseX}, Y: ${mouseY}`, 10, height - 10);
}

function displayStanzasRead() {
    fill(0);
    text(`Stanzas Read: ${stanzasRead} / ${totalInteractions}`, 10, 30);
}

function displayRevealedMessages() {
    fill(0);
    for (let i = 0; i < revealedMessages.length; i++) {
        text(revealedMessages[i], 50, 50 + i * 30);
    }
}

function mousePressed() {
    // Calculate scaling factors again to match the drawn image
    let imgWidth = img.width;
    let imgHeight = img.height;
    let aspectRatio = imgWidth / imgHeight;
    let canvasAspectRatio = width / height;
    let newWidth, newHeight, xOffset, yOffset;

    if (aspectRatio > canvasAspectRatio) {
        // Fit by width
        newWidth = width;
        newHeight = newWidth / aspectRatio;
        xOffset = 0;
        yOffset = (height - newHeight) / 2;
    } else {
        // Fit by height
        newHeight = height;
        newWidth = newHeight * aspectRatio;
        xOffset = (width - newWidth) / 2;
        yOffset = 0;
    }

    let xScale = newWidth / imgWidth;
    let yScale = newHeight / imgHeight;

    // Adjust mouse position
    let adjustedMouseX = (mouseX - xOffset) / xScale;
    let adjustedMouseY = (mouseY - yOffset) / yScale;

    // Interactive zones with messages
    if (adjustedMouseX > 50 && adjustedMouseX < 150 && adjustedMouseY > 300 && adjustedMouseY < 400) { // Bird
        if (!revealedMessages.includes("The bird sings softly, echoing over the waves.")) {
            revealedMessages.push("The bird sings softly, echoing over the waves.");
            interactions++;
            stanzasRead++;
        }
    } else if (adjustedMouseX > 200 && adjustedMouseX < 400 && adjustedMouseY > 500 && adjustedMouseY < 600) { // Shore
        if (!revealedMessages.includes("The shore glimmers under the fading sunlight.")) {
            revealedMessages.push("The shore glimmers under the fading sunlight.");
            interactions++;
            stanzasRead++;
        }
    } else if (adjustedMouseX > 600 && adjustedMouseX < 700 && adjustedMouseY > 600 && adjustedMouseY < 700) { // Waves
        if (!revealedMessages.includes("The waves crash with a rhythmic persistence.")) {
            revealedMessages.push("The waves crash with a rhythmic persistence.");
            interactions++;
            stanzasRead++;
        }
    } else if (adjustedMouseX > 700 && adjustedMouseX < 800 && adjustedMouseY > 100 && adjustedMouseY < 300) { // Building
        if (!revealedMessages.includes("The building stands tall, weathered by time.")) {
            revealedMessages.push("The building stands tall, weathered by time.");
            interactions++;
            stanzasRead++;
        }
    } else if (adjustedMouseX > 400 && adjustedMouseX < 500 && adjustedMouseY > 100 && adjustedMouseY < 200) { // Smoke Plumes
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

function endGame() {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    if (stanzasRead >= totalInteractions) {
        text("You have unveiled all the secrets of the scene.", width / 2, height / 2);
    } else {
        text("The story remains incomplete. Try again.", width / 2, height / 2);
    }
}

// Assign p5.js functions to window object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

console.log('Script loaded successfully');
