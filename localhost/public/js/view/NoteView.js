'use strict';

class NoteView {
  constructor(note, viewsFactory) {
    this._element = viewsFactory.createElement("div");
    this._element.id = "note" + note.id;
    this._element.className = "note";

    this._element.style.position = 'absolute';
    this._element.style.left = note.position.x + 'px';
    this._element.style.top = note.position.y + 'px';

    this._note = note;
    this._id = note.id;

    moveElement(note, this._element);

    this._delete = viewsFactory.createElement("input");
    this._delete.type = "button";
    this._delete.className = "delete";
    this._element.appendChild(this._delete);

    this._delete.onclick = function () {
      const event = new Event(EventType.DELETE_NOTE, note.id);
      event.dispatch(thisPtr._element);
    };

    this._header = viewsFactory.createElement("input");
    this._header.className = "title_element";
    this._header.value = note.title;
    this._element.appendChild(this._header);

    this._input = viewsFactory.createElement("textarea");
    this._input.className = "textarea_place";
    this._input.placeholder = "Добавить...";
    this._input.value = note.text;
    this._element.appendChild(this._input);

    const thisPtr = this;
    this._header.onchange = function () {
      const newTitle = thisPtr._header.value;
      note.title = newTitle;
    };

    this._input.onchange = function () {
      const newText = thisPtr._input.value;
      note.text = newText;
    };
  }

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  get note() {
    return this._note;
  }
}
