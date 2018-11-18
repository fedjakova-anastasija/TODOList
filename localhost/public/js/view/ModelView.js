'use strict';

class ModelView {
  constructor(model, viewsFactory) {
    this._viewsFactory = viewsFactory;

    this._element = viewsFactory.createElement("div");
    this._element.id = "model";

    this._boardsViews = [];

    this._windowEmpty = viewsFactory.createElement("div");
    this._windowEmpty.className = "window_delete_board";
    this._windowEmpty.id = "modal";
    this._element.appendChild(this._windowEmpty);

    this._empty = viewsFactory.createElement("div");
    this._empty.className = "empty";
    this._windowEmpty.appendChild(this._empty);

    this._textEmpty = viewsFactory.createElement("div");
    this._textEmpty.className = "text_empty";
    this._textEmpty.innerHTML = "Извините, данная доска уже очищена!";
    this._empty.appendChild(this._textEmpty);

    this._okEmpty = viewsFactory.createElement("div");
    this._okEmpty.className = "button_ok";
    this._okEmpty.innerHTML = "OK";
    this._empty.appendChild(this._okEmpty);

    const showModalWindowEmpty = this._windowEmpty;

    this._windowDelete = viewsFactory.createElement("div");
    this._windowDelete.className = "window";
    this._windowDelete.id = "modal";
    this._element.appendChild(this._windowDelete);

    this._delete = viewsFactory.createElement("div");
    this._delete.className = "empty";
    this._windowDelete.appendChild(this._delete);

    this._danger = viewsFactory.createElement("div");
    this._danger.className = "danger";
    this._delete.appendChild(this._danger);


    this._textDelete = viewsFactory.createElement("div");
    this._textDelete.className = "text_delete";
    this._textDelete.innerHTML = "Вы уверены, что хотите удалить данную доску?";
    this._delete.appendChild(this._textDelete);

    this._okDelete = viewsFactory.createElement("div");
    this._okDelete.className = "button_ok";
    this._okDelete.innerHTML = "OK";
    this._delete.appendChild(this._okDelete);

    this._cancel = viewsFactory.createElement("div");
    this._cancel.className = "button_cancel";
    this._cancel.innerHTML = "Отмена";
    this._delete.appendChild(this._cancel);

    const showModalWindowDelete = this._windowDelete;

    function OpenModal() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindowDelete.classList.add('opacity_visible');
        thisPtr._delete.classList.add("window_empty");
        thisPtr._windowDelete.style.transition = "1s";
      }, 500);
      showModalWindowDelete.classList.add('open_block');
    }

    function OpenModalEmpty() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindowEmpty.classList.add('opacity_visible');
        thisPtr._empty.classList.add("window_empty");
        thisPtr._windowEmpty.style.transition = "1s";
      }, 500);
      showModalWindowEmpty.classList.add('open_block');
      thisPtr._okEmpty.style.marginLeft = "160px";
    }

    function CloseModal() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindowDelete.classList.remove('opacity_visible');
        showModalWindowEmpty.classList.remove('opacity_visible');
        thisPtr._delete.classList.remove("window_empty");
        thisPtr._empty.classList.remove("window_empty");
        thisPtr._windowDelete.style.transition = "0s";
        thisPtr._windowEmpty.style.transition = "0s";
      }, 50);
      setTimeout(function () {
        showModalWindowDelete.classList.remove('open_block');
        showModalWindowEmpty.classList.remove('open_block');
      }, 500);
    }

    const thisPtr = this;

    this._headerView = this._viewsFactory.createHeaderView();
    this._headerView.element.addEventListener(EventType.SELECT_BOARD_EVENT, function (event) {
      thisPtr.showBoardWithId(event.detail);
    }, false);

    this._element.appendChild(this._headerView.element);

    this._headerView.element.addEventListener(EventType.DELETE_BOARD, function (event) {
      const id = event.detail;
      if (model.boards.length == 1) {
        const board = model.boards[0];
        const countOfLists = board.lists.length;
        const countOfNotes = board.notes.length;
        const countOfImages = board.images.length;

        if ((countOfLists != 0) || (countOfNotes != 0) || (countOfImages != 0)) {
          OpenModal();
          thisPtr._okDelete.onclick = function () {
            CloseModal();
            board.lists.splice(0, countOfLists);
            board.notes.splice(0, countOfNotes);
            board.images.splice(0, countOfImages);
            thisPtr._boardsViews[0].redraw();
          };
          thisPtr._cancel.onclick = function () {
            CloseModal();
          }
        } else {
          OpenModalEmpty();
          thisPtr._okEmpty.onclick = function () {
            CloseModal();
          }
        }
      } else {
        OpenModal();
        thisPtr._okDelete.onclick = function () {
          CloseModal();
          const view = thisPtr._getBoardViewById(id);
          const index = model.boards.indexOf(view.board);
          model.boards.splice(index, 1);
          thisPtr._boardsViews.splice(index, 1);

          thisPtr._headerView.removeHeader(id);

          if (thisPtr._element.contains(view.element)) {
            thisPtr._element.removeChild(view.element);
            if (model.boards.length > 0) {
              const nextIndex = index == 0 ? 0 : index - 1;
              thisPtr.showBoardWithId(model.boards[nextIndex].id);
            }
          }
        }
      }
      thisPtr._cancel.onclick = function () {
        CloseModal();
      }
    }, false);

    this._init(model);

    window.onresize = function (event) {
      thisPtr.currentBoardView.drawLines();
    };
  }

  _init(model) {
    for (let i = 0; i < model.boards.length; ++i) {
      this.addBoardView(model.boards[i])
    }
    this.showBoardWithId(this._boardsViews[0].id);
  }

  addBoardView(board) {
    const boardView = this._viewsFactory.createBoardView(board);
    this._element.appendChild(boardView.element);
    this._boardsViews.push(boardView);

    this._headerView.createBoardHeaderView(board);
  }

  showBoardWithId(id) {
    for (let i = 0; i < this._boardsViews.length; ++i) {
      const boardView = this._boardsViews[i];
      this._showBoardView(boardView, (boardView.id == id));
    }
    this._headerView.selectHeader(id);
    this.currentBoardView.drawLines();
  }

  _showBoardView(boardView, show) {
    boardView.redraw();
    if (show) {
      this._element.appendChild(boardView.element);
    }
    else {
      if (this._element.contains(boardView.element)) {
        this._element.removeChild(boardView.element);
      }
    }
  }

  _getBoardViewById(id) {
    for (const view of this._boardsViews) {
      if (view.id == id) {
        return view;
      }
    }
    return null;
  }

  get currentBoardView() {
    for (let i = 0; i < this._boardsViews.length; ++i) {
      const boardView = this._boardsViews[i];
      if (this._element.contains(boardView.element)) {
        return boardView;
      }
    }
    return null;
  }

  get element() {
    return this._element;
  }
}