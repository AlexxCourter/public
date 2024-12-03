import StartScreenScene from './startScreen.js';
import LevelPickScene from './levelPick.js';
import MyGameScene from './levels/level1.js';
import WinScene from './winScreen.js'
import LevelTwo from './levels/level2.js';
// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [StartScreenScene, LevelPickScene, MyGameScene, LevelTwo, WinScene]
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);