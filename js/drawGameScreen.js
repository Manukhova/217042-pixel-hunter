import gameStats from './footer';
import gameContent from './gameContent';
import AbstractView from './AbstractView';

export default class LevelView extends AbstractView {
  constructor(options) {
    super();
    this.level = options;
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  formClassList() {
    let formClass;
    switch (this.level.questions.length) {
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
  }

  getMarkup() {
    return `
    <div class="game">
    ${this.level.task}
    <form class="game__content  game__content${this.formClassList(this.level)}">${gameContent(this.level)}</form>
    ${gameStats()}
    </div>`;
  }

  bindHandlers() {
    this.element.querySelector('.game__content').addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
        this._onAnswer(this.level.questions.length);
      }
    });
  }
}
