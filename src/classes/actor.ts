import { Physics } from 'phaser';
export class Actor extends Physics.Arcade.Sprite {
  protected hp = 100;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);

    //adds the physical sprite to the scene for physics computations
    scene.add.existing(this);
    scene.physics.add.existing(this);

    //tells the world to react to the box of the physical model(the box) of the sprite
    this.getBody().setCollideWorldBounds(true);
  }

  //for attacking
  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      //within 100 ms, this will happen 3 times
      duration: 100,
      repeat: 3,
      //returning to the original alpha value
      yoyo: true,
      //turning to half the alpha value
      alpha: 0.5,
      onStart: () => {
        //if damage is received, deduct from the hp
        if (value) {
          this.hp = this.hp - value;
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }
  public getHPValue(): number {
    return this.hp;
  }

  //rotates the sprite as it moves left or right
  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1;
    } else {
      this.scaleX = 1;
    }
  }

  //gets the physical body model of a physical object
  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
