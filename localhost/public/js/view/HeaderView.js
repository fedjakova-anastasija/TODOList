'use strict';

class HeaderView {
  constructor(viewsFactory) {
    this._viewsFactory = viewsFactory;

    this._element = this._viewsFactory.createElement("div");
    this._element.id = "board_header";
    this._element.className = "board_header";

    this._boardHeaders = [];
  }

  selectHeader(id) {
    for (let i = 0; i < this._boardHeaders.length; ++i) {
      const view = this._boardHeaders[i];
      view.selected = (view.id == id);
    }
  }

  createBoardHeaderView(board) {
    const boardHeaderView = this._viewsFactory.createBoardHeaderView(board.title, board.id, board);
    this._element.appendChild(boardHeaderView.element);
    this._boardHeaders.push(boardHeaderView);

    const thisPtr = this;
    boardHeaderView.element.addEventListener(EventType.SELECT_BOARD_EVENT, function (e) {
      const event = new Event(EventType.SELECT_BOARD_EVENT, e.detail);
      event.dispatch(thisPtr._element);
    }, false);

    boardHeaderView.element.addEventListener(EventType.DELETE_BOARD, function (e) {
      const event = new Event(EventType.DELETE_BOARD, e.detail);
      event.dispatch(thisPtr._element);
    }, false);
  }

  removeHeader(id) {
    for (let i = 0; i < this._boardHeaders.length; ++i) {
      const view = this._boardHeaders[i];
      if (view.id == id) {
        this._element.removeChild(view.element);
        this._boardHeaders.splice(i, 1);
      }
    }
  }

  get element() {
    return this._element;
  }
}
