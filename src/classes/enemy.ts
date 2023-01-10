import { Math, Scene } from 'phaser';
import { Actor } from './actor';
import { Player } from './player';
export class Enemy extends Actor {
  private target: Player;
  // distance target for enemy to start pursuing
  private AGRESSOR_RADIUS = 100;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.target = target;
    // ADD TO SCENE
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // PHYSICS MODEL
    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);
  }
  preUpdate(): void {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y }
      ) < this.AGRESSOR_RADIUS
    ) {
      this.getBody().setVelocityX(this.target.x - this.x);
      this.getBody().setVelocityY(this.target.y - this.y);
    } else {
      this.getBody().setVelocity(0);
    }
  }
  public setTarget(target: Player): void {
    this.target = target;
  }
}
