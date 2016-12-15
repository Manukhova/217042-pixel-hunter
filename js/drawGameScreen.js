import gameStats from './footer';
import getElementFromTemplate from './getElementFromTemplate';
import gameContent from './gameContent';
// import introElement from './intro';
// import select from './select';
// import {content} from './game';
// import statsElement from './stats';

const drawGameScreen = (options) => {

  const formClassList = () => {
    let formClass;
    switch (options.questions.length) {
      case 1:
        formClass = '--wide';
        break;
      case 3:
        formClass = '--triple';
        break;
      default:
        formClass = '';
        break;
    }
    return formClass;
  };

  const gameForm = `<form class="game__content  game__content${formClassList(options)}">${gameContent(options)}</form>`;

  const templateGame = `

  <div class="game">
   ${options.task}
   ${gameForm}
   ${gameStats()}
  </div>`;

  // const index = content.indexOf(options) + 1;

  const gameElement = getElementFromTemplate(templateGame);

  // gameElement.querySelector('.game__content').addEventListener('click', (event) => {
  //   event.preventDefault();
  //   if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
  //     if (index <= content.length - 1) {
  //       select(drawGameScreen(content[index]), gameElement);
  //     } else {
  //       select(statsElement, gameElement);
  //     }
  //   }
  // });

  return gameElement;
};

export default drawGameScreen;
