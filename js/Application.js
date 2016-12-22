import createIntro from './intro';
import createGreeting from './greeting';
import newGame from './drawLevel';
import showStats from './stats';
import createRules from './rules';

const mainElement = document.getElementById('main');
const changeView = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};

export default class Application {

  static showIntro() {
    changeView(createIntro());
  }

  static showGreeting() {
    changeView(createGreeting());
  }

  static showRules() {
    changeView(createRules());
  }

  static showGame() {
    changeView(newGame());
  }

  static showStats(gameState) {
    changeView(showStats(gameState));
  }

}
