export class Section{
  constructor( { renderer}, containerSelector ) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(cards) {
    this.clear();

    cards.forEach(item => {
      this._renderer(item);
    });
  }
}
