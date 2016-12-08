const answers = ['photo', 'paint'];

export const bonus = {
  RIGHT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE: 50
};

export const constraints = {
  timeLimit: 30,
  levelLimit: 10,
  livesLimit: 0,
  timeSlow: 20,
  timeFast: 10
};


export const content = [
  {
    questions: [
      {
        name: 'question1',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      },
      {
        name: 'question2',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      }
    ],
    answers,
    task: 'Угадайте для каждого изображения фото или рисунок?'
  },
  {
    questions: [
      {
        name: 'question1',
        url: 'http://placehold.it/705x455',
        type: 'paint'
      }
    ],
    answers,
    task: 'Угадай, фото или рисунок?'
  },
  {
    questions: [
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'paint'
      }
    ],
    task: 'Найдите рисунок среди изображений'
  },
  {
    questions: [
      {
        name: 'question1',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      },
      {
        name: 'question2',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      }
    ],
    answers,
    task: 'Угадайте для каждого изображения фото или рисунок?'
  },
  {
    questions: [
      {
        name: 'question1',
        url: 'http://placehold.it/468x458',
        type: 'paint'
      },
      {
        name: 'question2',
        url: 'http://placehold.it/468x458',
        type: 'paint'
      }
    ],
    answers,
    task: 'Угадайте для каждого изображения фото или рисунок?'
  },
  {
    questions: [
      {
        url: 'http://placehold.it/304x455',
        type: 'paint'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      }
    ],
    task: 'Найдите рисунок среди изображений'
  },
  {
    questions: [
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'paint'
      }
    ],
    task: 'Найдите рисунок среди изображений'
  },
  {
    questions: [
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'photo'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'paint'
      }
    ],
    task: 'Найдите рисунок среди изображений'
  },
  {
    questions: [
      {
        name: 'question1',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      },
      {
        name: 'question2',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      }
    ],
    answers,
    task: 'Угадайте для каждого изображения фото или рисунок?'
  },
  {
    questions: [
      {
        name: 'question1',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      },
      {
        name: 'question2',
        url: 'http://placehold.it/468x458',
        type: 'photo'
      }
    ],
    answers,
    task: 'Угадайте для каждого изображения фото или рисунок?'
  }
];

export const game = {

  stats: new Array(10).fill('unknown'),

  lives: 3,

  time: 0,

  level: 0

};

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'empty' : 'full'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};


export const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i >= lives)).join('\n');
};

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

export const hasLevel = (num) => typeof content[num] !== 'undefined';

export const getLevel = (num) => {
  if (!hasLevel(num)) {
    throw new RangeError(`This game has no level ${num}`);
  }

  return content[num];
};
