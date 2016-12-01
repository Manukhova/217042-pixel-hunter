
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import gameThreeElement from './game-3';
import introElement from './intro';
import header from './header';
import gameStats from './footer';
// import {game} from './game';

export default (data) => {

  const gameTaskTwo = `<p class="game__task">${data.taskTwo}</p>`;

  const gameContentTwo = `${data.contentTwo.map((item, i) => `<div class="game__option">
<img src=${item.question} alt="Option ${i + 1}" width="705" height="455">
  ${item.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
    <input name="question${i + 1}" type="radio" value="${answer}">
    <span>Фото</span>
  </label>
`).join('\n')}
</div>`).join('\n')}`;

  const templateGameTwo = `
${header(data)}
<div class="game">
  ${gameTaskTwo}
  <form class="game__content  game__content--wide">
    ${gameContentTwo}
  </form>
  ${gameStats(data)}
</div>`;

  const gameTwoElement = getElementFromTemplate(templateGameTwo);

  gameTwoElement.querySelector('.game__content').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.parentNode.classList.contains('game__answer')) {
      select(gameThreeElement(data), gameTwoElement);
    }
  });

  gameTwoElement.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, gameTwoElement);
  });


  return gameTwoElement;

};
