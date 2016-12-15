import {drawHearts} from './game';
import getElementFromTemplate from './getElementFromTemplate';


const header = (game) => {
  const templateHeader = `<header class="header">
    <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
    </div>
    <h1 class="game__timer">${game.time}</h1>
    <div class="game__lives">
      ${drawHearts(game.lives)}
    </div>
  </header>`;

  const headerElement = getElementFromTemplate(templateHeader);

  return headerElement;
};


export default header;


// const header = document.createElement('div');
//
// export default () => {
//   header.innerHTML = `<header class="header">
//     <div class="header__back">
//         <span class="back">
//           <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
//           <img src="img/logo_small.png" width="101" height="44">
//         </span>
//     </div>
//     <h1 class="game__timer">${game.time}</h1>
//     <div class="game__lives">
//       ${drawHearts(game.lives)}
//     </div>
//   </header>`;
//
//   return header;
// };
