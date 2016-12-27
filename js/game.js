export const gameAnswers = ['photo', 'painting'];

export const bonus = {
  RIGHT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50
};

export const Result = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  FAST: 'fast',
  SLOW: 'slow',
  UNKNOWN: 'unknown'
};

export const constraints = {
  timeLimit: 30,
  levelLimit: 10,
  livesLimit: 0,
  timeSlow: 20,
  timeFast: 10
};

export const game = {

  stats: new Array(10).fill('unknown'),

  lives: 3,

  time: 0,

  level: 0,

  user: ''
};

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'empty' : 'full'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};


export const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i >= lives)).join('\n');
};
