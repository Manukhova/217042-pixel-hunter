
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import gameThreeElement from './game-3';
import introElement from './intro';
import game from './game';

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'full' : 'empty'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};

const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i + 1 >= lives)).join('\n');
};

const headerTwo = `<header class="header">
  <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
  </div>
  <h1 class="game__timer">${game.time}</h1>
  <div class="game__lives">
    ${drawHearts(game.lives)}
  </div>
</header>`;

const gameTaskTwo = `<p class="game__task">${game.taskTwo}</p>`;

const gameStatsTwo = `<div class="stats">
  <ul class="stats">
    ${game.statsTwo.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join('\n')}
  </ul>
</div>`;

const templateGameTwo = `
${headerTwo}
<div class="game">
  ${gameTaskTwo}
  <form class="game__content  game__content--wide">
    ${game.contentTwo.map((item, i) => `<div class="game__option">
      <img src=${item.question} alt="Option ${i + 1}" width="705" height="455">
        ${item.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
          <input name="question${i + 1}" type="radio" value="${answer}">
          <span>Фото</span>
        </label>
    `).join('\n')}
    </div>`).join('\n')}
  </form>
  ${gameStatsTwo}
</div>`;

const gameTwoElement = getElementFromTemplate(templateGameTwo);

gameTwoElement.querySelector('.game__content').addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.parentNode.classList.contains('game__answer')) {
    select(gameThreeElement, gameTwoElement);
  }
});

gameTwoElement.querySelector('.header__back').addEventListener('click', () => {
  event.preventDefault();
  select(introElement, gameTwoElement);
});


export default gameTwoElement;
