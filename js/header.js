import {drawHearts} from './game';
import AbstractView from './AbstractView';
import Application from './Application';

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.state = gameState;
  }

  update(newState) {
    this.state = newState;
    this.element.innerHTML = this.getMarkup();
  }

  getMarkup() {
    return `
    <header class="header">
      <div class="header__back">
          <span class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.png" width="101" height="44">
          </span>
      </div>
      <h1 class="game__timer">${this.state.time}</h1>
      <div class="game__lives">
        ${drawHearts(this.state.lives)}
      </div>
    </header>`;
  }

  bindHandlers() {
    this.element.querySelector('.header__back').addEventListener('click', (event) => {
      event.preventDefault();
      Application.showRules();
    });
  }
}
