import AbstractView from './AbstractView';
import {bonus, Result} from './game';
import Application from './Application';
import Model from './Model.js';

const adress = 'https://intensive-ecmascript-server-dxttmcdylw.now.sh/pixel-hunter/stats/';

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const json = (response) => response.json();

const statsPromise = window.fetch(`${adress}${Model.state.user}`).then(status).then(json);

class StatsView extends AbstractView {
  constructor(gameState) {
    super();
    this.state = gameState;
  }


  update(newState) {
    this.state = newState;
    this.element.innerHTML = this.getMarkup();
  }

  getUnknownArr() {
    let UnknownArr = this.state.stats.filter((item) => {
      return item === Result.UNKNOWN;
    });
    return UnknownArr.length;
  }

  getWrongArr() {
    let WrongArr = this.state.stats.filter((item) => {
      return item === Result.WRONG;
    });
    return WrongArr.length;
  }

  getFastArr() {
    let FastArr = this.state.stats.filter((item) => {
      return item === Result.FAST;
    });
    return FastArr.length;
  }

  getSlowArr() {
    let SlowArr = this.state.stats.filter((item) => {
      return item === Result.SLOW;
    });
    return SlowArr.length;
  }

  getDraftResult() {
    return (this.state.stats.length - this.getWrongArr() - this.getUnknownArr()) * bonus.RIGHT;
  }

  getFastResult() {
    return this.getFastArr() * bonus.FAST;
  }

  getLivesResult() {
    return this.state.lives * bonus.LIFE;
  }

  getSlowResult() {
    return this.getSlowArr() * bonus.SLOW;
  }

  getTotalResult() {
    let totalResult;
    if (this.getWrongArr() === this.state.stats.length - this.getUnknownArr()) {
      totalResult = 'FAIL!';
    } else {
      totalResult = this.getDraftResult() + this.getFastResult() + this.getLivesResult() + this.getSlowResult();
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

  getGameStatsMarkup() {
    return `
    <ul class="stats">
      ${this.state.stats.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(' ')}
    </ul>`;
  }

  getMarkup() {
    return `
    ${this.getHeaderStatsMarkup()}
    <div class="result">
      <h1>Победа!</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${this.getGameStatsMarkup()}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${this.getDraftResult()}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.getFastArr()}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${bonus.FAST}</td>
          <td class="result__total">${this.getFastResult()}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.state.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
          <td class="result__points">×&nbsp;${bonus.LIFE}</td>
          <td class="result__total">${this.getLivesResult()}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.getSlowArr()}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${-bonus.SLOW}</td>
          <td class="result__total">${this.getSlowResult()}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this.getTotalResult()}</td>
        </tr>
      </table>
    </div>`;
  }

  bindHandlers() {
    this.element.querySelector('.header__back').addEventListener('click', (event) => {
      event.preventDefault();
      Application.showRules();
    });
  }
}


let newStats;
statsPromise.then((data) => {
  newStats = new StatsView(data);
  console.log('stats', data);
});


export default () => newStats.element;
