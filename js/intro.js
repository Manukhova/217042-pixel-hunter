'use strict';

import getElementFromTemplate from './getElementFromTemplate';

const templateIntro = `<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf
    Sparnaay.</p>
</div>`;

const introElement = getElementFromTemplate(templateIntro);

export default introElement;
