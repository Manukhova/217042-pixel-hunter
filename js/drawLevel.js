import header from './header';
import drawGameScreen from './drawGameScreen';
import {content, game, constraints, drawHearts} from './game';
import select from './select';
import introElement from './intro';
import stats from './stats';

let interval = null;
let mainElement = document.getElementById('main');

export const setCurrentLevel = (currentGame, level) => {
  return Object.assign({}, currentGame, {
    level: level
  });
};

export const setTime = (currentGame, time) => {
  if (time < 0) {
    throw new RangeError('Time can\'t be negative');
  }
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
  gameState.time = 0;
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

  let head = header(gameState);
  let level = drawGameScreen(options);
  select(level, elem);
  mainElement.insertBefore(head, level);
  setTimer();

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
      select(stats(gameState.stats, gameState.lives), level);
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
      gameState.stats[gameState.level] = 'wrong';
      clearTimer();
      mainElement.removeChild(head);
      select(stats(gameState.stats), level);
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
            select(stats(gameState.stats), level);
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
          gameState.stats[gameState.level] = 'wrong';
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
          gameState.stats[gameState.level] = 'wrong';
          getWrongAnswer();
        }
      }
    }
  });
};
        //
        // if (event.target.previousSibling.previousSibling.name === 'question1') {
        //   if (options.questions[0].type !== event.target.previousSibling.previousSibling.value) {
        //     firstQuestionIsFalse = true;
        //     gameState = setLives(gameState, gameState.lives - 1);
        //     document.querySelector('.game__lives').innerHTML = drawHearts(gameState.lives);
        //     if (gameState.lives <= constraints.livesLimit) {
        //       select(stats(gameState.stats), level);
        //       mainElement.removeChild(head);
        //     }
        //   }
        // } else if (event.target.previousSibling.previousSibling.name === 'question2') {
        //   if (options.questions[1].type === event.target.previousSibling.previousSibling.value && firstQuestionIsFalse !== true) {
        //     getRightAnswer();
        //   } else {
        //     gameState.stats[gameState.level] = 'wrong';
        //     getWrongAnswer();
        //   }
        // }
 // if (options.questionNumber === 1) {
 //        if (options.questions[0].type !== event.target.previousSibling.previousSibling.value) {
 //          gameState.stats[gameState.level] = 'wrong';
 //          getWrongAnswer();
 //        } else {
 //          getRightAnswer();
 //        }
 //      } else if (options.questionNumber === 3) {
 //        if (event.target.childNodes[1].alt === 'Option 1' && options.questions[0].type === 'paint') {
 //          getRightAnswer();
 //        } else if (event.target.childNodes[1].alt === 'Option 2' && options.questions[1].type === 'paint') {
 //          getRightAnswer();
 //        } else if (event.target.childNodes[1].alt === 'Option 3' && options.questions[2].type === 'paint') {
 //          getRightAnswer();
 //        } else {
 //          gameState.stats[gameState.level] = 'wrong';
 //          getWrongAnswer();
 //        }
 // //      }
 //    }
 //  });
