
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import gameTwoElement from './game-2';

const game = {
  task: 'Угадайте для каждого изображения фото или рисунок?',
  stats: {
    fast: 'stats__result--fast',
    slow: 'stats__result--slow',
    wrong: 'stats__result--wrong',
    correct: 'stats__result--correct',
    unknown: 'stats__result--unknown'
  },

  lives: {
    empty: 'img/heart__empty.svg',
    full: 'img/heart__full.svg'
  },

  options: {
    none: 'http://placehold.it/468x458'
  },

  answers: {
    photo: 'game__answer--photo',
    paint: 'game__answer--paint'
  }
};

const header = `<header class="header">
  <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
  </div>
  <h1 class="game__timer">NN</h1>
  <div class="game__lives">
    <img src=${game.lives.empty} class="game__heart" alt="Life" width="32" height="32">
    <img src=${game.lives.full} class="game__heart" alt="Life" width="32" height="32">
    <img src=${game.lives.full} class="game__heart" alt="Life" width="32" height="32">
  </div>
</header>`;

const gameTask = `<p class="game__task">${game.task}</p>`;
const gameOption = `<div class="game__option">
  <img src=${game.options.none} alt="Option 1" width="468" height="458">
  <label class="game__answer ${game.answers.photo}">
    <input name="question1" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer ${game.answers.paint}">
    <input name="question1" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
</div>`;

const gameStats = `<div class="stats">
  <ul class="stats">
    <li class="stats__result ${game.stats.wrong}"></li>
    <li class="stats__result ${game.stats.slow}"></li>
    <li class="stats__result ${game.stats.fast}"></li>
    <li class="stats__result ${game.stats.correct}"></li>
    <li class="stats__result ${game.stats.unknown}"></li>
    <li class="stats__result ${game.stats.unknown}"></li>
    <li class="stats__result ${game.stats.unknown}"></li>
    <li class="stats__result ${game.stats.unknown}"></li>
    <li class="stats__result ${game.stats.unknown}"></li>
    <li class="stats__result ${game.stats.unknown}"></li>
  </ul>
</div>`;


const templateGameOne = `
  ${header}
<div class="game">
  ${gameTask}
  <form class="game__content">
    ${gameOption}
    ${gameOption}
  </form>
    ${gameStats}
</div>`;

const gameOneElement = getElementFromTemplate(templateGameOne);

gameOneElement.querySelector('.game__content').addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.parentNode.classList.contains('game__answer')) {
    select(gameTwoElement, gameOneElement);
  }
});


export default gameOneElement;
