import {drawHearts} from './game';

export default (data) =>
  `<header class="header">
    <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
    </div>
    <h1 class="game__timer">${data.time}</h1>
    <div class="game__lives">
      ${drawHearts(data.lives)}
    </div>
  </header>`;
