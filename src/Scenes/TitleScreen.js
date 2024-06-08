class Title extends Phaser.Scene {
    constructor() {
        super("Title");
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
        //set coin positions to proper locations
        for(let i = 0; i<this.coins.length; i++){
            this.coins[i].x *= 2
            this.coins[i].y *= 2

        }

        //sets up the camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels*2, this.map.heightInPixels);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        this.physics.world.createDebugGraphic().clear();

        //title text
        this.titleText = this.add.text(500, 180, 'Q Dash', { 
            fontFamily: 'Arial', 
            fontSize: '128px', 
            color: '#ffffff' 
        });

        this.startText = this.add.text(600, 380, 'Press "N" to start', { 
            fontFamily: 'Arial', 
            fontSize: '32px', 
            color: '#ffffff' 
        });

        this.physics.world.drawDebug = false;
        this.physics.world.debugGraphic.clear()

        this.timer = 0;
    }

    update() {

        //flashes "press start" every 1.5 seconds
        this.timer += this.time.timeScale
        if(this.timer >= 150){
            this.timer = 0
            if(this.startText.visible == true){
                this.startText.visible = false
            }else{
                this.startText.visible = true
            }
        }

        //loads first level
        if(this.Nkey.isDown){
            this.scene.start("LevelOne")
        }
    }

    

    
}