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

    // Move title and opening line to container
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        let title = document.createElement("h1");
        title.textContent = "The Waves Forget the Structure";
        title.className = "message-title"; // Added class for consistency with CSS styling
        messageContainer.appendChild(title);

        let openingLine = document.createElement("p");
        openingLine.textContent = "here,";
        openingLine.className = "message-opening-line"; // Added class for consistency with CSS styling
        messageContainer.appendChild(openingLine);
    }
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
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function highlightZone(x1, y1, x2, y2) {
    // Draws a semi-transparent rectangle to highlight an interactive zone
    fill(200, 200, 200, 100); // Light grey color with 40% opacity
    noStroke();
    rect(x1, y1, x2 - x1, y2 - y1);
}

function displayStanzasCompleted() {
    fill(0);
    textSize(20); // Increased text size for better visibility
    text(`Stanzas Completed: ${stanzasRead} / ${totalInteractions}`, 10, 30);
}

function displayRevealedMessages() {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        // Clear previous messages, but keep the title and opening line
        messageContainer.innerHTML = messageContainer.querySelector("h1").outerHTML + messageContainer.querySelector("p").outerHTML;
        for (let i = 0; i < revealedMessages.length; i++) {
            let paragraph = document.createElement("p");
            paragraph.textContent = revealedMessages[i];
            paragraph.className = "message-stanza"; // Added class for consistency with CSS styling
            messageContainer.appendChild(paragraph);
        }
    }
}

function mousePressed() {
    // Interactive zones with messages
    if (isWithinZone(mouseX, mouseY, 115, 770, 218, 845)) { // Bird
        if (!revealedMessages.includes("before the smoke painted the sky\nwith shadows, before stone towers rose\nto watch over the sand like sentinels.\nNo room remains for the sea’s slow song—\nedges cutting across the sky, blind\nto the waves.")) {
            revealedMessages.push("before the smoke painted the sky\nwith shadows, before stone towers rose\nto watch over the sand like sentinels.\nNo room remains for the sea’s slow song—\nedges cutting across the sky, blind\nto the waves.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 225, 750, 500, 910)) { // Shore (Updated coordinates)
        if (!revealedMessages.includes("paths carve where sand once shifted\nbeneath unsteady feet. Iron holds firm,\nsharp lines drawn into the earth,\na geometry leading forward.\nThe weight of time falls in rhythm,\nnot like waves that forget what they touch.")) {
            revealedMessages.push("paths carve where sand once shifted\nbeneath unsteady feet. Iron holds firm,\nsharp lines drawn into the earth,\na geometry leading forward.\nThe weight of time falls in rhythm,\nnot like waves that forget what they touch.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 465, 470, 955, 735)) { // Waves
        if (!revealedMessages.includes("the first sound of waves breaking on the shore,\nthe pull of the tide soft as breath,\nsmall hands once reached for shells as if to hold the sea.\nNow the wind moves like a thought, caught\nbetween the spaces where light once fell freely.\nThe air carries only shadows now—\na world remade in silence.")) {
            revealedMessages.push("the first sound of waves breaking on the shore,\nthe pull of the tide soft as breath,\nsmall hands once reached for shells as if to hold the sea.\nNow the wind moves like a thought, caught\nbetween the spaces where light once fell freely.\nThe air carries only shadows now—\na world remade in silence.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 125, 75, 420, 740)) { // Building
        if (!revealedMessages.includes("towers rise to be followed, engines hum\nin hours marked by invisible hands.\nWheels spin in the air,\nthe hum surrounds,\ncarrying a rhythm only steel can hear.")) {
            revealedMessages.push("towers rise to be followed, engines hum\nin hours marked by invisible hands.\nWheels spin in the air,\nthe hum surrounds,\ncarrying a rhythm only steel can hear.");
            interactions++;
            stanzasRead++;
        }
    } else if (isWithinZone(mouseX, mouseY, 640, 5, 955, 325)) { // Plume
        if (!revealedMessages.includes("clocks replace the pulse of the shore,\neyes shifting toward rising smoke,\ntoward fires held behind doors, where light bends\nagainst walls built of stone and air grows heavy.\nFeet forget the softness beneath them—\nnow the sky is laced with shadows,\nand the wind carries only whispers\nthrough spaces drawn by hands dreaming of steel.")) {
            revealedMessages.push("clocks replace the pulse of the shore,\neyes shifting toward rising smoke,\ntoward fires held behind doors, where light bends\nagainst walls built of stone and air grows heavy.\nFeet forget the softness beneath them—\nnow the sky is laced with shadows,\nand the wind carries only whispers\nthrough spaces drawn by hands dreaming of steel.");
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
    // Add a custom message to the DOM
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        let endMessage = document.createElement("div");
        endMessage.innerHTML = "<h2>Interaction complete. Enjoy your poem!</h2>";
        endMessage.className = "end-message"; // Added class for consistency with CSS styling
        messageContainer.appendChild(endMessage);

        // Add a reset button
        let resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        resetButton.className = "reset-button"; // Added class for consistency with CSS styling
        resetButton.onclick = resetGame;
        endMessage.appendChild(resetButton);
    }
}

function resetGame() {
    stanzasRead = 0;
    interactions = 0;
    revealedMessages = [];
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
        // Clear all messages except the title and opening line
        messageContainer.innerHTML = messageContainer.querySelector("h1").outerHTML + messageContainer.querySelector("p").outerHTML;
    }
    loop(); // Restart the p5.js draw loop if it was stopped
}

// Assign p5.js functions to window object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

// Track if the user has navigated to prevent alert on page navigation
window.addEventListener("beforeunload", () => {
    window.hasNavigated = true;
});

console.log('Script loaded successfully');
