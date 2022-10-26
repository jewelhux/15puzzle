import { createElement } from '../utils/render.js';

const createLeadersList = () => (
  `<div class="leasers">
    <h3>Лучшие результаты среди всех полей:</h3>
    <table class="score-list">
    <tr>
      <th>Место&nbsp;&nbsp;</th>
      <th>&nbsp;&nbsp;&nbsp;Количество ходов</th>
    </tr>
    <tr>
      <td>1</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>2</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>3</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>4</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>5</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>6</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>7</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>8</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>9</td>
      <td data-td></td>
    </tr>
    <tr>
      <td>10</td>
      <td data-td></td>
    </tr>
    </table>
  </div>`
);

export default class LeadersListView {
  getTemplate() {
    return createLeadersList();
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