import HeaderView from './header';
import LevelView from './drawGameScreen';
import {constraints, drawHearts, Result} from './game';
import Model from './Model.js';
import Application from './Application';
import 'whatwg-fetch';

const adress = 'https://intensive-ecmascript-server-dxttmcdylw.now.sh/pixel-hunter/stats/';

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

const json = (response) => response.json();

const dataPromise = window.fetch('https://intensive-ecmascript-server-nnpnvhhedl.now.sh/pixel-hunter/questions').then(status).then(json);

class Presenter {
  constructor(options) {
    this.options = options;

    this.head = new HeaderView(Model.state);
    this.level = new LevelView(this.options[Model.getLevel()]);

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
        let index = parseInt(eventTarget.name.slice(8), 10) - 1; // we get a string('question1' or 'question2'), slice it to cut the letters and subtract 1 to get the number of issue in answers array;
        let currentQuestion = this.options[Model.getLevel()].answers[index];
        let rightAnswerCondition = currentQuestion.type === eventTarget.value;
        if (rightAnswerCondition) {
          if (!this.isFirstQuestion && Model.state.stats[Model.getLevel()] === Result.WRONG) {
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
        currentQuestion = this.options[Model.getLevel()].answers[0];
        if (currentQuestion.type === eventTarget.value) {
          this.getRightAnswer();
        } else {
          this.getWrongAnswer();
        }
        break;
      case 3:
        index = parseInt(event.target.childNodes[1].alt.slice(7), 10) - 1;
        currentQuestion = this.options[Model.getLevel()].answers[index];
        if (currentQuestion.type === 'painting') {
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
      const level = new LevelView(this.options[Model.getLevel()]);
      level.onAnswer = this.answer.bind(this);
      this.changeContentView(level);
      this.startGame();
    }
  }

  getRightAnswer() {
    if (Model.state.time >= constraints.timeSlow) {
      Model.changeStats(Result.SLOW);
    } else if (Model.state.time <= constraints.timeFast) {
      Model.changeStats(Result.FAST);
    } else {
      Model.changeStats(Result.CORRECT);
    }
    this.getNextLevel();
  }

  getWrongAnswer() {
    Model.changeStats(Result.WRONG);
    Model.die();
    document.querySelector('.game__lives').innerHTML = drawHearts(Model.state.lives);
    if (Model.state.lives <= constraints.livesLimit) {
      this.endGame();
    } else {
      this.getNextLevel();
    }
  }

  endGame() {
    this.clearTimer();
    window.fetch(`${adress}${Model.state.user}`, {
      method: 'POST',
      body: JSON.stringify({
        'stats': Model.state.stats,
        'lives': Model.state.lives
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(status);
    window.fetch(`${adress}${Model.state.user}`).then(status).then(json).then((data) => {
      Application.showStats(data);
    });
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.level.element);
    this.level = view;
  }

}

let newGame;
dataPromise.then((data) => {
  newGame = new Presenter(data);
});

export default () => {
  newGame.restart(false);
  return newGame.root;
};
