import { Scene, GameObjects } from 'phaser';
export class Level1 extends Scene {
  private king!: GameObjects.Sprite;
  constructor() {
    super('level-1-scene');
  }
  create(): void {
    this.king = this.add.sprite(100, 100, 'king');
  }
}
