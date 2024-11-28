let img;

function preload() {
    img = loadImage('https://gr9430.github.io/ENG6806/enhancedprojects/wavesgame/images/canvas.jpg',
        () => console.log('Image loaded successfully'),
        () => console.error('Failed to load image')
    );
}

function setup() {
    console.log('Starting setup...');
    let canvas = createCanvas(1000, 1000);
    canvas.parent('canvas-container');
    canvas.style('max-width', '100%');
    canvas.style('height', 'auto');
    textAlign(LEFT, BOTTOM);
    textSize(16);
    console.log('Setup completed');
}

function draw() {
    if (img) {
        background(255);
        image(img, 0, 0, width, height);
    } else {
        background(255);
    }

    console.log(`Drawing at X: ${mouseX}, Y: ${mouseY}`); // Log coordinates to help debugging
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
