import { Scene, GameObjects } from 'phaser';

export class LoadingScene extends Scene {
  private king!: GameObjects.Sprite;
  constructor() {
    super('loading-scene');
  }
  create(): void {
    // console.log('Loading scene was created');
    // this.king = this.add.sprite(100, 100, 'king');
    console.log("assets are loaded, launching 'level-1-scene'");
    this.scene.start('level-1-scene');
  }
  preload(): void {
    console.log('loading assets from loading scene');
    this.load.baseURL = 'assets/';
    // key: 'king'
    // path from baseURL to file: 'sprites/king.png'
    this.load.image('king', 'sprites/king.png');

    // load the atlas/spritesheet
    this.load.atlas(
      'a-king',
      'spritesheets/a-king.png',
      'spritesheets/a-king_atlas.json'
    );
  }
}
