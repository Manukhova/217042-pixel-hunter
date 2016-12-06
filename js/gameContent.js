
export default (options) => {
  switch (options.questions.length) {
    case 2:
      return `${options.questions.map((item, i) => `<div class="game__option">
  <img src=${item} alt="Option ${i + 1}" width="468" height="458">
    ${options.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
      <input name="question${i + 1}" type="radio" value="${answer}">
      <span>Фото</span>
    </label>
`).join('\n')}
</div>`).join('\n')}`;

    case 1:
      return `${options.questions.map((item, i) => `<div class="game__option">
<img src=${item} alt="Option ${i + 1}" width="705" height="455">
  ${options.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
    <input name="question${i + 1}" type="radio" value="${answer}">
    <span>Фото</span>
  </label>
`).join('\n')}
</div>`).join('\n')}`;

    case 3:
      return `${options.questions.map((item, i) => `<div class="game__option">
    <img src=${item} alt="Option ${i + 1}" width="304" height="455">
    </div>`).join('\n')}`;
  }

};
