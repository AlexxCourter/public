// Define the win scene
class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    init(data){
        this.score = data.score,
        this.maxScore = data.maxScore,
        this.level = data.level
    }

    create() {
        // Display congratulatory text
        this.add.text(400, 300, 'Congratulations! You Win!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        if (this.score === this.maxScore) { 
            // Replace 100 with the score value you want to check 
            let perfectScoreText = this.add.text(10, 150, 'Perfect Score!', { 
                fontSize: '32px', 
                fill: '#ff0000' // Set the color to red (you can change this to any color you like) 
            }); 
            // Angle the text 30 degrees 
            perfectScoreText.setAngle(-30); 
        }

        // Add a replay button
        const replayButton = this.add.text(400, 400, 'Play Again', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        replayButton.setInteractive();
        replayButton.on('pointerdown', () => {
            this.scene.start('StartScreenScene');
        });
    }
}

export default WinScene;