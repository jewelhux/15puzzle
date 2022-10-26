import { createElement } from '../utils/render.js';

const createWinDisplay = () => (
  `<div class="winning-message">
    <div class="winText">Hooray! You solved the puzzle in ##:## and N moves!</div>
    <button class="restartButton">Новая игра</button>
  </div>`
);

export default class WinDisplayView {
  getTemplate() {
    return createWinDisplay();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}