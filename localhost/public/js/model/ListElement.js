'use strict';

class ListElement {
  constructor(text, id) {
    this._text = text;
    this._id = id;
    this._checked = false;
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this._checked = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get id() {
    return this._id;
  }
}