import HeaderView from './header';
import LevelView from './drawGameScreen';
import {constraints, drawHearts, content} from './game';
import Model from './Model.js';
import Application from './Application';

class Presenter {
  constructor(options) {
    this.options = options;
    this.head = new HeaderView(Model.state);
    this.level = new LevelView(this.options);

    this.root = document.createElement('div');
    this.root.appendChild(this.head.element);
    this.root.appendChild(this.level.element);

    this._interval = null;
    this.isFirstQuestion = true;
  }

  clearTimer() {
    clearInterval(this._interval);
    Model.state.time = 0;
  }

  startGame() {
    this.level.onAnswer = this.answer.bind(this);
    this._interval = setInterval(() => {
      Model.timer();
      if (Model.state.time >= constraints.timeLimit) {
        this.getWrongAnswer();
      }
      document.querySelector('.game__timer').innerHTML = Model.state.time;
    }, 1000);
  }

  answer(answer) {
    switch (answer) {
      case 2:
        let eventTarget = event.target.previousSibling.previousSibling;
        let currentQuestion = content[Model.getLevel()].questions.filter((item) => {
          return eventTarget.name === item.name;
        })[0];
        if (currentQuestion.type === eventTarget.value) {
          if (!this.isFirstQuestion && Model.state.stats[Model.getLevel()] === 'wrong') {
            this.getWrongAnswer();
          } else if (!this.isFirstQuestion) {
            this.getRightAnswer();
          }
          this.isFirstQuestion = !this.isFirstQuestion;
        } else {
          Model.changeStats('wrong');
          Model.die();
          document.querySelector('.game__lives').innerHTML = drawHearts(Model.state.lives);
          if (Model.state.lives <= constraints.livesLimit) {
            this.clearTimer();
            this.endGame();
          }
          if (!this.isFirstQuestion) {
            this.getNextLevel();
          }
          this.isFirstQuestion = !this.isFirstQuestion;
        }
        break;
      case 1:
        eventTarget = event.target.previousSibling.previousSibling;
        currentQuestion = content[Model.getLevel()].questions[0];
        if (currentQuestion.type === eventTarget.value) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
        break;
      case 3:
        currentQuestion = content[Model.getLevel()].questions.filter((item) => {
          return event.target.childNodes[1].alt === item.name;
        })[0];
        if (currentQuestion.type === 'paint') {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
        break;
      default:
        throw new Error('Unknown result');
    }
  }

  restart(continueGame) {
    if (!continueGame) {
      Model.restart();
    }
    this.startGame();
  }

  updateHeader() {
    const head = new HeaderView(Model.state);
    this.root.replaceChild(head.element, this.head.element);
    this.head = head;
  }

  getNextLevel() {
    this.clearTimer();
    this.updateHeader();
    Model.nextLevel();
    if (Model.state.level >= constraints.levelLimit) {
      this.endGame();
    } else {
      const level = new LevelView(content[Model.getLevel()]);
      level.onAnswer = this.answer.bind(this);
      this.changeContentView(level);
      this.startGame();
    }
  }

  getRightAnswer() {
    if (Model.state.time >= constraints.timeSlow) {
      Model.changeStats('slow');
    } else if (Model.state.time <= constraints.timeFast) {
      Model.changeStats('fast');
    } else {
      Model.changeStats('correct');
    }
    this.getNextLevel();
  }

  getWrongAnswer() {
    Model.changeStats('wrong');
    Model.die();
    document.querySelector('.game__lives').innerHTML = drawHearts(Model.state.lives);
    if (Model.state.lives <= constraints.livesLimit) {
      this.clearTimer();
      this.endGame();
    } else {
      this.getNextLevel();
    }
  }

  endGame() {
    Application.showStats(Model.state);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.level.element);
    this.level = view;
  }

}

const newGame = new Presenter(content[0]);

export default () => {
  newGame.restart(false);
  return newGame.root;
};
