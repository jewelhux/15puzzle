import PuzzleListView from '../view/puzzleList-view.js';

// Функция созранения в localStorage
const setStorageWinList = (list) => {
  localStorage.setItem('saveWinList', JSON.stringify(list));
}

// Функция получения из localStorage 
const getStorageWinList = () => {
  return JSON.parse(localStorage.getItem("saveWinList"));
}

let TIMER; // Для таймера глобалка, по другому никак
let winTime;
let winStep;
let winnerList;

if (getStorageWinList() !== null) {
  winnerList = getStorageWinList();
} else {
  winnerList = [];
}

// Функция для отрисовки новой доски в зависимости от выбранного размера
const changeSizeBoard = (event) => {
  const puzzleList = new PuzzleListView();
  let target = document.querySelector('.active-size');

  if (event !== undefined) {
    target =  event.target;
  } else if (getStorageSizeBtn() !== null) {
    target = document.querySelector(`[data-size="${getStorageSizeBtn()}"]`);
  }

  const allSizeButtons = Array.from(document.querySelectorAll('.size-btn'));
  allSizeButtons.forEach(element => element.classList.remove('active-size')); //Удалим цвет со сех кнопочек

  target.classList.add('active-size'); // Добавим активной кнопочке цвет
  const targetSize = target.dataset.size;

  setStorageSizeBtn(targetSize) // Сохраним выбранную кнопочку по её дата-ид
  puzzleList.updateElement(targetSize);
};

// Функция для отрисовки новой доски в зависимости от выбранного размера
const getMatrix = (allItems) => {
  let allItemsNumber = allItems.map((item) => Number(item.dataset.number));
  let length = Math.sqrt(allItems.length);
  let matrix = Array(length).fill(0).map(i => []);

  const MAX_LENGTH = matrix.length // Длина массива в зависимости от размеров поля
  let posX = 0; // Горизонталь
  let posY = 0; // Вертикаль

  for (let i = 0; i < allItemsNumber.length; i++) {
    if (posX === MAX_LENGTH) {
      posY = posY + 1;
      posX = 0;
    }

    matrix[posY][posX] = allItemsNumber[i];
    posX = posX + 1;
  }

  return matrix
}

// Функция для отрисовки новой доски в зависимости от выбранного размера
const setPositionItems = (matrix, basicRender) => {
  for (let posY = 0; posY < matrix.length; posY++) {
    for (let posX = 0; posX < matrix[posY].length; posX++) {
      const value = matrix[posY][posX];
      const element = basicRender[value - 1];
      setShiftItems(element, posX, posY);
    }
  }

  basicRender[basicRender.length - 1].style.opacity = '0'; // Скроем последний элемент
}

// Функция определения сдвига
const setShiftItems = (element, posX, posY) => {
  const longShift = 100;
  element.style.transform = `translate3D(${posX * longShift}%, ${posY * longShift}%, 0)`
}

// Функция нахождения координаты кнопочки по её ID
const findCoordsCell = (itemId, matrix) => {
  for (let posY = 0; posY < matrix.length; posY++) {
    for (let posX = 0; posX < matrix[posY].length; posX++) {
      if (matrix[posY][posX] === itemId) return {posX, posY}
    }
  }
}

// Функция проверки возможности замены соседних ячеек
const checkReplaceCell = (targetCell, emptyCell) => {
  const oddX = Math.abs(targetCell.posX - emptyCell.posX);
  const oddY = Math.abs(targetCell.posY - emptyCell.posY);

  if ((oddX === 1 || oddY === 1) && (targetCell.posX === emptyCell.posX || (targetCell.posY === emptyCell.posY))) {
    return true
  } return false
}

// Функция проверки победы
const checkWin = (matrix) => {
  const MATRIX_LENGTH = matrix.flat().length;

  const currentCombination = matrix.flat();
  const winCombination = Array(MATRIX_LENGTH).fill(0).map((_item, index) => index + 1);
  
  if (currentCombination.join('') === winCombination.join('')) {
    displayWinShow(); // Функция показа окна победы
    return true
  } 
  return false
}

// Функция показа окна победы
const displayWinShow = () => {
  const winDisplay = document.querySelector('.winning-message'); // Контейнер окна победы
  const winText = document.querySelector('.winText');

  winTime = document.querySelector('.time').textContent;
  winStep = Number(document.querySelector('.move-value').textContent) + 1;

  setTableScore(winStep); // Запишем результат в таблицу
  winText.textContent = `Hooray! You solved the puzzle in ${winTime} and ${winStep} moves!`;
  winDisplay.style.display = 'flex';
}

// Функция сокрытия окна победы
const hideWinShow = () => {
  const winDisplay = document.querySelector('.winning-message');
  winDisplay.style.display = 'none';
}

// Функция по созданию таблицы рекордов
const setTableScore = (stepCount) => {
  let tableCell = document.querySelectorAll('[data-td]');

  winnerList.push(Number(stepCount));
  winnerList.sort((a, b) => a - b); // Сортируем массив

  if (winnerList.length > 10) {
    winnerList = winnerList.slice(0, 10) // Укоротим массив если он стал длинее 10
  }

  for (let i = 0; i < tableCell.length; i++) {
    if (winnerList[i]) tableCell[i].textContent = winnerList[i]; // Замени содержимое ячейки
  }

  setStorageWinList(winnerList)
}

// Функция смены ячеек
const swapCell = (targetCell, emptyCell, matrix) => {
  const targetCellSave = matrix[targetCell.posY][targetCell.posX];
  matrix[targetCell.posY][targetCell.posX] = matrix[emptyCell.posY][emptyCell.posX];
  matrix[emptyCell.posY][emptyCell.posX] = targetCellSave;

  checkWin(matrix) // ПРОВЕРКА ПОБЕДЫ ПРИ КАЖДОМ ХОДЕ

  return matrix
}

// Функция блокировки ячеек при загрузке странички или смене размера поля
const setDisableCell = (itemList) => {
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].disabled = true;
  }
}

// Функция разблокирвоки ячеек
const deleteDisableCell = (itemList) => {
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].disabled = false;
  }
}


// Функция времени
let second = 0;
let minute = 0;

const setTime = () => {
  const textTimer = document.querySelector('.time');

  const timeArray = textTimer.textContent.split(':') // Разбиваем стартовое значение на числа
  second = Number(timeArray[1]);
  minute = Number(timeArray[0]);

  if (second < 59) {
    second++
  } else {
    minute++
    second = 0;
  }

  let time = `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  setStorageTime(time);
  textTimer.textContent = time;
  return time
}

// Функция подсчета шагов
let step = 0;

const setStep = (oldStep = 0) => {
  const stepCounter = document.querySelector('.move-value');
  step += oldStep;
  stepCounter.textContent = step;
  setStorageSteps(step);
  return step
}


// Функция обнуления времени
const setTimeZero = () => {
  const textTimer = document.querySelector('.time');
  textTimer.textContent = '00:00';
  clearInterval(TIMER);

  second = 0;
  minute = 0;
}

// Функция обнуления шагов
const setStepZero = () => {
  const stepCounter = document.querySelector('.move-value');
  step = 0;

  setStorageSteps(step);
  stepCounter.textContent = '0';
}

// Функция проверки шафла на решаемость
const isMatrixWork = (allItems, itemList) => {
  const allItemsNumber = allItems.map((item) => Number(item.dataset.number));
  let sum = 0; // Сумма итераций

  if (allItemsNumber.length % 2 !== 0) {
    for (let a = 0; a < allItemsNumber.length; a++) { // Запустим цикл по шафленному массиву
      if (allItemsNumber[a] !== allItemsNumber.length) { // Исключаем пустую ячейку в первом числе
        for (let b = a + 1; b < allItemsNumber.length; b++) { // Сравниваем первое число с теми, которые идут за ним
          if (allItemsNumber[b] !== allItemsNumber.length) { // Исключаем пустую ячейку во втором числе
            if (allItemsNumber[a] > allItemsNumber[b]) sum++
          }
        }
      }
    }
  } else {
    for (let a = 0; a < allItemsNumber.length; a++) { // Запустим цикл по шафленному массиву
      if (allItemsNumber[a] !== allItemsNumber.length) { // Исключаем пустую ячейку в первом числе
        for (let b = a + 1; b < allItemsNumber.length; b++) { // Сравниваем первое число с теми, которые идут за ним
          if (allItemsNumber[b] !== allItemsNumber.length) { // Исключаем пустую ячейку во втором числе
            if (allItemsNumber[a] > allItemsNumber[b]) sum++
          }
        }
      }
    }
  
    let matrixRow = Math.sqrt(allItemsNumber.length);
    let blankRow;
    for (let a = 0; a < allItemsNumber.length; a++) {
      if (allItemsNumber[a] === allItemsNumber.length) {
        blankRow = Math.ceil((a + 1) / matrixRow); // Находим округление в большую сторону от (индекса элемента + 1) / размер матрицы
      }
    }

    sum += blankRow;
  }

  let matrixCheck = allItemsNumber.join(''); // Для сверки на тассовку матрицы
  let itemsCheck = itemList.map((item) => Number(item.dataset.number)).join(''); // Для сверки на тассовку матрицы

  if (matrixCheck === itemsCheck) { // Если попалась готовая матрица 
    return false
  }

  if (sum % 2 !== 0) { // Если число четное = матрица решаемая.
    return false
  } 
  return true
}

// Функция созранения в localStorage матрицы
const setStorageMatrix = (matrix) => {
  localStorage.setItem('saveMatrix', JSON.stringify(matrix));
}

// Функция получения из localStorage матрицы
const getStorageMatrix = () => {
  const matrix = JSON.parse(localStorage.getItem("saveMatrix"));
  return matrix
}

// Функция созранения в localStorage выбранной кнопочки
const setStorageSizeBtn = (size) => {
  localStorage.setItem('saveSize', size);
}

// Функция получения из localStorage матрицы
const getStorageSizeBtn = () => {
  return localStorage.getItem("saveSize");
}

// Функция созранения в localStorage
const setStorageSteps = (step) => {
  localStorage.setItem('saveSteps', step);
}

// Функция получения из localStorage 
const getStorageSteps = () => {
  return localStorage.getItem("saveSteps");
}

// Функция созранения в localStorage
const setStorageTime = (time) => {
  localStorage.setItem('saveTime', time);
}

// Функция получения из localStorage 
const getStorageTime = () => {
  return localStorage.getItem("saveTime");
}

// Функция созранения в localStorage
const setStorageMusicCheckbox = (music) => {
  localStorage.setItem('saveMusic', music);
}

// Функция получения из localStorage 
const getStorageMusicCheckbox = () => {
  return localStorage.getItem("saveMusic");
}

// Функция для игры на паузе
const startTimer = () => {
  TIMER = setInterval(setTime, 1000) // Запускаем новый таймер
}

export { getMatrix, changeSizeBoard, setPositionItems, findCoordsCell, checkReplaceCell, swapCell, setDisableCell, deleteDisableCell, setTime, isMatrixWork, setStepZero, setStep, setStorageMatrix, getStorageMatrix, getStorageSteps, setStorageSteps, startTimer, getStorageTime, setTimeZero, hideWinShow, getStorageWinList, setStorageMusicCheckbox,  getStorageMusicCheckbox};