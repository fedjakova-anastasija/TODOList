'use strict';

class ListElementView {
  constructor(listElement, viewsFactory, id) {
    this._listElement = listElement;
    this._viewsFactory = viewsFactory;

    this._id = listElement.id;

    this._element = viewsFactory.createElement("li");
    this._element.id = "listElement" + listElement.id;
    this._element.setAttribute("id", this._element.id);

    this._input = viewsFactory.createElement("input");
    this._input.value = listElement.text;
    this._input.className = "list_element";
    this._element.appendChild(this._input);

    this._input.onkeyup = function (e) {
      e = e || window.event;
      if (e.keyCode === 46) {
        const event = new Event(EventType.DELETE_LIST_ELEMENT, listElement.id);
        event.dispatch(thisPtr._element);
      }
    };

    const thisPtr = this;
    this._input.onchange = function () {
      const newText = thisPtr._input.value;
      listElement.text = newText;
    };

	this._element.ondblclick = this._changeCheckedState.bind(this);

    this._delete = viewsFactory.createElement("input");
    this._delete.type = "delete";
    this._delete.className = "delete_element";

    this._delete.onclick = function () {
      const event = new Event(EventType.DELETE_LIST_ELEMENT, listElement.id);
      event.dispatch(thisPtr._element);
    };

    this._element.appendChild(this._delete);
    this._initCheckedState();
  }

  _changeCheckedState() {
	  if (this._listElement.checked) {
		  this._element.classList.remove("checked");
		  this._input.classList.remove("line_through");
	  } else {
		  this._element.classList.add("checked");
		  this._input.classList.add("line_through");
	  }
	  this._listElement.checked = !this._listElement.checked;

	  const event = new Event(EventType.CHECKED, this._listElement.id);
	  event.dispatch(this._element);
  }

  _initCheckedState() {
	  if (!this._listElement.checked) {
		  this._element.classList.remove("checked");
		  this._input.classList.remove("line_through");
	  } else {
		  this._element.classList.add("checked");
		  this._input.classList.add("line_through");
	  }
  }

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  get listElement() {
    return this._listElement;
  }
}
