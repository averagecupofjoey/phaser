import { Scene } from 'phaser';
import { Score, ScoreOperations } from '../../classes/score';
import { EVENTS_NAME } from '../../consts';
export class UIScene extends Scene {
  private score!: Score;
  private chestLootHandler: () => void;
  private initListeners(): void {
    this.game.events.on(EVENTS_NAME.chestLoot, this.chestLootHandler, this);
  }
  constructor() {
    super('ui-scene');
    this.chestLootHandler = () => {
      this.score.changeValue(ScoreOperations.INCREASE, 10);
    };
  }
  create(): void {
    this.score = new Score(this, 20, 20, 0);
    this.initListeners();
  }
}
