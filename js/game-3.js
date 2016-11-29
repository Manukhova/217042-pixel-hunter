
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import statsElement from './stats';
import introElement from './intro';
import game from './game';

const headerThree = `<header class="header">
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

const gameTaskThree = `<p class="game__task">${game.taskThree}</p>`;

const gameStatsThree = `<div class="stats">
  <ul class="stats">
    ${game.statsThree.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join(' ')}
  </ul>
</div>`;

const templateGameThree = `
${headerThree}
<div class="game">
    ${gameTaskThree}
  <form class="game__content  game__content--triple">
    ${game.contentThree.map((item, i) => `<div class="game__option">
      <img src=${item.question} alt="Option 1" width="304" height="455">
    </div>`).join(' ')}
  </form>
  ${gameStatsThree}
</div>`;

const gameThreeElement = getElementFromTemplate(templateGameThree);

gameThreeElement.querySelector('.game__content').addEventListener('click', () => {
  event.preventDefault();
  if (event.target.classList.contains('game__option')) {
    select(statsElement, gameThreeElement);
  }
});

gameThreeElement.querySelector('.header__back').addEventListener('click', () => {
  event.preventDefault();
  select(introElement, gameThreeElement);
});


export default gameThreeElement;
