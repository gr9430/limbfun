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

    displayStanzasRead();
    displayRevealedMessages();

    // Define interactive zones based on provided points
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) { // Bird
        cursor('pointer');
        highlightZone(115, 770, 218, 845);
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) { // Shore (Updated coordinates)
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

function isWithinZone(x, y, x1, y1, x2, y2) {
    // Checks if the mouse is within the given rectangular zone
    const withinZone = x >= x1 && x <= x2 && y >= y1 && y <= y2;
    if (withinZone) {
        console.log(`Mouse is within zone (${x1}, ${y1}, ${x2}, ${y2})`);
    }
    return withinZone;
}

function highlightZone(x1, y1, x2, y2) {
    // Draws a semi-transparent rectangle to highlight an interactive zone
    fill(200, 200, 200, 100); // Light grey color with 40% opacity
    noStroke();
    rect(x1, y1, x2 - x1, y2 - y1);
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
    console.log(`Mouse pressed at X: ${mouseX}, Y: ${mouseY}`);
    // Interactive zones with messages
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) { // Bird
        if (!revealedMessages.includes("The first sound of waves breaking on the shore,
the pull of the tide soft as breath,
small hands once reached for shells as if to hold the sea.
Now the wind moves like a thought, caught
between the spaces where light once fell freely.
The air carries only shadows now—
a world remade in silence.")) {
            revealedMessages.push("The first sound of waves breaking on the shore,
the pull of the tide soft as breath,
small hands once reached for shells as if to hold the sea.
Now the wind moves like a thought, caught
between the spaces where light once fell freely.
The air carries only shadows now—
a world remade in silence.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) { // Shore (Updated coordinates)
        if (!revealedMessages.includes("The shore glimmers under the fading sunlight.")) {
            revealedMessages.push("The shore glimmers under the fading sunlight.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) { // Waves
        if (!revealedMessages.includes("The waves crash with a rhythmic persistence.")) {
            revealedMessages.push("The waves crash with a rhythmic persistence.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) { // Building
        if (!revealedMessages.includes("The building stands tall, weathered by time.")) {
            revealedMessages.push("The building stands tall, weathered by time.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) { // Plume
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
    // Show a pop-up alert to indicate the game is complete
    alert("Interaction complete. Enjoy your poem!");

    // Alternatively, you can add a custom message to the DOM instead of using alert()
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        messageContainer.innerHTML = "<h2>Interaction complete. Enjoy your poem!</h2>";
    }
}

// Assign p5.js functions to window object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

console.log('Script loaded successfully');
