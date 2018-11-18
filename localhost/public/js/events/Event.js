'use strict';

class Event {
  constructor(type, metainfo) {
    this._type = type;

    this._customEvent = new CustomEvent(this._type, {
      detail: metainfo
    });
  }

  get type() {
    return this._type;
  }

  dispatch(target) {
    target.dispatchEvent(this._customEvent);
  }
}