import {setTime, setLives, setCurrentLevel} from './pure.js';
import {game, constraints} from './game';

class Model {
  constructor(state = game) {
    this._state = state;

  }

  get state() {
    return this._state;
  }

  getLevel() {
    return this._state.level;
  }

  nextLevel() {
    this._state = setCurrentLevel(this._state, this._state.level + 1);
  }

  die() {
    this._state = setLives(this._state, this._state.lives - 1);
  }

  restart() {
    this._state = game;
  }

  isDead() {
    return this._state.lives <= constraints.livesLimit;
  }

  timer() {
    this._state = setTime(this._state, this._state.time + 1);
  }
}

export default new Model();
