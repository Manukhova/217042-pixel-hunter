const game = {

  taskOne: 'Угадайте для каждого изображения фото или рисунок?',

  taskTwo: 'Угадай, фото или рисунок?',

  taskThree: 'Найдите рисунок среди изображений',

  statsOne: ['wrong', 'slow', 'fast', 'correct', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],

  statsTwo: ['wrong', 'slow', 'fast', 'correct', 'wrong', 'unknown', 'slow', 'unknown', 'fast', 'unknown'],

  statsThree: ['wrong', 'slow', 'fast', 'correct', 'wrong', 'unknown', 'slow', 'unknown', 'fast', 'unknown'],

  lives: 2,

  time: 'NN',

  contentOne: [
    {
      question: 'http://placehold.it/468x458',
      answers: ['photo', 'paint']
    },

    {
      question: 'http://placehold.it/468x458',
      answers: ['photo', 'paint']
    }
  ],

  contentTwo: [
    {
      question: 'http://placehold.it/705x455',
      answers: ['photo', 'paint']
    }
  ],

  contentThree: [
    {
      question: 'http://placehold.it/304x455',
    },

    {
      question: 'http://placehold.it/304x455',
    },

    {
      question: 'http://placehold.it/304x455',
    }
  ]
};

export const drawHeart = (full) => {
  return `<img src="img/heart__${full ? 'full' : 'empty'}.svg" class="game__heart" alt="Life" width="32" height="32">`;
};


export const drawHearts = (lives) => {
  return new Array(3).fill(0).map((it, i) => drawHeart(i + 1 >= lives)).join('\n');
};

export default game;
