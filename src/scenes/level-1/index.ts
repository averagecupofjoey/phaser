import { Scene, Tilemaps, GameObjects } from 'phaser';
import { Player } from '../../classes/player';
export class Level1 extends Scene {
  // private king!: GameObjects.Sprite;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!: Tilemaps.TilemapLayer;
  private groundLayer!: Tilemaps.TilemapLayer;
  private player!: Player;
  constructor() {
    super('level-1-scene');
  }
  create(): void {
    // init the map
    this.initMap();

    // this.king = this.add.sprite(100, 100, 'king');
    this.player = new Player(this, 100, 100);
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
  }
}
