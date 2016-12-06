import header from './header';
import gameStats from './footer';
import getElementFromTemplate from './getElementFromTemplate';
import gameContent from './gameContent';
import introElement from './intro';
import select from './select';
import {content} from './game';
import statsElement from './stats';

const drawGameScreen = (options) => {

  const gameForm = () => {
    switch (options.questions.length) {
      case 2:
        return `<form class="game__content">${gameContent(options)}</form>`;

      case 1:
        return `<form class="game__content  game__content--wide">${gameContent(options)}</form>`;

      case 3:
        return `<form class="game__content  game__content--triple">${gameContent(options)}</form>`;
    }
  };

  const templateGame = `
  ${header()}
  <div class="game">
   ${options.task}
   ${gameForm(options)}
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
