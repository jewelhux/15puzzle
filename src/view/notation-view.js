import { createElement } from '../utils/render.js';

const createNotation = () => (
  `<div class="notation">
    <h4 class="notation-title">Небольшие пояснения</h4>
    <div class="notation-text"><b>1)</b> Кнопка "Продолжить игру" станет активна если вы зашафлите и обновите страничку. Это для требования по LocalStorage.</div>
    <div class="notation-text"><b>2)</b> Требование "iles can be dragged with use of mouse" реализовано, для проверки может зажать нужную ячейку и отпустить в пустой ячейке. Также для удобства сделал смену по кликам.</div>
    <div class="notation-text"><b>3)</b> Не забудьте включить звук на вкладке приложения если вдруг выключали.</div>
    <div class="notation-text"><b>4)</b> Все остальное по идее не должно вызвать вопросов, если они всё таки возникли прошу писать в ДС JiK#3141</div>
    <div class="notation-text"><b>5)</b> Для проверки решаемости можете использовать: <b><a href="https://jerubrin.github.io/puzzle-checker/build/">ЧЕКЕР</a></b></div>
  </div>`
);

export default class NotationView {
  getTemplate() {
    return createNotation();
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