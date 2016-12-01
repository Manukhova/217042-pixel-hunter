
import getElementFromTemplate from './getElementFromTemplate';
import select from './select';
import statsElement from './stats';
import introElement from './intro';
import header from './header';
import gameStats from './footer';

export default (data) => {

  const gameTaskThree = `<p class="game__task">${data.taskThree}</p>`;

  const gameContentThree = `${data.contentThree.map((item, i) => `<div class="game__option">
  <img src=${item.question} alt="Option ${i + 1}" width="304" height="455">
  </div>`).join('\n')}`;

  const templateGameThree = `
${header(data)}
<div class="game">
    ${gameTaskThree}
  <form class="game__content  game__content--triple">
    ${gameContentThree}
  </form>
  ${gameStats(data)}
</div>`;

  const gameThreeElement = getElementFromTemplate(templateGameThree);

  gameThreeElement.querySelector('.game__content').addEventListener('click', () => {
    event.preventDefault();
    if (event.target.classList.contains('game__option')) {
      select(statsElement, gameThreeElement);
    }
  });

  gameThreeElement.querySelector('.header__back').addEventListener('click', () => {
    event.preventDefault();
    select(introElement, gameThreeElement);
  });

  return gameThreeElement;
};
