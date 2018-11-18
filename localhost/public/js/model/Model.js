'use strict';

class Model {
  constructor() {
    this._boards = [];
    this._about = {
      name: "",
      lastName: "",
      info: "",
      email: "",
      img: ""
    };
  }

  get boards() {
    return this._boards;
  }

  get about() {
    return this._about;
  }
}