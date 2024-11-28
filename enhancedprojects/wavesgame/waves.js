let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];
let imgWidth, imgHeight, scaledWidth, scaledHeight;
let offsetX, offsetY;

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
        imgWidth = img.width;
        imgHeight = img.height;

        // Calculate scaling to fit within the canvas while maintaining aspect ratio
        let aspectRatio = imgWidth / imgHeight;
        let canvasAspectRatio = width / height;

        if (aspectRatio > canvasAspectRatio) {
            // Fit by width
            scaledWidth = width;
            scaledHeight = scaledWidth / aspectRatio;
            offsetX = 0;
            offsetY = (height - scaledHeight) / 2;
            image(img, offsetX, offsetY, scaledWidth, scaledHeight);
        } else {
            // Fit by height
            scaledHeight = height;
            scaledWidth = scaledHeight * aspectRatio;
            offsetX = (width - scaledWidth) / 2;
            offsetY = 0;
            image(img, offsetX, offsetY, scaledWidth, scaledHeight);
        }

        // Draw semi-transparent rectangle to highlight hovered area
        drawHighlightZone();

    } else {
        background(255); // Fallback if image fails to load
    }
    displayCoordinates();
    displayStanzasRead();
    displayRevealedMessages();
}

function drawHighlightZone() {
    noFill();
    stroke(100, 100, 100, 100); // Light grey stroke

    // Define interactive zones, adjusted to the scaled size
    let zones = [
        { x: 50, y: 300, w: 100, h: 100, message: "The bird sings softly, echoing over the waves." },  // Bird
        { x: 200, y: 500, w: 200, h: 100, message: "The shore glimmers under the fading sunlight." },   // Shore
        { x: 600, y: 600, w: 100, h: 100, message: "The waves crash with a rhythmic persistence." },    // Waves
        { x: 700, y: 100, w: 100, h: 200, message: "The building stands tall, weathered by time." },    // Building
        { x: 400, y: 100, w: 100, h: 100, message: "Smoke plumes rise, blurring into the sky." }        // Smoke Plumes
    ];

    for (let zone of zones) {
        // Adjust zone coordinates to image scaling
        let adjX = offsetX + (zone.x / imgWidth) * scaledWidth;
        let adjY = offsetY + (zone.y / imgHeight) * scaledHeight;
        let adjW = (zone.w / imgWidth) * scaledWidth;
        let adjH = (zone.h / imgHeight) * scaledHeight;

        // Check if mouse is inside zone
        if (mouseX > adjX && mouseX < adjX + adjW && mouseY > adjY && mouseY < adjY + adjH) {
            cursor('pointer');
            fill(200, 200, 200, 100); // Light grey with 40% opacity
            noStroke();
            rect(adjX, adjY, adjW, adjH); // Draw the semi-transparent highlight
        } else {
            cursor('default');
        }
    }
}

function displayCoordinates() {
    // Draw a white rectangle to improve the visibility of coordinates
    fill(255);
    rect(0, height - 30, 150, 30); // Slightly increased width for more space

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
    // Define interactive zones with messages, adjusted to the scaled size
    let zones = [
        { x: 50, y: 300, w: 100, h: 100, message: "The bird sings softly, echoing over the waves." },  // Bird
        { x: 200, y: 500, w: 200, h: 100, message: "The shore glimmers under the fading sunlight." },   // Shore
        { x: 600, y: 600, w: 100, h: 100, message: "The waves crash with a rhythmic persistence." },    // Waves
        { x: 700, y: 100, w: 100, h: 200, message: "The building stands tall, weathered by time." },    // Building
        { x: 400, y: 100, w: 100, h: 100, message: "Smoke plumes rise, blurring into the sky." }        // Smoke Plumes
    ];

    for (let zone of zones) {
        // Adjust zone coordinates to image scaling
        let adjX = offsetX + (zone.x / imgWidth) * scaledWidth;
        let adjY = offsetY + (zone.y / imgHeight) * scaledHeight;
        let adjW = (zone.w / imgWidth) * scaledWidth;
        let adjH = (zone.h / imgHeight) * scaledHeight;

        if (mouseX > adjX && mouseX < adjX + adjW && mouseY > adjY && mouseY < adjY + adjH) {
            if (!revealedMessages.includes(zone.message)) {
                revealedMessages.push(zone.message);
                interactions++;
                stanzasRead++;
            }
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
