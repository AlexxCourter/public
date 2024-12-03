class LevelTwo extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelTwo' });
    }

    preload() {
        // Load assets
        this.load.image('background', 'assets/background.png');
        this.load.image('bg', 'assets/bg.png');
        this.load.image('onibi', 'assets/onibi.png');
        this.load.image('player', 'assets/kodama.png');
        this.load.image('collectible', 'assets/ukicoin.png');
        this.load.image('obstacle', 'assets/barrierph.png');
        this.load.image('bullet', 'assets/bullet.png');

        this.load.audio('coin', 'assets/sounds/coin.wav');
        this.load.audio('shoot', 'assets/sounds/shoot.wav');
        this.load.audio('bgm', 'assets/sounds/bg.mp3');
    }

    create() {
        // Add background
        //this version is perfect for bullet hell mode
        this.background = this.add.tileSprite(0, 0, 4200, this.cameras.main.height, 'bg').setOrigin(0, 0);

        //sounds
        this.shootSound = this.sound.add('shoot');
        this.coinSound = this.sound.add('coin').setVolume(0.2);
        this.bgm = this.sound.add('bgm').setVolume(0.1);
        this.bgm.play();


        // Set the world bounds to match the background size
        this.physics.world.setBounds(0, 0, this.background.width, this.background.height);

        // Add player sprite
        this.player = this.physics.add.sprite(100, 300, 'player');
        this.player.setSize(20,60);
        this.player.body.setOffset(25, 10);
        this.player.setCollideWorldBounds(true);

        // Set the camera to follow the player
        this.cameras.main.startFollow(this.player);

        // Adjust the follow offset to make the camera start scrolling when the player is near the center
        this.cameras.main.setFollowOffset(-this.cameras.main.width / 5, 0);

        // Lock the vertical position of the camera
        this.cameras.main.preUpdate = function () {
            this.scrollX = this.midPoint.x - this.width / 2; // Follow the player horizontally
        };

        // Set the camera bounds to the size of the background
        this.cameras.main.setBounds(0, 0, this.background.width, this.background.height);

        // Set player velocity
        this.player.setVelocityX(100);

        // Input events
        this.cursors = this.input.keyboard.createCursorKeys();


        
        // Initialize a variable to store the mouse position
        this.mouseX = this.input.activePointer.worldX;
        this.mouseY = this.input.activePointer.worldY;

        // Add pointer move event listener to track the mouse position
        this.input.on('pointermove', function (pointer) {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;
        }, this);

        // Define static locations for the collectible
        this.collectibleLocations = [
            { x: 200, y: 350 },
            { x: 300, y: 400 },
            { x: 400, y: 350 },
            { x: 500, y: 300 },
            { x: 900, y: 400 },
            { x: 1000, y: 450 },
            { x: 1300, y: 300 },
            { x: 1400, y: 250 },
            { x: 1500, y: 200 },
            { x: 1600, y: 150 },
            { x: 1700, y: 200 },
            { x: 1800, y: 250 },
            { x: 1900, y: 300 },
            { x: 2500, y: 200 },
            { x: 2900, y: 350 },
            { x: 3000, y: 350 },
            { x: 3200, y: 200 },
            { x: 3500, y: 550 },
            { x: 3600, y: 550 },
            { x: 3700, y: 550 },
            
        ];

        this.collectibles = this.physics.add.staticGroup();

        this.collectibleLocations.forEach(position => {
            let collectible = this.collectibles.create(position.x, position.y, 'collectible')
        })

        // Create the collectible sprite
        // this.collectible = this.physics.add.sprite(200, 300, 'collectible');

        // Enable collision detection between the player and the collectible
        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);

        // Initialize the score
        this.score = 0;

        // Display the score
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' }).setScrollFactor(0);

        // Create the obstacle sprite
        // Define the barrier positions
        const barrierPositions = [
            { x: 100, y: 100 },    // Top
            { x: 100, y: 500 },  // Bottom
            { x: 200, y: 150 },    // Top
            { x: 200, y: 550 },  // Bottom
            { x: 300, y: 200 },    // Top
            { x: 300, y: 600 }, // Bottom
            { x: 400, y: 150 },   // Top
            { x: 400, y: 550 }, // Bottom
            { x: 500, y: 100 },   // Top
            { x: 500, y: 500 }, // Bottom
            { x: 800, y: 100 },   // Top
            { x: 800, y: 400 }, // Bottom
            { x: 800, y: 600 },   // Top
            { x: 1000, y: 300 }, // Bottom
            { x: 1000, y: 580 },   // Top
            { x: 1200, y: 100 }, // Bottom
            { x: 1200, y: 500 },   // Top
            { x: 1300, y: 450 }, // Bottom
            { x: 1300, y: 150 },   // Top
            { x: 1400, y: 100 },  // Bottom
            { x: 1400, y: 400 },
            { x: 1500, y: 50 },
            { x: 1500, y: 350 },
            { x: 1600, y: 0 },
            { x: 1600, y: 300 },
            { x: 1700, y: 50 },
            { x: 1700, y: 350 },
            { x: 1800, y: 100 },
            { x: 1800, y: 400 },
            { x: 1900, y: 150 },
            { x: 1900, y: 450 },
            { x: 2300, y: 250 },
            { x: 2300, y: 500 },
            { x: 2500, y: 50 },
            { x: 2500, y: 350 },
            { x: 2500, y: 550 },
            { x: 2900, y: 100 },
            { x: 2900, y: 200 },
            { x: 2900, y: 550 },
            { x: 3200, y: 50 },
            { x: 3200, y: 400 },
            { x: 3200, y: 600 },
            { x: 3500, y: 50 },
            { x: 3500, y: 250 },
            { x: 3500, y: 400 },
            { x: 3600, y: 50 },
            { x: 3600, y: 250 },
            { x: 3600, y: 400 },
            { x: 3700, y: 50 },
            { x: 3700, y: 250 },
            { x: 3700, y: 400 },
            { x: 3800, y: 50 },
            { x: 3800, y: 250 },
            { x: 3800, y: 400 },
        ];

        // Create a group for the barriers
        this.barriers = this.physics.add.staticGroup();

        // Add the barriers to the group
        barrierPositions.forEach(position => {
            let barrier = this.barriers.create(position.x, position.y, 'obstacle');
            barrier.body.setSize(40, 190); // Ensure the collision body size matches the barrier size
            // Adjust the collision body position if needed
            barrier.body.setOffset(5,5);
        });

        // Enable collision detection between the player and the obstacle
        this.physics.add.collider(this.player, this.barriers, this.gameOver, null, this);

        //enemy physics
        // Create the object
        // let floatingObject = this.physics.add.sprite(2000, 300, 'onibi');

        const onibiPositions = [
            {x: 800, y: 240},
            { x: 1200, y: 300 },
            {x: 3900, y: 520},
            {x: 2400, y: 100},
        ]

        this.onibis = this.physics.add.staticGroup();

        onibiPositions.forEach(position => {
            let onibi = this.onibis.create(position.x, position.y, "onibi");

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

        // Create a group for bullets 
        this.bullets = this.physics.add.group({ defaultKey: 'bullet'}); 
        // Function to fire a bullet 
        function fireBullet() { 
            let bullet = this.bullets.get(this.player.x+8, this.player.y+12); 
            if (bullet) { 
                bullet.setActive(true); 
                bullet.setVisible(true);
                this.shootSound.play();
                bullet.body.velocity.x = 300; // Adjust the velocity as needed 
                // Disable the bullet after it travels 200 pixels 
                this.time.addEvent({ 
                    delay: 1200, 
                    callback: () => { bullet.destroy(); } 
                }); 
            } 
        }
        // Add an event listener for the left mouse button click 
        this.input.on('pointerdown', (pointer) => { if (pointer.leftButtonDown()) { fireBullet.call(this); } });
        //collision of bullets
        this.physics.add.collider(this.bullets, this.onibis, this.killEnemy, null, this);

        this.physics.add.collider(this.player, this.onibis, this.gameOver, null, this);


        this.winZone = this.physics.add.staticSprite(4200, 0, null);
        this.winZone.displayHeight = 600;
        this.winZone.displayWidth = 50;
        this.winZone.body.setSize(50,600);
        this.winZone.setAlpha(0); // Make it invisible

        // Enable collision between player and winZone
        this.physics.add.collider(this.player, this.winZone, this.winGame, null, this);
    
    }

    killEnemy(bullet, enemy){
        bullet.destroy();
        this.score += 30;
        this.scoreText.setText("Score: " + this.score);
        enemy.disableBody(true, true);
    }

    winGame(player, winZone) {
    // Handle the win condition
    console.log('You win!');
    // You can add more win logic here, like transitioning to a win screen
    this.scene.start('WinScene', {score: this.score, maxScore: 320, level: "Level 1"});
    
}
    // Function to handle collecting the item
    collectItem(player, collectible) {
        // Increment the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        this.coinSound.play();
        // Hide the collectible
        collectible.disableBody(true, true);

        // Respawn the collectible at a new random location
        // const newLocation = Phaser.Utils.Array.GetRandom(this.collectibleLocations);
        // collectible.setPosition(newLocation.x, newLocation.y);
        // collectible.enableBody(false, newLocation.x, newLocation.y, true, true);

    }

    // Function to handle game over
    gameOver(player, obstacle) {
        // Display game over message
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Game Over', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5).setScrollFactor(0);

        // Stop the player and obstacle
        this.physics.pause();

        // Optionally, you can restart the game after a delay
        // this.time.delayedCall(3000, () => {
        //     this.scene.restart();
        // }, [], this);
        let replayButton = this.add.text(400, 400, 'Replay', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        replayButton.setInteractive();
        replayButton.setScrollFactor(0);
        replayButton.on('pointerdown', () => {
            this.scene.start('LevelTwo');
        });
        let startOver = this.add.text(400,450,'Start Over', { fontSize: '24px', fill: '#0f0' }).setOrigin(0.5);
        startOver.setInteractive();
        startOver.setScrollFactor(0);
        startOver.on('pointerdown', ()=>{
            this.scene.start('StartScreenScene');
        })
    }
    update() {
        // Scroll background
        this.background.tilePositionX += 1;


        // Player controls
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(150);
        } else {
            this.player.setVelocityY(0);
        }

        // Calculate the direction vector from the player to the mouse
        let directionX = this.mouseX - this.player.x;
        let directionY = this.mouseY - this.player.y;

        // Normalize the direction vector
        let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        directionX /= magnitude;
        directionY /= magnitude;

        // Set the player's velocity to move toward the mouse position
        let speed = 150; // Adjust the speed as needed
        this.player.setVelocityY(directionY * speed);
        
    }
}

export default LevelTwo;