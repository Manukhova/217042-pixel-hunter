import {game} from './game';

let footer = () => {
  return `<div class="stats">
  <ul class="stats">
    ${game.stats.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join('\n')}
  </ul>
</div>`;
};

export default footer;
