import { createElement } from '../utils/render.js';

const createBoardSizeButtons = () => (
  `<div class="border-size">
    <button class="size-btn" data-size="4">2x2</button>
    <button class="size-btn" data-size="9">3x3</button>
    <button class="size-btn active-size" data-size="16">4x4</button>
    <button class="size-btn" data-size="25">5x5</button>
    <button class="size-btn" data-size="36">6x6</button>
    <button class="size-btn" data-size="49">7x7</button>
    <button class="size-btn" data-size="64">8x8</button>
  </div>`
);

export default class BoardSizeView {
  getTemplate() {
    return createBoardSizeButtons();
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