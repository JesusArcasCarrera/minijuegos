#!/bin/bash

# Definir directorio base del proyecto
PROJECT_DIR="minijuegos"

# Crear estructura de carpetas
mkdir -p "$PROJECT_DIR/public"
mkdir -p "$PROJECT_DIR/src/core"

# Crear archivos básicos
# index.html
cat <<EOL > "$PROJECT_DIR/public/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minijuegos</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-menu">
        <h1>Minijuegos</h1>
        <button onclick="loadGame('tetris')">Iniciar Tetris</button>
    </div>
    <canvas id="game-canvas" width="300" height="600"></canvas>
    <script type="module" src="../src/core/app.js"></script>
</body>
</html>
EOL

# styles.css
cat <<EOL > "$PROJECT_DIR/public/styles.css"
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #121212;
    color: white;
}

#game-menu {
    margin-bottom: 20px;
}

#game-canvas {
    border: 2px solid white;
    background-color: black;
}
EOL

# app.js
cat <<EOL > "$PROJECT_DIR/src/core/app.js"
import { loadGame } from './gameLoader.js';

window.loadGame = (gameName) => {
    const gamePaths = {
        tetris: '../../public/games/tetris/index.js',
        // Añadir más juegos aquí
    };

    const gamePath = gamePaths[gameName];
    if (!gamePath) {
        console.error(\`Juego "\${gameName}" no encontrado.\`);
        return;
    }

    import(gamePath)
        .then((module) => {
            module.startGame();
        })
        .catch((err) => {
            console.error('Error al cargar el juego:', err);
        });
};
EOL

# gameLoader.js
cat <<EOL > "$PROJECT_DIR/src/core/gameLoader.js"
export function loadGame(gameName) {
    console.log(\`Cargando juego: \${gameName}\`);
}
EOL

echo "Estructura básica del proyecto creada en $PROJECT_DIR"
