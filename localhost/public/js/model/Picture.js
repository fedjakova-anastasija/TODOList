'use strict';

class Picture {
  constructor(path, id) {
    this._id = id;
    this._path = path;
    this._type = "image";
    this._position = {x: 10, y: 10};
  }

  get id() {
    return this._id;
  }

  get path() {
    return this._path;
  }

  get position() {
    return this._position;
  }
}