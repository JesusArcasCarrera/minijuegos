import { loadGame } from './gameLoader.js';

window.loadGame = (gameName) => {
    const gamePaths = {
        tetris: '../../public/games/tetris/index.js',
        // Añadir más juegos aquí
    };

    const gamePath = gamePaths[gameName];
    if (!gamePath) {
        console.error(`Juego "${gameName}" no encontrado.`);
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
