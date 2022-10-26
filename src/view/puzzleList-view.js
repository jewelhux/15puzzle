import { createElement, render } from '../utils/render.js';

const createPuzzleItem = (itemNumber, itemCount) => (
  `<button class="puzzle-item puzzle-item-${itemCount}" data-number="${itemNumber}">${itemNumber}</button>`
)

// Функция для создания листа карточек
const createPuzzleList = (puzzleCount = 16) => {
  const itemCount = Number(puzzleCount);
  let allItems = [];

  for (let i = 1; i <= itemCount; i++) {
    allItems.push(createPuzzleItem(i, puzzleCount))
  }

  return  `<div class="puzzle-list">
    ${allItems.join('')}
  </div>`
};

// Функция для обновления карточек в имеющемся листе
const updatePuzzleList = (puzzleCount) => {
  const pazzleList = document.querySelector('.puzzle-list');
  pazzleList.innerHTML = '';

  for (let i = 1; i <= puzzleCount; i++) {
    const itemElement = createElement(createPuzzleItem(i,puzzleCount));
    pazzleList.append(itemElement)
  }
};

export default class PuzzleListView {
  getTemplate() {
    return createPuzzleList();
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

  updateElement(count) {
    return updatePuzzleList(count); 
  }
}
