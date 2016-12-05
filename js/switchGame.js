
export default (content) => {
  switch (content.questions.length) {
    case 2:
      return `<form class="game__content">
      ${content.questions.map((item, i) => `<div class="game__option">
      <img src=${item} alt="Option ${i + 1}" width="468" height="458">
        ${content.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
          <input name="question${i + 1}" type="radio" value="${answer}">
          <span>Фото</span>
        </label>
    `).join('\n')}
    </div>`).join('\n')}
  </form>`;

    case 1:
      return `<form class="game__content  game__content--wide">
      ${content.questions.map((item, i) => `<div class="game__option">
    <img src=${item} alt="Option ${i + 1}" width="705" height="455">
      ${content.answers.map((answer) => `<label class="game__answer game__answer--${answer}">
        <input name="question${i + 1}" type="radio" value="${answer}">
        <span>Фото</span>
      </label>
    `).join('\n')}
    </div>`).join('\n')}
  </form>`;

    case 3:
      return `<form class="game__content  game__content--triple">
        ${content.questions.map((item, i) => `<div class="game__option">
        <img src=${item} alt="Option ${i + 1}" width="304" height="455">
        </div>`).join('\n')}
      </form>`;
  }
};
