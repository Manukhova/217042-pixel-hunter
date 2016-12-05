import header from './header';
import gameStats from './footer';
import getElementFromTemplate from './getElementFromTemplate';
import gameContent from './switchGame';
import introElement from './intro';
import select from './select';
import {content} from './game';
import statsElement from './stats';

const drawGameScreen = (options) => {

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
