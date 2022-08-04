// Класс Section отвечает за отрисовку элементов на странице, своей разметки у класса нет

export class Section {
  constructor({ items, renderer }, containerSelector) {
    //Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса
    //Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  //Публичный метод принимает DOM-элемент и добавляет его в контейнер
  //Отрисовка каждого отдельного элемента функцией renderer
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  //Публичный метод отвечает за отрисовку всех элементов
  addItem(element, isAdded) {
    if (isAdded) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}

