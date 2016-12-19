import gameStats from './footer';
import getElementFromTemplate from './getElementFromTemplate';
import gameContent from './gameContent';

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

  const gameElement = getElementFromTemplate(templateGame);

  return gameElement;
};

export default drawGameScreen;
