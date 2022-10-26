import { createElement } from '../utils/render.js';

const createStatsButtons = () => (
  `<div class="stats">
    <div class="time">00:00</div>
    <div class="move">Ходов: <span class="move-value">0</span></div>
  </div>`
);

export default class StatsView {
  getTemplate() {
    return createStatsButtons();
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