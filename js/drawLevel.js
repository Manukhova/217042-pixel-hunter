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

  const index = content.indexOf(options) + 1;

  head.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, level);
    mainElement.removeChild(head);
  });

  // const getLevel = () => {
  //   mainElement.removeChild(head);
  //   gameState = setCurrentLevel(gameState, gameState.level + 1);
  //   drawLevel(content[index], level);
  // };

  const getRightAnswer = () => {
    if (gameState.time >= constraints.timeSlow) {
      gameState.stats[index - 1] = 'slow';
      mainElement.removeChild(head);
      gameState = setCurrentLevel(gameState, gameState.level + 1);
      drawLevel(content[index], level);
    } else if (gameState.time <= constraints.timeFast) {
      gameState.stats[index - 1] = 'fast';
      mainElement.removeChild(head);
      gameState = setCurrentLevel(gameState, gameState.level + 1);
      drawLevel(content[index], level);
    } else {
      gameState.stats[index - 1] = 'correct';
      mainElement.removeChild(head);
      gameState = setCurrentLevel(gameState, gameState.level + 1);
      drawLevel(content[index], level);
    }
  };

  const getWrongAnswer = () => {
    gameState = setLives(gameState, gameState.lives - 1);
    document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
    if (gameState.lives <= constraints.livesLimit) {
      select(statsElement, level);
      mainElement.removeChild(head);
    } else {
      mainElement.removeChild(head);
      gameState = setCurrentLevel(gameState, gameState.level + 1);
      drawLevel(content[index], level);
    }
  };

  level.querySelector('.game__content').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.parentNode.classList.contains('game__answer') || event.target.classList.contains('game__option')) {
      if (options.questionNumber === 2) {
        if (event.target.previousSibling.previousSibling.name === 'question1') {
          if (options.questions[0].type !== event.target.previousSibling.previousSibling.value) {
            gameState = setLives(gameState, gameState.lives - 1);
            document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
            if (gameState.lives <= constraints.livesLimit) {
              select(statsElement, level);
              mainElement.removeChild(head);
            }
          }
        } else if (event.target.previousSibling.previousSibling.name === 'question2') {
          if (options.questions[1].type === event.target.previousSibling.previousSibling.value) {
            getRightAnswer();
          } else {
            gameState.stats[index - 1] = 'wrong';
            getWrongAnswer();
          }
        }
      } else if (options.questionNumber === 1) {
        if (options.questions[0].type !== event.target.previousSibling.previousSibling.value) {
          gameState.stats[index - 1] = 'wrong';
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
          gameState.stats[index - 1] = 'wrong';
          getWrongAnswer();
        }
      }
    }
  });
};
