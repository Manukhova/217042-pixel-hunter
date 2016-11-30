
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import gameTwoElement from './game-2';
import introElement from './intro';
import game from './game';

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'full' : 'empty'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};

const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i + 1 >= lives)).join('\n');
};


const headerOne = `<header class="header">
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

const gameTaskOne = `<p class="game__task">${game.taskOne}</p>`;

const gameStatsOne = `<div class="stats">
  <ul class="stats">
    ${game.statsOne.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join('\n')}
  </ul>
</div>`;

const templateGameOne = `
  ${headerOne}
<div class="game">
  ${gameTaskOne}
  <form class="game__content">
    ${game.contentOne.map((item, i) => `<div class="game__option">
      <img src=${item.question} alt="Option ${i + 1}" width="468" height="458">
        ${item.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
          <input name="question${i + 1}" type="radio" value="${answer}">
          <span>Фото</span>
        </label>
    `).join('\n')}
    </div>`).join('\n')}
  </form>
    ${gameStatsOne}
</div>`;

const gameOneElement = getElementFromTemplate(templateGameOne);

gameOneElement.querySelector('.game__content').addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.parentNode.classList.contains('game__answer')) {
    select(gameTwoElement, gameOneElement);
  }
});

gameOneElement.querySelector('.header__back').addEventListener('click', () => {
  event.preventDefault();
  select(introElement, gameOneElement);
});


export default gameOneElement;
