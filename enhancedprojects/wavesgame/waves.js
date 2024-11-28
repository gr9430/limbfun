let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];

// Load image for the canvas
function preload() {
    img = loadImage('https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => console.log('Image loaded successfully'),
        () => console.error('Failed to load image')
    );
}

// Setup the canvas and DOM elements
function setup() {
    console.log('Starting setup...');
    let canvas = createCanvas(1000, 1000);
    canvas.parent('canvas-container');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');

    // Create the button for early poem submission
    let button = createButton('Finish Poem');
    button.parent('button-container');
    button.mousePressed(endGame);
    console.log('Button created');
}

function draw() {
    if (img) {
        // Draw background image and adjust to fit within canvas while maintaining aspect ratio
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

    // Highlight zones with a light grey rectangle (40% opacity) if mouse is hovering over
    fill(100, 100, 100, 100); // Light grey, 40% opacity

    // Define interactive zones and set cursor
    if (mouseX > 115 && mouseX < 218 && mouseY > 770 && mouseY < 845) { // Bird
        rect(115, 770, 103, 75);
        cursor('pointer');
    } else if (mouseX > 225 && mouseX < 500 && mouseY > 750 && mouseY < 910) { // Shore
        rect(225, 750, 275, 160);
        cursor('pointer');
    } else if (mouseX > 465 && mouseX < 955 && mouseY > 470 && mouseY < 735) { // Waves
        rect(465, 470, 490, 265);
        cursor('pointer');
    } else if (mouseX > 125 && mouseX < 420 && mouseY > 75 && mouseY < 740) { // Building
        rect(125, 75, 295, 665);
        cursor('pointer');
    } else if (mouseX > 640 && mouseX < 955 && mouseY > 5 && mouseY < 325) { // Smoke Plumes
        rect(640, 5, 315, 320);
        cursor('pointer');
    } else {
        cursor('default');
    }
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
    } else if (mouseX > 640 && mouseX < 955 && mouseY > 5 && mouseY < 325) { // Smoke Plumes
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
