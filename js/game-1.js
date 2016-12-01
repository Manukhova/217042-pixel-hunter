
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import gameTwoElement from './game-2';
import introElement from './intro';
import header from './header';
import gameStats from './footer';
// import {game} from './game';

export default (data) => {

  const gameTaskOne = `<p class="game__task">${data.taskOne}</p>`;

  const gameContentOne = `${data.contentOne.map((item, i) => `<div class="game__option">
  <img src=${item.question} alt="Option ${i + 1}" width="468" height="458">
    ${item.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
      <input name="question${i + 1}" type="radio" value="${answer}">
      <span>Фото</span>
    </label>
`).join('\n')}
</div>`).join('\n')}`;

  const templateGameOne = `
  ${header(data)}
<div class="game">
  ${gameTaskOne}
  <form class="game__content">
    ${gameContentOne}
  </form>
    ${gameStats(data)}
</div>`;


  const gameOneElement = getElementFromTemplate(templateGameOne);

  gameOneElement.querySelector('.game__content').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.parentNode.classList.contains('game__answer')) {
      select(gameTwoElement(data), gameOneElement);
    }
  });

  gameOneElement.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, gameOneElement);
  });

  return gameOneElement;

};
