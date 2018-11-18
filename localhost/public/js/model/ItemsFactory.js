'use strict';

class ItemsFactory {

  constructor() {
    this._boardId = 0;
    this._listId = 0;
    this._listElementId = 0;
    this._noteId = 0;
    this._imageId = 0;
  }

  createBoard(title) {
    return new Board(title, this._boardId++);
  }

  createList(title) {
    return new List(title, this._listId++);
  }

  createListElement(text) {
    return new ListElement(text, this._listElementId++);
  }

  createNote(title, text = "") {
    return new Note(title, text, this._noteId++);
  }

  createImage(path) {
    return new Picture(path, this._imageId++);
  }

  createModel() {
    const model = new Model();
    //const board = this.createBoard("New Board");
    //model.boards.push(board);
    return model;
  }
}

