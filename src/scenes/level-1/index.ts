import { Scene, Tilemaps, GameObjects } from 'phaser';
import { Player } from '../../classes/player';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';
import { EVENTS_NAME } from '../../consts';
export class Level1 extends Scene {
  // private king!: GameObjects.Sprite;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private groundLayer!: Tilemaps.TilemapLayer;
  private player!: Player;
  private chests!: Phaser.GameObjects.Sprite[];
  constructor() {
    //this is what we call it in order to launch it
    super('level-1-scene');
  }
  create(): void {
    // init the map
    this.initMap();

    // this.king = this.add.sprite(100, 100, 'king');
    this.player = new Player(this, 500, 500);

    // adds the wall collision physics
    this.physics.add.collider(this.player, this.wallsLayer);

    // creates the chests on the level
    this.initChests();

    //creates the camera movement on level
    this.initCamera();
  }
  update(): void {
    this.player.update();
  }
  private initMap(): void {
    this.map = this.make.tilemap({
      key: 'dungeon',
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage('dungeon-16-16', 'tiles');
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
    this.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    );
    this.wallsLayer.setCollisionByProperty({ collides: true });
    //shows the walls that have collisons
    this.showDebugWalls();
  }
  //this will allow us to show walls with collisions on them
  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  private initChests(): void {
    //filters the layer to find the objects that are named chestpoint
    const chestPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Chests', (obj) => obj.name === 'ChestPoint')
    );
    //for each of the chestpoints, adds the sprite at the coords
    this.chests = chestPoints.map((chestPoint) =>
      this.physics.add
        .sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595)
        .setScale(1.5)
    );
    //sets a physics interaction for the player and chest
    this.chests.forEach((chest) => {
      this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
        this.game.events.emit(EVENTS_NAME.chestLoot);
        obj2.destroy();
        this.cameras.main.flash();
      });
    });
  }
  //sets the camera size and follows the player
  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }
}
