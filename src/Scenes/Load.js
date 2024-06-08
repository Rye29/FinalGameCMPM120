class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.audio('jumpsfx', 'jump.wav')

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_ground_tiles", "industry_tilemap_packed.png");                         // Packed tilemap
        this.load.spritesheet("tile_map_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });        

        this.load.spritesheet("tile_map_industry_sheet", "industry_tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.tilemapTiledJSON("platformer-level-0", "game_3b_level_0.tmj");   // Tilemap in JSON

        this.load.tilemapTiledJSON("platformer-level-1", "game_3b_level_1.tmj");   // Tilemap in JSON

        this.load.tilemapTiledJSON("platformer-level-2", "game_3b_level_2.tmj");   // Tilemap in JSON

        this.load.tilemapTiledJSON("platformer-level-3", "game_3b_level_3.tmj");   // Tilemap in JSON

        this.load.tilemapTiledJSON("platformer-level-4", "game_3b_level_4.tmj");   // Tilemap in JSON


        this.load.multiatlas("kenny-particles", "kenny-particles.json");

    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("Title");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}