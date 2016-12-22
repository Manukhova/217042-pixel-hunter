import HeaderView from './header';
import LevelView from './drawGameScreen';
import {constraints, drawHearts, content} from './game';
// import select from './select';
// import introElement from './intro';
// import StatsView from './stats';
// import {setTime, setLives, setCurrentLevel} from './pure.js';
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
    // this.getNextLevel();
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
    // const gameOver = new GameOverView(win, canContinue);
    // gameOver.onRestart = this.restart.bind(this);
    // gameOver.onExit = this.exit.bind(this);
    //
    // game.changeContentView(gameOver);
    // game.updateHeader();
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

// let interval = null;
// let mainElement = document.getElementById('main');
//
// let gameState = game;
//
// export const drawLevel = (options, elem) => {
//
//   let head = header(gameState);
//   let level = drawGameScreen(options);
//   select(level, elem);
//   mainElement.insertBefore(head, level);
//
//   const clearTimer = () => {
//     clearInterval(interval);
//     gameState.time = 0;
//   };
//
//   const setTimer = () => {
//     interval = setInterval(() => {
//       gameState = setTime(gameState, gameState.time + 1);
//       document.querySelector('.game__timer').innerHTML = gameState.time;
//       if (gameState.time >= constraints.timeLimit) {
//         getWrongAnswer();
//       }
//     }, 1000);
//
//   };
//
//   setTimer(options);
//
//   // head.querySelector('.header__back').addEventListener('click', () => {
//   //   event.preventDefault();
//   //   select(introElement, level);
//   //   mainElement.removeChild(head);
//   // });
//
//   const getNextLevel = () => {
//     clearTimer();
//     mainElement.removeChild(head);
//     gameState = setCurrentLevel(gameState, gameState.level + 1);
//     if (gameState.level >= constraints.levelLimit) {
//       select(stats(gameState), level);
//     } else {
//       drawLevel(content[gameState.level], level);
//     }
//   };
//
//   const getRightAnswer = () => {
//     getNextLevel();
//     if (gameState.time >= constraints.timeSlow) {
//       gameState.stats[gameState.level] = 'slow';
//     } else if (gameState.time <= constraints.timeFast) {
//       gameState.stats[gameState.level] = 'fast';
//     } else {
//       gameState.stats[gameState.level] = 'correct';
//     }
//   };
//
//   const getWrongAnswer = () => {
//     gameState.stats[gameState.level] = 'wrong';
//     gameState = setLives(gameState, gameState.lives - 1);
//     document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
//     if (gameState.lives <= constraints.livesLimit) {
//       clearTimer();
//       mainElement.removeChild(head);
//       select(stats(gameState), level);
//     } else {
//       getNextLevel();
//     }
//   };
//
//   let isFirstQuestion = true;
//
//   level.querySelector('.game__content').addEventListener('click', (event) => {
//     event.preventDefault();
//     if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
//       if (options.questions.length === 2) {
//         let eventTarget = event.target.previousSibling.previousSibling;
//         let currentQuestion = options.questions.filter((item) => {
//           return eventTarget.name === item.name;
//         })[0];
//         if (currentQuestion.type === eventTarget.value) {
//           if (!isFirstQuestion && gameState.stats[0] === 'wrong') {
//             getWrongAnswer();
//           } else {
//             getRightAnswer();
//           }
//           isFirstQuestion = !isFirstQuestion;
//         } else {
//           gameState.stats[gameState.level] = 'wrong';
//           gameState = setLives(gameState, gameState.lives - 1);
//           document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
//           if (gameState.lives <= constraints.livesLimit) {
//             clearTimer();
//             select(stats(gameState), level);
//             mainElement.removeChild(head);
//           }
//           if (!isFirstQuestion) {
//             getNextLevel();
//           }
//           isFirstQuestion = !isFirstQuestion;
//         }
//       }
//       if (options.questions.length === 1) {
//         let eventTarget = event.target.previousSibling.previousSibling;
//         let currentQuestion = options.questions[0];
//         if (currentQuestion.type === eventTarget.value) {
//           getRightAnswer();
//         } else {
//           getWrongAnswer();
//         }
//       }
//       if (options.questions.length === 3) {
//         let currentQuestion = options.questions.filter((item) => {
//           return event.target.childNodes[1].alt === item.name;
//         })[0];
//         if (currentQuestion.type === 'paint') {
//           getRightAnswer();
//         } else {
//           getWrongAnswer();
//         }
//       }
//     }
//   });
// };
