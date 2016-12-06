import header from './header';
import gameStats from './footer';
import getElementFromTemplate from './getElementFromTemplate';

import introElement from './intro';
import select from './select';
import {content} from './game';
import statsElement from './stats';

const drawGameScreen = (options) => {

  const gameContent = () => {
    switch (options.questions.length) {
      case 2:
        return `<form class="game__content">
        ${options.questions.map((item, i) => `<div class="game__option">
        <img src=${item} alt="Option ${i + 1}" width="468" height="458">
          ${options.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
            <input name="question${i + 1}" type="radio" value="${answer}">
            <span>Фото</span>
          </label>
      `).join('\n')}
      </div>`).join('\n')}
    </form>`;

      case 1:
        return `<form class="game__content  game__content--wide">
        ${options.questions.map((item, i) => `<div class="game__option">
      <img src=${item} alt="Option ${i + 1}" width="705" height="455">
        ${options.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
          <input name="question${i + 1}" type="radio" value="${answer}">
          <span>Фото</span>
        </label>
      `).join('\n')}
      </div>`).join('\n')}
    </form>`;

      case 3:
        return `<form class="game__content  game__content--triple">
          ${options.questions.map((item, i) => `<div class="game__option">
          <img src=${item} alt="Option ${i + 1}" width="304" height="455">
          </div>`).join('\n')}
        </form>`;
    }
  };

  const templateGame = `
  ${header()}
  <div class="game">
   ${options.task}
   ${gameContent(options)}
   ${gameStats()}
  </div>`;

  const index = content.indexOf(options) + 1;


  const gameElement = getElementFromTemplate(templateGame);

  gameElement.querySelector('.game__content').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
      if (index <= content.length - 1) {
        select(drawGameScreen(content[index]), gameElement);
      } else {
        select(statsElement, gameElement);
      }
    }
  });

  gameElement.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, gameElement);
  });

  return gameElement;
};

export default drawGameScreen;
