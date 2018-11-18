'use strict';

class Note {
  constructor(title, text, id) {
    this._id = id;
    this._title = title;
    this._text = text;
    this._type = "note";
    this._position = {x: 10, y: 10};
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get position() {
    return this._position;
  }
}