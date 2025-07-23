<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minijuegos - Tetris</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-menu">
        <button onclick="startTetris()">Iniciar Tetris</button>
    </div>
    <canvas id="game-canvas" width="300" height="600"></canvas>
    <script type="module" src="./games/tetris/index.js"></script>
</body>
</html>
