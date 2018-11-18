'use strict';

class NavigationView {
  constructor(modelView, viewsFactory) {
    this._viewsFactory = viewsFactory;

    this._element = viewsFactory.createElement("div");
    this._element.className = "block_menu";

    this._navigation = viewsFactory.createElement("div");
    this._navigation.className = "navigation";
    this._element.appendChild(this._navigation);

    this._menu = viewsFactory.createElement("div");
    this._menu.textContent = "Меню";
    this._menu.className = "menu";
    this._navigation.appendChild(this._menu);

    this._navigation.onmousemove = function () {
      thisPtr._ul.classList.add("open_block_ul")
    };

    this._navigation.onmouseout = function () {
      thisPtr._ul.classList.remove("open_block_ul")
    };

    this._ul = viewsFactory.createElement("ul");
    this._ul.className = "ul";
    this._navigation.appendChild(this._ul);

    this._buttonNewList = viewsFactory.createElement("li");
    this._buttonNewList.textContent = "Создать новый список";
    this._buttonNewList.className = "new";
    this._ul.appendChild(this._buttonNewList);

    this._buttonNewList.onclick = function () {
      thisPtr._textBoard.style.display = "none";
      thisPtr._textNote.style.display = "none";
      thisPtr._textList.style.display = "block";
      OpenModal();
      thisPtr._ok.onclick = function () {

        const title = thisPtr._input.value;
        if (title != '') {
          const event = new Event(EventType.CLICK_ADD_LIST, {title});
          event.dispatch(document);
          CloseModal();
          thisPtr._input.value = "";
        } else {
          CloseModal();
        }
      };
      thisPtr._cancel.onclick = function () {
        CloseModal();
        thisPtr._input.value = "";
      }
    };

    this._buttonNewNote = viewsFactory.createElement("li");
    this._buttonNewNote.textContent = "Создать новую заметку";
    this._buttonNewNote.className = "new";
    this._ul.appendChild(this._buttonNewNote);

    this._buttonNewNote.onclick = function () {
      thisPtr._textList.style.display = "none";
      thisPtr._textBoard.style.display = "none";
      thisPtr._textNote.style.display = "block";

      OpenModal();
      thisPtr._ok.onclick = function () {

        const title = thisPtr._input.value;
        if (title != '') {
          const event = new Event(EventType.CLICK_ADD_NOTE, {title});
          event.dispatch(document);
          CloseModal();
          thisPtr._input.value = "";
        } else {
          CloseModal();
        }
      };
      thisPtr._cancel.onclick = function () {
        CloseModal();
        thisPtr._input.value = "";
      }
    };

    this._buttonNewImage = viewsFactory.createElement("input");
    this._buttonNewImage.className = "new";
    this._buttonNewImage.id = "button_new_image";
    this._buttonNewImage.type = "file";
    this._buttonNewImage.accept = "image/!*";
    this._ul.appendChild(this._buttonNewImage);

    this._visible = viewsFactory.createElement("li");
    this._visible.textContent = "Добавить изображение";
    this._visible.className = "new";
    this._visible.id = "visible";
    this._ul.appendChild(this._visible);

    const thisPtr = this;
    this._buttonNewImage.onchange = function () {
      const fileread = new FileReader();
      fileread.onload = function () {
        const dataURL = fileread.result;
        const event = new Event(EventType.CLICK_ADD_IMAGE, dataURL);
        event.dispatch(document);
      };
      fileread.readAsDataURL(thisPtr._buttonNewImage.files[0]);
    };

    this._buttonNewBoard = viewsFactory.createElement("div");
    this._buttonNewBoard.className = "button_board_new";
    this._buttonNewBoard.type = "button";
    this._element.appendChild(this._buttonNewBoard);

    this._windowTitle = viewsFactory.createElement("div");
    this._windowTitle.className = "window";
    this._windowTitle.id = "modal";
    this._element.appendChild(this._windowTitle);

    this._title = viewsFactory.createElement("div");
    this._title.className = "block_title";
    this._windowTitle.appendChild(this._title);

    this._textBoard = viewsFactory.createElement("div");
    this._textBoard.className = "text_title";
    this._textBoard.innerHTML = "Введите заголовок доски, пожалуйста:";
    this._title.appendChild(this._textBoard);

    this._textList = viewsFactory.createElement("div");
    this._textList.className = "text_title";
    this._textList.innerHTML = "Введите заголовок списка, пожалуйста:";
    this._title.appendChild(this._textList);

    this._textNote = viewsFactory.createElement("div");
    this._textNote.className = "text_title";
    this._textNote.innerHTML = "Введите заголовок заметки, пожалуйста:";
    this._title.appendChild(this._textNote);

    this._input = viewsFactory.createElement("input");
    this._input.className = "text_input";
    this._title.appendChild(this._input);

    this._ok = viewsFactory.createElement("div");
    this._ok.className = "button_ok";
    this._ok.innerHTML = "OK";
    this._title.appendChild(this._ok);

    this._cancel = viewsFactory.createElement("div");
    this._cancel.className = "button_cancel";
    this._cancel.innerHTML = "Отмена";
    this._title.appendChild(this._cancel);

    const showModalWindow = this._windowTitle;

    function OpenModal() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindow.classList.add('opacity_visible');
        thisPtr._title.classList.add("window_empty");
        thisPtr._windowTitle.style.transition = "1s";
      }, 500);
      showModalWindow.classList.add('open_block');
    }

    function CloseModal() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindow.classList.remove('opacity_visible');
        thisPtr._title.classList.remove("window_empty");
        thisPtr._windowTitle.style.transition = "0s";
      }, 50);
      setTimeout(function () {
        showModalWindow.classList.remove('open_block');
      }, 500);
    }

    this._buttonNewBoard.onclick = function () {
      thisPtr._textList.style.display = "none";
      thisPtr._textNote.style.display = "none";
      thisPtr._textBoard.style.display = "block";
      OpenModal();
      thisPtr._ok.onclick = function () {

        const title = thisPtr._input.value;
        if (title != '') {
          const event = new Event(EventType.CLICK_ADD_BOARD, {title});
          event.dispatch(document);
          CloseModal();
          thisPtr._input.value = "";
        } else {
          CloseModal();
        }
      };
      thisPtr._cancel.onclick = function () {
        CloseModal();
        thisPtr._input.value = "";
      }
    };

   /* this._buttonPrintAll = viewsFactory.createElement("li");
    this._buttonPrintAll.className = "button_print";
    this._buttonPrintAll.type = "button";
    this._buttonPrintAll.textContent = "Полная версия для печати";
    this._ul.appendChild(this._buttonPrintAll);

    this._buttonPrintAll.onclick = function () {
      window.open("TODO_List_printed.html", "_blank");
      window.printedBoards = window.model.boards;
    };

    this._buttonPrint = viewsFactory.createElement("li");
    this._buttonPrint.className = "new";
    this._buttonPrint.type = "button";
    this._buttonPrint.textContent = "Печать одной доски";
    this._ul.appendChild(this._buttonPrint);

    this._buttonPrint.onclick = function () {
      window.open("TODO_List_printed.html", "_blank");
      const currentBoardView = modelView.currentBoardView;
      const id = currentBoardView.id;
      const boards = window.model.boards;
      let curentBoard = null;
      for (const board of boards) {
        if (board.id == id) {
          curentBoard = board;
        }
      }
      if (curentBoard) {
        window.printedBoards = [curentBoard];
      }
    };*/

    let json = document.getElementById("boardJson").value;
    json = JSON.parse(json);
    this._about = viewsFactory.createElement("div");
    this._about.textContent = json._about.name.charAt(0) + json._about.lastName.charAt(0);
    this._about.className = "about";
    this._element.appendChild(this._about);

    this._window = viewsFactory.createElement("div");
    this._window.className = "window";
    this._window.id = "modal";
    this._element.appendChild(this._window);

    this._information = viewsFactory.createElement("div");
    this._information.className = "information";
    this._window.appendChild(this._information);

    this._photo = viewsFactory.createElement("div");
    this._photo.className = "photo";
    this._information.appendChild(this._photo);

    this._newImage = viewsFactory.createElement("input");
    this._newImage.id = "new_image";
    this._newImage.type = "file";
    this._newImage.accept = "image/!*";
    this._photo.appendChild(this._newImage);

    let imageView = new Image();
    imageView.style.opacity = 0;

    imageView.onload = function () {
      let width = imageView.getBoundingClientRect().width;
      let height = imageView.getBoundingClientRect().height;

      let MAX_WIDTH = 200;
      let MAX_HEIGHT = 200;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      imageView.width = Math.floor(width);
      imageView.height = Math.floor(height);

      thisPtr._photo.style.width = Math.floor(width) + "px";
      thisPtr._photo.style.height = Math.floor(height) + "px";
      imageView.style.opacity = 1;
      thisPtr._photoText.style.display = "none";
    };
    this._photo.appendChild(imageView);

    this._photoText = viewsFactory.createElement("div");
    this._photoText.className = "text_photo";
    this._photoText.innerHTML = "Добавить фотографию";
    this._photo.appendChild(this._photoText);

    this._newImage.onchange = function () {
      const fileread = new FileReader();
      fileread.onload = function () {
        const dataURL = fileread.result;
        const event = new Event(EventType.ADD_INFO_IMAGE, dataURL);
        event.dispatch(document);
        imageView.src = dataURL;
      };
      fileread.readAsDataURL(thisPtr._newImage.files[0]);
    };


    this._nameBlock = viewsFactory.createElement("div");
    this._nameBlock.className = "name_block";
    this._nameBlock.innerHTML = "Имя:";
    this._information.appendChild(this._nameBlock);

    this._name = viewsFactory.createElement("input");
    this._name.className = "name";
    this._nameBlock.appendChild(this._name);

    this._lastNameeBlock = viewsFactory.createElement("div");
    this._lastNameeBlock.className = "last_name_block";
    this._lastNameeBlock.innerHTML = "Фамилия:";
    this._information.appendChild(this._lastNameeBlock);

    this._lastName = viewsFactory.createElement("input");
    this._lastName.className = "last_name";
    this._lastNameeBlock.appendChild(this._lastName);

    this._mailBlock = viewsFactory.createElement("div");
    this._mailBlock.className = "mail_block";
    this._mailBlock.innerHTML = "E-mail:";
    this._information.appendChild(this._mailBlock);

    this._mail = viewsFactory.createElement("input");
    this._mail.className = "mail";
    this._mailBlock.appendChild(this._mail);

    this._messageBlock = viewsFactory.createElement("div");
    this._messageBlock.className = "message_block";
    this._messageBlock.innerHTML = "Немного информации о себе:";
    this._information.appendChild(this._messageBlock);

    this._message = viewsFactory.createElement("input");
    this._message.className = "message";
    this._messageBlock.appendChild(this._message);

    this._okInformation = viewsFactory.createElement("div");
    this._okInformation.className = "button_ok_information";
    this._okInformation.innerHTML = "OK";
    this._information.appendChild(this._okInformation);

    this._cancelInformation = viewsFactory.createElement("div");
    this._cancelInformation.className = "button_cancel_information";
    this._cancelInformation.innerHTML = "Отмена";
    this._information.appendChild(this._cancelInformation);

    const showModalWindowInformation = this._window;

    function OpenModalInformation() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindowInformation.classList.add('opacity_visible');
        thisPtr._information.classList.add("window_empty");
        thisPtr._window.style.transition = "1s";

        //init
        thisPtr._name.value = model.about.name;
        thisPtr._lastName.value = model.about.lastName;
        thisPtr._mail.value = model.about.email;
        thisPtr._message.value = model.about.info;
        imageView.src = model.about.img;
      }, 500);
      showModalWindowInformation.classList.add('open_block');
    }

    function CloseModalInformation() {
      event.preventDefault();
      setTimeout(function () {
        showModalWindowInformation.classList.remove('opacity_visible');
        thisPtr._information.classList.remove("window_empty");
        thisPtr._window.style.transition = "0s";
      }, 50);
      setTimeout(function () {
        showModalWindowInformation.classList.remove('open_block');
      }, 500);
    }


    this._about.onclick = function () {
      OpenModalInformation();
      thisPtr._okInformation.onclick = function () {

        model.about.name = thisPtr._name.value;
        model.about.lastName = thisPtr._lastName.value;
        model.about.email = thisPtr._mail.value;
        model.about.info = thisPtr._message.value;
        model.about.img = imageView.src;
        thisPtr._about.textContent = model.about.name.charAt(0) +  model.about.lastName.charAt(0);
        CloseModalInformation();
      };

      thisPtr._cancelInformation.onclick = function () {
        CloseModalInformation();
      }
    }
  }

  get element() {
    return this._element;
  }
}