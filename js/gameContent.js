import {gameAnswers} from './game';

export default (options) => {
  let gameQuestion;
  switch (options.answers.length) {
    case 2:
      gameQuestion = `${options.answers.map((item, i) => `<div class="game__option">
  <img src=${item.image.url} alt="Option ${i + 1}" width=${item.image.width} height=${item.image.height}>
    ${gameAnswers.map((answer) => `<label class="game__answer game__answer--${answer}">
      <input name="question${i + 1}" type="radio" value="${answer}">
      <span>Фото</span>
    </label>
`).join('\n')}
</div>`).join('\n')}`;
      break;

    case 1:
      gameQuestion = `${options.answers.map((item, i) => `<div class="game__option">
<img src=${item.image.url} alt="Option ${i + 1}" width=${item.image.width} height=${item.image.height}>
  ${gameAnswers.map((answer) => `<label class="game__answer game__answer--${answer}">
    <input name="question${i + 1}" type="radio" value="${answer}">
    <span>Фото</span>
  </label>
`).join('\n')}
</div>`).join('\n')}`;
      break;

    default:
      gameQuestion = `${options.answers.map((item, i) => `<div class="game__option">
    <img src=${item.image.url} alt="Option ${i + 1}" width=${item.image.width} height=${item.image.height}>
    </div>`).join('\n')}`;
      break;
  }
  return gameQuestion;
};
