// Функция для вставки элемента в конкретное место
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

// Функция создания элемента из строки
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template; 

  return newElement.firstElementChild;
};

// Функция вставки элемента в родителя (кого, куда)
const render = (component, container, place = RenderPosition.BEFOREEND) => {
  const element = component.getElement();

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export {RenderPosition, createElement, render};