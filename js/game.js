const answers = ['photo', 'paint'];

export const content = [
  {
    questions: [
      'http://placehold.it/468x458',
      'http://placehold.it/468x458'
    ],
    answers,
    task: 'Угадайте для каждого изображения фото или рисунок?'
  },
  {
    questions: [
      'http://placehold.it/705x455'
    ],
    answers,
    task: 'Угадай, фото или рисунок?'
  },
  {
    questions: [
      'http://placehold.it/304x455',
      'http://placehold.it/304x455',
      'http://placehold.it/304x455'
    ],
    answers,
    task: 'Найдите рисунок среди изображений'
  }
];

export const game = {

  stats: ['wrong', 'slow', 'fast', 'correct', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],

  lives: 2,

  time: 'NN',

};

const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'full' : 'empty'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};


export const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i + 1 >= lives)).join('\n');
};
