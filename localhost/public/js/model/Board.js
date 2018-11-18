'use strict';

class Board {
  constructor(title, id) {
    this._id = id;
    this._title = title;
    this._lists = [];
    this._notes = [];
    this._images = [];
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

  get lists() {
    return this._lists;
  }

  get notes() {
    return this._notes;
  }

  get images() {
    return this._images;
  }
}