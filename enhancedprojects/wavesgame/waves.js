let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];

function preload() {
    img = loadImage('https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => console.log('Image loaded successfully'),
        () => console.error('Failed to load image')
    );
}

function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas-container');
    canvas.style('max-width', '100%');
    canvas.style('height', 'auto');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');
}

function draw() {
    if (img) {
        background(img);
    } else {
        background(255); // Fallback if image fails to load
    }
    displayCoordinates();
    displayStanzasRead();
    displayRevealedMessages();

    // Define interactive zones
    if (mouseX > 50 && mouseX < 150 && mouseY > 300 && mouseY < 400) {
        cursor('pointer');
    } else if (mouseX > 200 && mouseX < 400 && mouseY > 500 && mouseY < 600) {
        cursor('pointer');
    } else if (mouseX > 600 && mouseX < 700 && mouseY > 600 && mouseY < 700) {
        cursor('pointer');
    } else if (mouseX > 700 && mouseX < 800 && mouseY > 100 && mouseY < 300) {
        cursor('pointer');
    } else if (mouseX > 400 && mouseX < 500 && mouseY > 100 && mouseY < 200) {
        cursor('pointer');
    } else {
        cursor('default');
    }
}

function displayCoordinates() {
    fill(0);
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
    console.log("Mouse pressed at:", mouseX, mouseY); // Debugging click events
    if (mouseX > 50 && mouseX < 150 && mouseY > 300 && mouseY < 400) {
        if (!revealedMessages.includes("The bird sings softly, echoing over the waves.")) {
            revealedMessages.push("The bird sings softly, echoing over the waves.");
            interactions++;
            stanzasRead++;
        }
    }
    // Define other zones similarly...

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

// Expose functions to P5.js
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

console.log('Script loaded successfully');
