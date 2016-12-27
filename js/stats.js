import AbstractView from './AbstractView';
import {bonus, Result} from './game';
import Application from './Application';


class StatsView extends AbstractView {
  constructor(gameState) {
    super();
    this.state = gameState;
  }

  update(newState) {
    this.state = newState;
    this.element.innerHTML = this.getMarkup();
  }

  getUnknownArr(stats) {
    let UnknownArr = stats.filter((item) => {
      return item === Result.UNKNOWN;
    });
    return UnknownArr.length;
  }

  getWrongArr(stats) {
    let WrongArr = stats.filter((item) => {
      return item === Result.WRONG;
    });
    return WrongArr.length;
  }

  getFastArr(stats) {
    let FastArr = stats.filter((item) => {
      return item === Result.FAST;
    });
    return FastArr.length;
  }

  getSlowArr(stats) {
    let SlowArr = stats.filter((item) => {
      return item === Result.SLOW;
    });
    return SlowArr.length;
  }

  getDraftResult(stats) {
    return (stats.length - this.getWrongArr(stats) - this.getUnknownArr(stats)) * bonus.RIGHT;
  }

  getFastResult(stats) {
    return this.getFastArr(stats) * bonus.FAST;
  }

  getLivesResult(lives) {
    return lives * bonus.LIFE;
  }

  getSlowResult(stats) {
    return this.getSlowArr(stats) * bonus.SLOW;
  }

  getTotalResult(stats, lives) {
    let totalResult;
    if (this.getWrongArr(stats) === stats.length - this.getUnknownArr(stats)) {
      totalResult = 'FAIL!';
    } else {
      totalResult = this.getDraftResult(stats) + this.getFastResult(stats) + this.getLivesResult(lives) + this.getSlowResult(stats);
    }
    return totalResult;
  }

  getHeaderStatsMarkup() {
    return `<header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>`;
  }

  getGameStatsMarkup(stats) {
    return `
    <ul class="stats">
      ${stats.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(' ')}
    </ul>`;
  }

  getTable() {
    return `${this.state.map((item, i) => `<table class="result__table">
      <tr>
        <td class="result__number">${i + 1}.</td>
        <td colspan="2">
          ${this.getGameStatsMarkup(item.stats)}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${this.getDraftResult(item.stats)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.getFastArr(item.stats)}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${bonus.FAST}</td>
        <td class="result__total">${this.getFastResult(item.stats)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${item.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;${bonus.LIFE}</td>
        <td class="result__total">${this.getLivesResult(item.lives)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.getSlowArr(item.stats)}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${-bonus.SLOW}</td>
        <td class="result__total">${this.getSlowResult(item.stats)}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.getTotalResult(item.stats, item.lives)}</td>
      </tr>
    </table>`).join('\n')}`;
  }

  getMarkup() {
    return `
    ${this.getHeaderStatsMarkup()}
    <div class="result">
      <h1>Победа!</h1>
      ${this.getTable()}
    </div>`;
  }

  bindHandlers() {
    this.element.querySelector('.header__back').addEventListener('click', (event) => {
      event.preventDefault();
      Application.showRules();
    });
  }
}

export default (gameState) => new StatsView(gameState).element;
