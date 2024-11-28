let img;
let stanzasRead = 0;
let interactions = 0;
const totalInteractions = 5; // Number of interactive zones
let revealedMessages = [];
let gameCompleted = false;

function preload() {
    img = loadImage('https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => console.log('Image loaded successfully'),
        () => console.error('Failed to load image')
    );
}

function setup() {
    console.log('Starting setup...');
    let canvas = createCanvas(1000, 1000); // Canvas is now 1000x1000 to match image
    canvas.parent('canvas-container'); // Ensure container exists in HTML
    canvas.style('max-width', '100%');
    canvas.style('height', 'auto');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');
}

function draw() {
    if (img) {
        background(255); // Clear the background to white before drawing the image
        image(img, 0, 0, width, height);
    } else {
        background(255); // Fallback if image fails to load
    }

    displayStanzasCompleted();
    displayRevealedMessages();

    // Define interactive zones based on provided points
    if (!gameCompleted) {
        if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) { // Bird
            cursor('pointer');
            highlightZone(115, 770, 218, 845);
        } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) { // Shore
            cursor('pointer');
            highlightZone(225, 750, 500, 910);
        } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) { // Waves
            cursor('pointer');
            highlightZone(465, 470, 955, 735);
        } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) { // Building
            cursor('pointer');
            highlightZone(125, 75, 420, 740);
        } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) { // Plume
            cursor('pointer');
            highlightZone(640, 5, 955, 325);
        } else {
            cursor('default');
        }
    }

    if (gameCompleted) {
        displayCompletionMessage();
    }
}

function isWithinZone(x, y, x1, y1, x2, y2) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function highlightZone(x1, y1, x2, y2) {
    fill(200, 200, 200, 100); // Light grey color with 40% opacity
    noStroke();
    rect(x1, y1, x2 - x1, y2 - y1);
}

function displayStanzasCompleted() {
    fill(0);
    text(`Stanzas Completed: ${stanzasRead} / ${totalInteractions}`, 10, 30);
}

function displayRevealedMessages() {
    fill(0);
    for (let i = 0; i < revealedMessages.length; i++) {
        text(revealedMessages[i], 50, 50 + i * 30);
    }
}

function mousePressed() {
    if (gameCompleted) {
        return; // Prevent further interaction after the game is complete
    }

    // Interactive zones with messages
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) { // Bird
        if (!revealedMessages.includes("before the smoke painted the sky\nwith shadows, before stone towers rose\nto watch over the sand like sentinels.")) {
            revealedMessages.push("before the smoke painted the sky\nwith shadows, before stone towers rose\nto watch over the sand like sentinels.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) { // Shore
        if (!revealedMessages.includes("paths carve where sand once shifted\nbeneath unsteady feet. Iron holds firm,\nsharp lines drawn into the earth,\na geometry leading forward.")) {
            revealedMessages.push("paths carve where sand once shifted\nbeneath unsteady feet. Iron holds firm,\nsharp lines drawn into the earth,\na geometry leading forward.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) { // Waves
        if (!revealedMessages.includes("the first sound of waves breaking on the shore,\nthe pull of the tide soft as breath,\nsmall hands once reached for shells as if to hold the sea.")) {
            revealedMessages.push("the first sound of waves breaking on the shore,\nthe pull of the tide soft as breath,\nsmall hands once reached for shells as if to hold the sea.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) { // Building
        if (!revealedMessages.includes("towers rise to be followed, engines hum\nin hours marked by invisible hands.\nWheels spin in the air,\nthe hum surrounds,")) {
            revealedMessages.push("towers rise to be followed, engines hum\nin hours marked by invisible hands.\nWheels spin in the air,\nthe hum surrounds,");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) { // Plume
        if (!revealedMessages.includes("clocks replace the pulse of the shore,\neyes shifting toward rising smoke,\ntoward fires held behind doors, where light bends\nagainst walls built of stone and air grows heavy.")) {
            revealedMessages.push("clocks replace the pulse of the shore,\neyes shifting toward rising smoke,\ntoward fires held behind doors, where light bends\nagainst walls built of stone and air grows heavy.");
            interactions++;
            stanzasRead++;
        }
    }

    // Check if all interactions are complete
    if (interactions >= totalInteractions) {
        gameCompleted = true; // Set game as complete
    }
}

function displayCompletionMessage() {
    // Draw the completion message on the canvas
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Interaction complete. Enjoy your poem!", width / 2, height / 2);
}

// Assign p5.js functions to window object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

console.log('Script loaded successfully');
