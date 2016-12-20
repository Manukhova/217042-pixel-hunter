import header from './header';
import drawGameScreen from './drawGameScreen';
import {content, game, constraints, drawHearts} from './game';
import select from './select';
import introElement from './intro';
import stats from './stats';
import {setTime, setLives, setCurrentLevel} from './pure.js';

let interval = null;
let mainElement = document.getElementById('main');

let gameState = game;


export const drawLevel = (options, elem) => {

  let head = header(gameState);
  let level = drawGameScreen(options);
  select(level, elem);
  mainElement.insertBefore(head, level);

  const clearTimer = () => {
    clearInterval(interval);
    gameState.time = 0;
  };

  const setTimer = () => {
    interval = setInterval(() => {
      gameState = setTime(gameState, gameState.time + 1);
      document.querySelector('.game__timer').innerHTML = gameState.time;
      if (gameState.time >= constraints.timeLimit) {
        getWrongAnswer();
      }
    }, 1000);

  };

  setTimer(options);

  head.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, level);
    mainElement.removeChild(head);
  });

  const getNextLevel = () => {
    clearTimer();
    mainElement.removeChild(head);
    gameState = setCurrentLevel(gameState, gameState.level + 1);
    if (gameState.level >= constraints.levelLimit) {
      select(stats(gameState), level);
    } else {
      drawLevel(content[gameState.level], level);
    }
  };

  const getRightAnswer = () => {
    if (gameState.time >= constraints.timeSlow) {
      gameState.stats[gameState.level] = 'slow';
      getNextLevel();
    } else if (gameState.time <= constraints.timeFast) {
      gameState.stats[gameState.level] = 'fast';
      getNextLevel();
    } else {
      gameState.stats[gameState.level] = 'correct';
      getNextLevel();
    }
  };

  const getWrongAnswer = () => {
    gameState.stats[gameState.level] = 'wrong';
    gameState = setLives(gameState, gameState.lives - 1);
    document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
    if (gameState.lives <= constraints.livesLimit) {
      clearTimer();
      mainElement.removeChild(head);
      select(stats(gameState), level);
    } else {
      getNextLevel();
    }
  };

  let isFirstQuestion = true;

  level.querySelector('.game__content').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
      if (options.questions.length === 2) {
        let eventTarget = event.target.previousSibling.previousSibling;
        let currentQuestion = options.questions.filter((item) => {
          return eventTarget.name === item.name;
        })[0];
        if (currentQuestion.type === eventTarget.value) {
          if (!isFirstQuestion && gameState.stats[0] === 'wrong') {
            getWrongAnswer();
          } else {
            getRightAnswer();
          }
          isFirstQuestion = !isFirstQuestion;
        } else {
          gameState.stats[gameState.level] = 'wrong';
          gameState = setLives(gameState, gameState.lives - 1);
          document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
          if (gameState.lives <= constraints.livesLimit) {
            clearTimer();
            select(stats(gameState), level);
            mainElement.removeChild(head);
          }
          if (!isFirstQuestion) {
            getNextLevel();
          }
          isFirstQuestion = !isFirstQuestion;
        }
      }
      if (options.questions.length === 1) {
        let eventTarget = event.target.previousSibling.previousSibling;
        let currentQuestion = options.questions[0];
        if (currentQuestion.type === eventTarget.value) {
          getRightAnswer();
        } else {
          getWrongAnswer();
        }
      }
      if (options.questions.length === 3) {
        let currentQuestion = options.questions.filter((item) => {
          return event.target.childNodes[1].alt === item.name;
        })[0];
        if (currentQuestion.type === 'paint') {
          getRightAnswer();
        } else {
          getWrongAnswer();
        }
      }
    }
  });
};
