
import greetingElement from './greeting';
import rulesElement from './rules';
import gameOneElement from './game-1';
import gameTwoElement from './game-2';
import gameThreeElement from './game-3';
import statsElement from './stats';
import introElement from './intro';

  // let getElementFromTemplate = (string) => {
  //   let node = document.createElement('span');
  //   let content = string;
  //   node.appendChild(content);
  //   return node.cloneNode(true);
  // };


  // Rules
  // let rulesElement = loadTemplate('rules');
  let rulesSubmit = rulesElement.querySelector('.rules__button');

  rulesElement.querySelector('.rules__input').oninput = () => {
    if (this.value) {
      rulesSubmit.removeAttribute('disabled');
    } else {
      rulesSubmit.setAttribute('disabled', '');
    }
  };

  // Slides changer

  let mainElement = document.getElementById('main');

  let switcher = document.createElement('div');
  switcher.innerHTML = '' +
    '<span class="prev"><img src="img/arrow_left.svg" alt="Left" width="50" height="50"></span>   ' +
    '<span class="next"><img src="img/arrow_right.svg" alt="Right" width="50" height="50"></span>';
  switcher.style.cssText = 'text-align: center';
  mainElement.after(switcher);

  let slides = [
    introElement,
    greetingElement,
    rulesElement,
    gameOneElement,
    gameTwoElement,
    gameThreeElement,
    statsElement
  ];
  let current = -1;

  let select = (index) => {
    current = index;
    mainElement.innerHTML = '';
    mainElement.appendChild(slides[index]);
  };

  document.querySelector('.next').onclick = (e) => {
    e.preventDefault();

    select(current + 1);
  };

  document.querySelector('.prev').onclick = (e) => {
    e.preventDefault();

    select(current - 1);
  };

  select(0);
