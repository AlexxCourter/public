class LevelPickScene extends Phaser.Scene {
    constructor(){
        super({ key: 'LevelPickScene' });
    }

    preload(){}

    create(){
        this.createLevelButton('Level 1', 100, 100, 'MyGameScene'); 
        this.createLevelButton('Level 2', 250, 100, 'LevelTwo'); 
        // this.createLevelButton('Level 3', 400, 100, 'Level3'); 
        // this.createLevelButton('Level 4', 100, 300, 'Level4'); 
        // this.createLevelButton('Level 5', 250, 300, 'Level5'); 
        // this.createLevelButton('Level 6', 400, 300, 'Level6');
    }

    createLevelButton(text, x, y, sceneKey) { 
        let graphics = this.add.graphics(); graphics.fillStyle(0x00ff00, 1); 
        // Green color with full opacity
        graphics.fillRect(x, y, 100, 100); 
        // x, y, width, height 
        let hitArea = new Phaser.Geom.Rectangle(x, y, 100, 100); 
        graphics.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        //change scene
        graphics.on('pointerdown', () => { this.scene.start(sceneKey); }, this);
        //show level name
        this.add.text(x + 12, y + 40, text, { fontSize: '18px', fill: '#000' }); 
    }
}

export default LevelPickScene;