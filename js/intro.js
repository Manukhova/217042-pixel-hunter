import getElementFromTemplate from './getElementFromTemplate';
import greetingElement from './greeting';
import select from './select';

const templateIntro = `<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf
    Sparnaay.</p>
</div>`;

const introElement = getElementFromTemplate(templateIntro);

introElement.querySelector('.intro__asterisk').addEventListener('click', () => {
  select(greetingElement, introElement);
});

export default introElement;
