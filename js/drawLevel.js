import header from './header';
import drawGameScreen from './drawGameScreen';
import {content, game, constraints, drawHearts} from './game';
import select from './select';
import introElement from './intro';
import statsElement from './stats';

let interval = null;
let mainElement = document.getElementById('main');

export const setCurrentLevel = (currentGame, level) => {
  return Object.assign({}, currentGame, {
    level: level
  });
};

export const setTime = (currentGame, time) => {
  return Object.assign({}, currentGame, {
    time: time
  });
};

export const setLives = (currentGame, lives) => {
  if (lives < 0) {
    throw new RangeError('Number of lives can\'t be negative');
  }
  return Object.assign({}, currentGame, {
    lives: lives
  });
};

let gameState = game;

const clearTimer = () => {
  clearInterval(interval);
};

export const setTimer = () => {
  interval = setInterval(() => {
    gameState = setTime(gameState, gameState.time + 1);
    document.querySelector('.game__timer').innerHTML = gameState.time;
    if (gameState.time >= constraints.timeLimit) {
      clearTimer();
      gameState = setLives(gameState, gameState.lives - 1);
      document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
    }
  }, 1000);

};

export const drawLevel = (options, elem) => {

  let head = header();
  let level = drawGameScreen(options);
  select(level, elem);
  mainElement.insertBefore(head, level);
  setTimer();

  head.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, level);
    mainElement.removeChild(head);
  });

  const targetValue = event.target.previousSibling.previousSibling.value;

  const getNextLevel = () => {
    clearTimer();
    mainElement.removeChild(head);
    gameState = setCurrentLevel(gameState, gameState.level + 1);
    if (gameState.level >= constraints.levelLimit) {
      select(statsElement, level);
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
    gameState = setLives(gameState, gameState.lives - 1);
    document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
    if (gameState.lives <= constraints.livesLimit) {
      mainElement.removeChild(head);
      select(statsElement, level);
    } else {
      getNextLevel();
    }
  };

  level.querySelector('.game__content').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
      if (options.questionNumber === 2) {
        if (event.target.previousSibling.previousSibling.name === 'question1') {
          if (options.questions[0].type !== targetValue) {
            gameState = setLives(gameState, gameState.lives - 1);
            document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
            if (gameState.lives <= constraints.livesLimit) {
              select(statsElement, level);
              mainElement.removeChild(head);
            }
          }
        } else if (event.target.previousSibling.previousSibling.name === 'question2') {
          if (options.questions[1].type === targetValue) {
            getRightAnswer();
          } else {
            gameState.stats[gameState.level] = 'wrong';
            getWrongAnswer();
          }
        }
      } else if (options.questionNumber === 1) {
        if (options.questions[0].type !== targetValue) {
          gameState.stats[gameState.level] = 'wrong';
          getWrongAnswer();
        } else {
          getRightAnswer();
        }
      } else if (options.questionNumber === 3) {
        if (event.target.childNodes[1].alt === 'Option 1' && options.questions[0].type === 'paint') {
          getRightAnswer();
        } else if (event.target.childNodes[1].alt === 'Option 2' && options.questions[1].type === 'paint') {
          getRightAnswer();
        } else if (event.target.childNodes[1].alt === 'Option 3' && options.questions[2].type === 'paint') {
          getRightAnswer();
        } else {
          gameState.stats[gameState.level] = 'wrong';
          getWrongAnswer();
        }
      }
    }
  });
};
