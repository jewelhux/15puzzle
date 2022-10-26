import { createElement } from '../utils/render.js';

const createMusicButtons = () => (
  `<div class="music-box">
    <input type="checkbox" id="music" name="scales">
    <label for="music">Звук движения плитки</label>
  </div>`
);

export default class MusicView {
  getTemplate() {
    return createMusicButtons();
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