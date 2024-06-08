class Credit extends Phaser.Scene {
    constructor() {
        super("Credit");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 700;
        this.DRAG = 1400;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1650;
        this.JUMP_VELOCITY = -705;
        this.physics.world.setBounds(0, 0, 1440*3, 40*18);
        this.PARTICLE_VELOCITY = 50;

        this.DASH_OFFSET = 160;
        this.flip = -1;
        this.DASH_SPEED = 300   ;
        this.dashing = false;
        this.cooldown = 0
        this.initialX = 40
        this.initialY = 450
        this.g = 0
        this.won = false;
    }

    create() {

        this.Nkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 125 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-0", 18, 18, 120, 20);
        this.coincount = 0

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("industrial_tilemap_packed", "tilemap_ground_tiles");

        // Create a layer
        this.groundLayer = this.map.createLayer("platform_ground_layer", this.tileset, 0, 0);
        this.groundLayer.setScale(2.0);


        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        //setup the decor layer
        this.decorLayer = this.map.createLayer("decor_layer", this.tileset, 0, 0);
        this.decorLayer.setScale(2.0);





        //setup the death layer
        this.deathLayer = this.map.createLayer("death_layer", this.tileset, 0, 0);
        this.deathLayer.setScale(2.0);
        

       //setup end goal
       this.goalLayer = this.map.createLayer("goal_layer", this.tileset, 0, 0)
       this.goalLayer.setScale(2.0)

       this.carryLayer = this.map.createLayer("moving_platform_layer", this.tileset, 0, 0);
       this.carryLayer.setScale(2.0);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        


        //create coins
        this.coins = this.map.createFromObjects("collectibles", {
            name: "coin",
            key: "tile_map_sheet",
            frame: 151,
        });

        for(let i = 0; i<this.coins.length; i++){
            this.coins[i].x *= 2
            this.coins[i].y *= 2

        }

        //sets up the camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels*2, this.map.heightInPixels);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        this.physics.world.createDebugGraphic().clear();

        this.titleText = this.add.text(460, 40, 'Thank You For Playing!', { 
            fontFamily: 'Arial', 
            fontSize: '50px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(530, 150, 'Created by: Brian Hudick', { 
            fontFamily: 'Arial', 
            fontSize: '32px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(620, 200, 'Assets used:', { 
            fontFamily: 'Arial', 
            fontSize: '32px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(600, 250, 'Kenney Pixel Platformer', { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(510, 280, 'Kenney Pixel Platformer Industrial Expansion', { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(420, 360, 'Made for UCSC CMPM 120 Spring 2024', { 
            fontFamily: 'Arial', 
            fontSize: '32px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(570, 420, 'Press "N" to return to title screen', { 
            fontFamily: 'Arial', 
            fontSize: '20px', 
            color: '#ffffff' 
        });

        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear()

    }

    update() {

        if(this.Nkey.isDown){
            this.scene.start("Title")
        }
    }

    

    
}