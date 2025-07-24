// public/games/tetris/index.js

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Configuración del juego
const COLS = 10; // Número de columnas
const ROWS = 20; // Número de filas
const BLOCK_SIZE = 30; // Tamaño de cada bloque (en píxeles)
const colors = ["#000", "#FF0", "#F00", "#0F0", "#00F", "#F0F", "#0FF", "#FFA500"]; // Colores de bloques

// Crear tablero vacío
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// Tetrominos y sus rotaciones
const tetrominos = [
    [],
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1], [1, 1]],       // O
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 1, 1]],         // I
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
];

let currentPiece = { shape: null, color: 0, x: 0, y: 0 };

// Generar un nuevo tetromino
function generatePiece() {
    const type = Math.floor(Math.random() * (tetrominos.length - 1)) + 1;
    currentPiece.shape = tetrominos[type];
    currentPiece.color = type;
    currentPiece.x = Math.floor(COLS / 2) - Math.floor(currentPiece.shape[0].length / 2);
    currentPiece.y = 0;
}

// Dibujar tablero
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            drawBlock(col, row, board[row][col]);
        }
    }
    drawPiece();
}

// Dibujar un bloque
function drawBlock(x, y, color) {
    if (color !== 0) {
        ctx.fillStyle = colors[color];
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
}

// Dibujar la pieza actual
function drawPiece() {
    const { shape, color, x, y } = currentPiece;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                drawBlock(x + col, y + row, color);
            }
        }
    }
}

// Mover pieza
function movePiece(dx, dy) {
    currentPiece.x += dx;
    currentPiece.y += dy;

    if (collision()) {
        currentPiece.x -= dx;
        currentPiece.y -= dy;
        if (dy > 0) {
            mergePiece();
            generatePiece();
            if (collision()) {
                alert("¡Game Over!");
                resetGame();
            }
        }
    }
    drawBoard();
}

// Verificar colisión
function collision() {
    const { shape, x, y } = currentPiece;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                const newX = x + col;
                const newY = y + row;
                if (newX < 0 || newX >= COLS || newY >= ROWS || board[newY]?.[newX] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Fusionar pieza con el tablero
function mergePiece() {
    const { shape, color, x, y } = currentPiece;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
                board[y + row][x + col] = color;
            }
        }
    }
    clearLines();
}

// Limpiar líneas completas
function clearLines() {
    board = board.filter(row => row.some(cell => cell === 0));
    while (board.length < ROWS) {
        board.unshift(Array(COLS).fill(0));
    }
}

// Reiniciar juego
function resetGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    generatePiece();
    drawBoard();
}

// Bucle del juego
function gameLoop() {
    movePiece(0, 1);
    setTimeout(gameLoop, 500);
}

// Controles
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") movePiece(-1, 0);
    if (e.key === "ArrowRight") movePiece(1, 0);
    if (e.key === "ArrowDown") movePiece(0, 1);
    if (e.key === " ") rotatePiece();
});

// Rotar pieza
function rotatePiece() {
    const { shape } = currentPiece;
    const newShape = shape[0].map((_, col) => shape.map(row => row[col]).reverse());
    const prevShape = currentPiece.shape;
    currentPiece.shape = newShape;
    if (collision()) currentPiece.shape = prevShape;
    drawBoard();
}

// Iniciar juego
function startTetris() {
    generatePiece();
    drawBoard();
    gameLoop();
}

function startGame() {
    startTetris();
}

export { startTetris, startGame };
