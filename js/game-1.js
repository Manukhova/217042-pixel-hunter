
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import gameTwoElement from './game-2';

const game = {

  task: 'Угадайте для каждого изображения фото или рисунок?',

  stats: ['wrong', 'slow', 'fast', 'correct', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],

  lives: ['empty', 'full', 'full'],

  content: [
    {
      question: 'http://placehold.it/468x458',
      answers: ['photo', 'paint']
    },

    {
      question: 'http://placehold.it/468x458',
      answers: ['photo', 'paint']
    }
  ]
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
    ${game.lives.map((live) => `<img src="img/heart__${live}.svg" class="game__heart" alt="Life" width="32" height="32">`).join(' ')}
  </div>
</header>`;

const gameTask = `<p class="game__task">${game.task}</p>`;

const gameStats = `<div class="stats">
  <ul class="stats">
    ${game.stats.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(' ')}
  </ul>
</div>`;


const templateGameOne = `
  ${header}
<div class="game">
  ${gameTask}
  <form class="game__content">
    ${game.content.map((item, i) => `<div class="game__option">
      <img src=${item.question} alt="Option ${i + 1}" width="468" height="458">
        ${item.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
          <input name="question${i + 1}" type="radio" value="${answer}">
          <span>Фото</span>
        </label>
    `).join(' ')}
    </div>`).join(' ')}
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
