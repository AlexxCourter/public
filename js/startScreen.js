class StartScreenScene extends Phaser.Scene {
    constructor(){
        super({ key : 'StartScreenScene'});
    }

    preload(){
        this.load.image('background', 'assets/startScreen.png'); 
        this.load.image('button', 'assets/startbtn.png');
        this.load.image('onibi','assets/onibi.png/');
    }

    create(){
        // Add the background image 
        this.add.image(800, 600, 'background').setOrigin(1); 
        // Add the button and make it interactive 
        let startButton = this.add.image(400, 300, 'button').setInteractive(); 
        startButton.on('pointerdown', function () { 
            // Start the main game scene when the button is clicked 
            this.scene.start('LevelPickScene'); }, this);


            const onibiPositions = [
                {x: 75, y: 400, scale: 1.5},
                {x: 700, y: 300, scale: 1.5},
                {x: 620, y: 350, scale: 1},
            ]
    
            this.onibis = this.physics.add.staticGroup();
    
            onibiPositions.forEach(position => {
                let onibi = this.onibis.create(position.x, position.y, "onibi");
                onibi.setScale(position.scale)
    
            })
        // Create the tween for vertical movement
        this.tweens.add({
            targets: this.onibis.getChildren(),
            y: '+=5', // Move up 10 pixels
            duration: 1000, // Duration of the movement in milliseconds
            yoyo: true, // Move back to the original position
            repeat: -1, // Repeat indefinitely
            ease: 'Sine.easeInOut', // Smooth easing function
            onUpdate: function(tween, target) {
                target.body.setSize(30,80);
                target.body.x = target.x-10; // Manually update the position 
                target.body.y = target.y-30;
                
             } // Update the physics body to match the new position }
        });
    }


}

export default StartScreenScene;