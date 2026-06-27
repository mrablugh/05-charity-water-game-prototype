// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// --- Game Configuration ---
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const NUM_LANES = 4;
const LANE_HEIGHT = GAME_HEIGHT / NUM_LANES;

// --- State Management ---
let currentScore = 1000;
let isGameOver = false;

// --- Classes ---
class Truck {
    constructor() {
        this.width = 80;
        this.height = Math.floor(LANE_HEIGHT * 0.7); // Fit inside the lane
        this.lane = 1; // Start in lane 1 (0 to 3)
        this.x = 50;   // Static horizontal position
        
        // Calculate Y position based on current lane
        this.y = (this.lane * LANE_HEIGHT) + (LANE_HEIGHT / 2) - (this.height / 2);
    }

    draw(ctx) {
        // Placeholder for the truck (using a charity: water blue color)
        ctx.fillStyle = '#00A3E0'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Minor detail: windshield
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(this.x + this.width - 20, this.y + 5, 15, this.height - 10);
    }

    move(direction) {
        if (direction === 'up' && this.lane > 0) {
            this.lane--;
        } else if (direction === 'down' && this.lane < NUM_LANES - 1) {
            this.lane++;
        }
        // Recalculate Y position smoothly snapping to the new lane
        this.y = (this.lane * LANE_HEIGHT) + (LANE_HEIGHT / 2) - (this.height / 2);
    }
}

// --- Initialization ---
const playerTruck = new Truck();

// --- Input Handling ---
window.addEventListener('keydown', (e) => {
    if (isGameOver) return;

    if (e.key === 'ArrowUp') {
        playerTruck.move('up');
    } else if (e.key === 'ArrowDown') {
        playerTruck.move('down');
    }
});

// --- Main Game Loop ---
function drawRoadLines() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 20]); // Dashed lines
    
    for (let i = 1; i < NUM_LANES; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * LANE_HEIGHT);
        ctx.lineTo(GAME_WIDTH, i * LANE_HEIGHT);
        ctx.stroke();
    }
    ctx.setLineDash([]); // Reset dash
}

function gameLoop() {
    if (isGameOver) return;

    // 1. Clear the canvas for the new frame
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 2. Draw background elements (Road)
    drawRoadLines();

    // 3. Update & Draw entities
    playerTruck.draw(ctx);

    // 4. Update UI
    scoreElement.innerText = currentScore;

    // 5. Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the engine
gameLoop();