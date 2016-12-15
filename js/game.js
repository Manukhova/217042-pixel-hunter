export const answers = ['photo', 'paint'];

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
    task: 'Угадайте для каждого изображения фото или рисунок?',
    questionNumber: 2
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
    task: 'Угадай, фото или рисунок?',
    questionNumber: 1
  },
  {
    questions: [
      {
        url: 'http://placehold.it/304x455',
        type: 'photo',
        name: 'Option 1'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'photo',
        name: 'Option 2'
      },
      {
        url: 'http://placehold.it/304x455',
        type: 'paint',
        name: 'Option 3'
      }
    ],
    task: 'Найдите рисунок среди изображений',
    questionNumber: 3
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
    task: 'Угадай, фото или рисунок?',
    questionNumber: 1
  }
];

export const game = {

  stats: new Array(10).fill('unknown'),

  lives: 3,

  time: 0,

  level: 0,
};

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'empty' : 'full'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};


export const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i >= lives)).join('\n');
};
