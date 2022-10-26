import BoardPresenter from './presenter/board-presenter.js';
import { changeSizeBoard, getMatrix, setPositionItems, findCoordsCell, checkReplaceCell, swapCell, setDisableCell, deleteDisableCell, isMatrixWork, setStep, setStorageMatrix, getStorageMatrix, getStorageSteps, setStepZero, hideWinShow, startTimer, getStorageTime, setTimeZero, getStorageWinList, setStorageMusicCheckbox,  getStorageMusicCheckbox} from './utils/utils.js';

// Отрисовка нашего интерфейса
const boardPresenter = new BoardPresenter();
boardPresenter.init();
const audioCheckbox = document.getElementById('music');

// Проверка чекбокса музыки
const checkMusicActive = (chd = false) => {
  let isChecked;

  if (audioCheckbox.checked) {
    isChecked = true;
  } else {
    isChecked = false;
  }

  setStorageMusicCheckbox(isChecked);
  return isChecked
}

//Функция инииализаций событий для DragDrop
const initEvent = () => { // Эта функция возвращает объект с двумя функциями             
  let fns = [];
  let blankCellFn = null;

  return {
    removeEvents: () => {
      fns.forEach((fn) => fn()); // Массив функций которые будут вызываться
      fns = [];
    },
    addEvents: () => {
      let blankCell = itemList[itemList.length - 1];

      for (let i = 0; i < itemList.length-1; i++) {  // На все квадратики кроме последнего вешаем событие
        const element = itemList[i];
    
        const startMove = (event) => {

          for (let i = 0; i < itemList.length-1; i++) { // Окрашиваем неактивные ячеечки
            itemList[i].style.background = 'goldenrod';
          }

          event.target.style.background = 'red'; // Красим выбранную ячейку
          blankCellFn && blankCellFn(); // Проверка на null
          blankCellFn = () => blankCell.removeEventListener('mouseup', onBlankEvent);
          function onBlankEvent() {
            changePositionHandler(event);
          };

          blankCell.addEventListener('mouseup', onBlankEvent);
        }
    
        element.addEventListener('mousedown', startMove);
        fns.push(() => element.removeEventListener('mousedown', startMove))
      }
    }
  }
} 

//Начальные значения для игры
const {addEvents, removeEvents} = initEvent();
const container = document.querySelector('.puzzle-list'); // Обертка
let itemList =  Array.from(document.querySelectorAll('.puzzle-item')); // Все карточки начальные
let matrix; // Наша матрица которую будем тассовать в разных местах

// Функция расставноки карточек
const placeCard = (event) => {
  if (event !== undefined && event.target.classList.contains('size-btn')) {
    buttonContine.setAttribute("disabled", "disabled");
  };

  let target = document.querySelector('.active-size');
  if (event !== undefined) {
    target = event.target;
  };

  if (target.classList.contains('size-btn')) {
    removeEvents(); // Удаляем события со старых кнопочек
    changeSizeBoard(event, matrix); // Меня HTML нашей доски
    itemList =  Array.from(document.querySelectorAll('.puzzle-item')); // Получаем свежий список всех карточек
    matrix = getMatrix(itemList); // Составляем матрицу для нужного размера

    if (getStorageMatrix() !== null) { // Делаем првоерку, чтобы сохраненная матрица в ЛС была равна выбранному размеру поля
      const newListSize = itemList.length;
      const oldMatrixLength = getStorageMatrix().flat().length;
      
      if (newListSize === oldMatrixLength) {
        matrix = getStorageMatrix();
      }
    }

    const stepsCount = document.querySelector('.move-value'); // Получим текущее значение шагов
    const timeCount = document.querySelector('.time'); // Получим текущее значение шагов
    const tableCell = document.querySelectorAll('[data-td]'); // Получим текущий лист победителей

    if (getStorageSteps() !== null) {
      stepsCount.textContent = getStorageSteps(); 
    }

    if (getStorageTime() !== null) {
      timeCount.textContent = getStorageTime(); 
    }

    if (getStorageMusicCheckbox() !== null) {
      if (getStorageMusicCheckbox() === 'true') {
        audioCheckbox.setAttribute('checked', 'checked'); 
      } else {
        audioCheckbox.removeAttribute('checked'); 
      }
    }

    if (getStorageWinList() !== null) {
      const winnerList = getStorageWinList();
      for (let i = 0; i < tableCell.length; i++) {
        tableCell[i].textContent = winnerList[i]; // Замени содержимое ячейки
      }
    }

    let matrixCheck = matrix.flat().join(''); // Для сверки на тассовку матрицы
    let itemsCheck = itemList.map((item) => Number(item.dataset.number)).join(''); // Для сверки на тассовку матрицы
    if (matrixCheck === itemsCheck) { // КОСТЫЛЬНАЯ ПРОВЕРКА НА СМЕНУ РАЗМЕРОВ И ОБНУЛЕНИЯ ЗНАЧЕНИЙ
      setStepZero(); // Обнулим счетчик при шафле
      setTimeZero(); // Обнулим и остановим прошлый таймер
      buttonContine.setAttribute("disabled", "disabled");
    }

    setStorageMatrix(matrix);
    setPositionItems(matrix, itemList); // Расставляем наши элементы
    setDisableCell(itemList); // Заблочим карточки при не начатой игре
    addEvents(); // Добавление событий на перемещение кнопок DragDrop
  }
}

// Функция для шафла 
const buttonShuffle = document.querySelector('.one');

const shuffle = () => {
  placeCard(); // Заново расставим карточки
  const shuffleItemList = itemList.slice(); // Делаем копию нашего начально массива, ибо начальный нужен для расположения элементов

  shuffleItemList.sort(() => Math.random() - 0.5);

  while(!isMatrixWork(shuffleItemList, itemList)) { // Шафлим до тех пор пока не будет решаемая
    shuffleItemList.sort(() => Math.random() - 0.5);
  }

  setStepZero(); // Обнулим счетчик при шафле
  setTimeZero(); // Обнулим и остановим прошлый таймер
  startTimer(); // Запустим новый таймер

  matrix = getMatrix(shuffleItemList);
  setPositionItems(matrix, itemList);
  setStorageMatrix(matrix);

  buttonContine.setAttribute("disabled", "disabled");
  deleteDisableCell(itemList);
};

// Функция для продолжения игры 
const buttonContine = document.querySelector('.two');

const contineGame = () => {
  setStep(Number(getStorageSteps())); // Запустим функцию
  startTimer(); // Запустим наш таймер
  deleteDisableCell(itemList);
  buttonContine.setAttribute("disabled", "disabled");
};

// Функция для смены позиции по клику
const changePositionHandler = (event) => {
  const target = event.target;

  if (!target.classList.contains('puzzle-item')) {
    return
  }

  const targetCellId = Number(event.target.dataset.number);
  const emptyCellId = Number(itemList[itemList.length - 1].dataset.number);

  const targetCellCoords = findCoordsCell(targetCellId, matrix); // Находим координаты ячеек
  const emptyCellCoords = findCoordsCell(emptyCellId, matrix);

  const isReplaceCell = checkReplaceCell(targetCellCoords, emptyCellCoords); // Чекаем возможно ли свапнуть

  if (isReplaceCell) {

    if (checkMusicActive()) { // Проверим активен ли чекбокс
      const audioObj = new Audio('./assets/boy.mp3');
      audioObj.play()
    };

    matrix = swapCell(targetCellCoords, emptyCellCoords, matrix); // Меняем матрицу
    setPositionItems(matrix, itemList); // Хадаем новую позицию 
    setStep(1); // Считаем ход
    setStorageMatrix(matrix);// Сохранение в локальное хранилище
  };
}


const loadGamePage = () => {
  placeCard();
}
loadGamePage(); // Функция инициализации игры при обновлении странички или открытии впервые


const buttonNewGame = document.querySelector('.restartButton');
const newGameStart = () => {
  shuffle(); // Шафлим по новой
  hideWinShow(); // Скрываем окно
}

// Составим матрицу элементов  в зависимости от размеров поля
document.addEventListener('click', placeCard);
// Функция для шафла
buttonShuffle.addEventListener('click', shuffle);
// Смена позиции по клику
container.addEventListener('click', changePositionHandler);
// Функция для продолжения игры
buttonContine.addEventListener('click', contineGame);
// Функция для новой игры после победы
buttonNewGame.addEventListener('click', newGameStart);
// Смена чекбокса звука
audioCheckbox.addEventListener('click', checkMusicActive);