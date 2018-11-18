'use strict';

class ImageView {
  constructor(image, viewsFactory) {
    this._element = viewsFactory.createElement("div");
    this._element.id = "image" + image.id;
    this._element.className = "image";

    this._element.style.position = 'absolute';
    this._element.style.left = image.position.x + 'px';
    this._element.style.top = image.position.y + 'px';

    this._image = image;
    this._id = image.id;

    this._delete = viewsFactory.createElement("input");
    this._delete.type = "button";
    this._delete.className = "delete_image";
    this._element.appendChild(this._delete);

    const thisPtr = this;

    this._delete.onclick = function () {
      const event = new Event(EventType.DELETE_IMAGE, image.id);
      event.dispatch(thisPtr._element);
    };

    this._loupe = viewsFactory.createElement("input");
    this._loupe.type = "button";
    this._loupe.className = "loupe";
    this._loupe.id = "loupe_id";
    this._element.appendChild(this._loupe);

    let imageView = new Image();
    imageView.src = image.path;

    this._window = viewsFactory.createElement("div");
    this._window.className = "window";
    this._window.id = "modal";
    this._element.appendChild(this._window);

    const showModalWindow = this._window;

    function OpenModal() {
      thisPtr._loupe.onclick = function (event) {
        event.preventDefault();
        setTimeout(function () {

          showModalWindow.classList.add('opacity_visible');
          thisPtr._delete.style.display = "none";
          thisPtr._loupe.style.display = "none";
          imageView.classList.add("window_img");
          thisPtr._element.style.boxShadow = "0 1px 3px rgba(0, 0, 0, .13)";
          thisPtr._element.style.backgroundColor = "hsla(0, 0%, 100%, 0)";
        }, 500);
        showModalWindow.classList.add('open_block');
      }
    }

    function CloseModal() {
      thisPtr._window.addEventListener("click", function (event) {
        event.preventDefault();
        setTimeout(function () {
          imageView.style.transition = "1s";
          showModalWindow.classList.remove('opacity_visible');
          imageView.classList.remove("window_img");
          thisPtr._delete.style.display = "block";
          thisPtr._loupe.style.display = "block";
          thisPtr._element.style.boxShadow = "0 1px 3px rgba(0, 0, 0, .13)";
        }, 50);
        setTimeout(function () {
          showModalWindow.classList.remove('open_block');
        }, 500);
      }, false);
    }

    OpenModal();
    CloseModal();

    imageView.onload = function () {
      let width = imageView.getBoundingClientRect().width;
      let height = imageView.getBoundingClientRect().height;

      let MAX_WIDTH = 343;
      let MAX_HEIGHT = 216;

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

      thisPtr._element.style.width = Math.floor(width) + "px";
      thisPtr._element.style.height = Math.floor(height) + "px";
    };

    this._element.appendChild(imageView);

    moveElement(image, this._element);
  }

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  get image() {
    return this._image;
  }
}
