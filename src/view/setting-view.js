import { createElement } from '../utils/render.js';

const createSettingButtons = () => (
  `<div class="setting-buttons">
    <button class="setting-item one">Shuffle and start (or restart)</button>
    <button class="setting-item two">Продолжить игру</button>
  </div>`
);

export default class SettingView {
  getTemplate() {
    return createSettingButtons();
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