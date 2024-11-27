let img;
let score = 0;
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
    let canvas = createCanvas(1000, 1000);
    canvas.parent('canvas-container');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');
}

function draw() {
    background(img);
    displayCoordinates();
    displayScore();
    displayRevealedMessages();

    // Define interactive zones
    if (mouseX > 50 && mouseX < 150 && mouseY > 300 && mouseY < 400) { // Bird
        cursor('pointer');
    } else if (mouseX > 200 && mouseX < 400 && mouseY > 500 && mouseY < 600) { // Shore
        cursor('pointer');
    } else if (mouseX > 600 && mouseX < 800 && mouseY > 700 && mouseY < 800) { // Waves
        cursor('pointer');
    } else if (mouseX > 800 && mouseX < 900 && mouseY > 100 && mouseY < 300) { // Building
        cursor('pointer');
    } else if (mouseX > 400 && mouseX < 500 && mouseY > 100 && mouseY < 200) { // Smoke Plumes
        cursor('pointer');
    } else {
        cursor('default');
    }
}

function displayCoordinates() {
    fill(0);
    text(`X: ${mouseX}, Y: ${mouseY}`, 10, height - 10);
}

function displayScore() {
    fill(0);
    text(`Score: ${score}`, width - 100, 30);
}

function displayRevealedMessages() {
    fill(0);
    for (let i = 0; i < revealedMessages.length; i++) {
        text(revealedMessages[i], 50, 50 + i * 30);
    }
}

function mousePressed() {
    // Interactive zone 1: Bird
    if (mouseX > 50 && mouseX < 150 && mouseY > 300 && mouseY < 400) {
        if (!revealedMessages.includes("The bird sings softly, echoing over the waves.")) {
            revealedMessages.push("The bird sings softly, echoing over the waves.");
            interactions++;
            score += 10;
        }
    }
    // Interactive zone 2: Shore
    else if (mouseX > 200 && mouseX < 400 && mouseY > 500 && mouseY < 600) {
        if (!revealedMessages.includes("The shore glimmers under the fading sunlight.")) {
            revealedMessages.push("The shore glimmers under the fading sunlight.");
            interactions++;
            score += 10;
        }
    }
    // Interactive zone 3: Waves
    else if (mouseX > 600 && mouseX < 800 && mouseY > 700 && mouseY < 800) {
        if (!revealedMessages.includes("The waves crash with a rhythmic persistence.")) {
            revealedMessages.push("The waves crash with a rhythmic persistence.");
            interactions++;
            score += 10;
        }
    }
    // Interactive zone 4: Building
    else if (mouseX > 800 && mouseX < 900 && mouseY > 100 && mouseY < 300) {
        if (!revealedMessages.includes("The building stands tall, weathered by time.")) {
            revealedMessages.push("The building stands tall, weathered by time.");
            interactions++;
            score += 10;
        }
    }
    // Interactive zone 5: Smoke Plumes
    else if (mouseX > 400 && mouseX < 500 && mouseY > 100 && mouseY < 200) {
        if (!revealedMessages.includes("Smoke plumes rise, blurring into the sky.")) {
            revealedMessages.push("Smoke plumes rise, blurring into the sky.");
            interactions++;
            score += 10;
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
    if (score >= 50) {
        text("You have unveiled all the secrets of the scene.", width / 2, height / 2);
    } else {
        text("The story remains incomplete. Try again.", width / 2, height / 2);
    }
}
