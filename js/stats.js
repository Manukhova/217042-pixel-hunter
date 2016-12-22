import AbstractView from './AbstractView';
// import getElementFromTemplate from './getElementFromTemplate';
// import select from './select';
// import introElement from './intro';
import {bonus} from './game';
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

  getUnknownArr() {
    let UnknownArr = this.state.stats.filter((item) => {
      return item === 'unknown';
    });
    return UnknownArr.length;
  }

  getWrongArr() {
    let WrongArr = this.state.stats.filter((item) => {
      return item === 'wrong';
    });
    return WrongArr.length;
  }

  getFastArr() {
    let FastArr = this.state.stats.filter((item) => {
      return item === 'fast';
    });
    return FastArr.length;
  }

  getSlowArr() {
    let SlowArr = this.state.stats.filter((item) => {
      return item === 'slow';
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
      Application.showIntro();
    });
  }
}

export default (gameState) => new StatsView(gameState).element;


// const stats = (game) => {
//   const gameStats = `
//     <ul class="stats">
//       ${game.stats.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(' ')}
//     </ul>`;
//   const headerStats = `<header class="header">
//     <div class="header__back">
//       <span class="back">
//         <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
//         <img src="img/logo_small.png" width="101" height="44">
//       </span>
//     </div>
//   </header>`;
//   const unknownArr = game.stats.filter((item) => {
//     return item === 'unknown';
//   });
//   const wrongArr = game.stats.filter((item) => {
//     return item === 'wrong';
//   });
//   const fastArr = game.stats.filter((item) => {
//     return item === 'fast';
//   });
//   const slowArr = game.stats.filter((item) => {
//     return item === 'slow';
//   });
//   const draftResult = (game.stats.length - wrongArr.length - unknownArr.length) * bonus.RIGHT;
//   const fastResult = fastArr.length * bonus.FAST;
//   const livesResult = game.lives * bonus.LIFE;
//   const slowResult = slowArr.length * bonus.SLOW;
//   const returnTotalResult = () => {
//     let totalResult;
//     if (wrongArr.length === game.stats.length - unknownArr.length) {
//       totalResult = 'FAIL!';
//     } else {
//       totalResult = draftResult + fastResult + livesResult + slowResult;
//     }
//     return totalResult;
//   };
//   const templateStats = `
//   ${headerStats}
//   <div class="result">
//     <h1>Победа!</h1>
//     <table class="result__table">
//       <tr>
//         <td class="result__number">1.</td>
//         <td colspan="2">
//           ${gameStats}
//         </td>
//         <td class="result__points">×&nbsp;100</td>
//         <td class="result__total">${draftResult}</td>
//       </tr>
//       <tr>
//         <td></td>
//         <td class="result__extra">Бонус за скорость:</td>
//         <td class="result__extra">${fastArr.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
//         <td class="result__points">×&nbsp;${bonus.FAST}</td>
//         <td class="result__total">${fastResult}</td>
//       </tr>
//       <tr>
//         <td></td>
//         <td class="result__extra">Бонус за жизни:</td>
//         <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
//         <td class="result__points">×&nbsp;${bonus.LIFE}</td>
//         <td class="result__total">${livesResult}</td>
//       </tr>
//       <tr>
//         <td></td>
//         <td class="result__extra">Штраф за медлительность:</td>
//         <td class="result__extra">${slowArr.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
//         <td class="result__points">×&nbsp;${-bonus.SLOW}</td>
//         <td class="result__total">${slowResult}</td>
//       </tr>
//       <tr>
//         <td colspan="5" class="result__total  result__total--final">${returnTotalResult()}</td>
//       </tr>
//     </table>
//   </div>`;
//   const statsElement = getElementFromTemplate(templateStats);
//   statsElement.querySelector('.header__back').addEventListener('click', () => {
//     event.preventDefault();
//     select(introElement, statsElement);
//   });
//   return statsElement;
// };
// export default stats;
