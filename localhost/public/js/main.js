const COLUMN_COUNT = 3;
const COLUMN_PADDING = 10;

function initialize() {
  let json = document.getElementById("boardJson").value;
  const contentDiv = document.getElementById("content");

  const viewsFactory = new ViewsFactory();
  const itemsFactory = new ItemsFactory();

  const model = itemsFactory.createModel();
  window.model = model;

  initTestModel(model, itemsFactory, json);

  const modelView = viewsFactory.createModelView(model);
  contentDiv.appendChild(modelView.element);

  const navigationView = viewsFactory.createNavigationView(modelView);
  contentDiv.appendChild(navigationView.element);

  //board
  modelView.element.addEventListener(EventType.ADD_BOARD, function (event) {
    const board = event.detail;
    modelView.addBoardView(board);
    modelView.showBoardWithId(board.id);
  }, false);

  document.addEventListener(EventType.CLICK_ADD_BOARD, function (event) {
    const metainfo = event.detail;
    const newBoard = itemsFactory.createBoard(metainfo.title);
    model.boards.push(newBoard);

    const e = new Event(EventType.ADD_BOARD, newBoard);
    e.dispatch(modelView.element);
  }, false);

  //list
  modelView.element.addEventListener(EventType.ADD_LIST, function (event) {
    const list = event.detail;
    modelView.currentBoardView.addListView(list);
  }, false);

  document.addEventListener(EventType.CLICK_ADD_LIST, function (event) {
    const metainfo = event.detail;
    const newList = itemsFactory.createList(metainfo.title);
    modelView.currentBoardView.board.lists.push(newList);

    const e = new Event(EventType.ADD_LIST, newList);
    e.dispatch(modelView.element);
  }, false);

  //note
  modelView.element.addEventListener(EventType.ADD_NOTE, function (event) {
    const note = event.detail;
    modelView.currentBoardView.addNoteView(note);
  }, false);

  document.addEventListener(EventType.CLICK_ADD_NOTE, function (event) {
    const metainfo = event.detail;
    const newNote = itemsFactory.createNote(metainfo.title);
    modelView.currentBoardView.board.notes.push(newNote);

    const e = new Event(EventType.ADD_NOTE, newNote);
    e.dispatch(modelView.element);
  }, false);

  //list_element
  document.addEventListener(EventType.CLICK_ADD_LIST_ELEMENT, function (event) {
    const metainfo = event.detail;
    const newListElement = itemsFactory.createListElement(metainfo.value);
    metainfo.list.elements.push(newListElement);

    const e = new Event(EventType.ADD_LIST_ELEMENT, {element: newListElement, listId: metainfo.list.id});
    e.dispatch(document);
  }, false);

  document.addEventListener(EventType.ADD_LIST_ELEMENT, function (event) {
    const listElement = event.detail.element;
    const listView = modelView.currentBoardView._getListViewById(event.detail.listId);
    listView.addListElementView(listElement);
  }, false);

  //image
  modelView.element.addEventListener(EventType.ADD_IMAGE, function (event) {
    const image = event.detail;
    modelView.currentBoardView.addImageView(image);
  }, false);

  document.addEventListener(EventType.CLICK_ADD_IMAGE, function (event) {
    const path = event.detail;
    const newImage = itemsFactory.createImage(path);
    modelView.currentBoardView.board.images.push(newImage);

    const e = new Event(EventType.ADD_IMAGE, newImage);
    e.dispatch(modelView.element);
  }, false);
}


function initTestModel(model, itemsFactory, json) {
  json = JSON.parse(json);
  model._about.name = json._about.name;
  model._about.lastName = json._about.lastName;
  model._about.info = json._about.info;
  model._about.email = json._about.email;
  model._about.img = json._about.img;

  for (let idBoard in json._boards) {
    model.boards.push(itemsFactory.createBoard(json._boards[idBoard]._title));

    for (let idBoardElement in json._boards[idBoard]._lists) {
      model.boards[idBoard].lists.push(itemsFactory.createList(json._boards[idBoard]._lists[idBoardElement]._title));
      model._boards[idBoard]._lists[idBoardElement]._position = json._boards[idBoard]._lists[idBoardElement]._position;
      for (let idListElement in json._boards[idBoard]._lists[idBoardElement]._elements) {
        model.boards[idBoard].lists[idBoardElement].elements.push(itemsFactory.createListElement(json._boards[idBoard]._lists[idBoardElement]._elements[idListElement]._text));
        model._boards[idBoard]._lists[idBoardElement]._elements[idListElement]._checked = json._boards[idBoard]._lists[idBoardElement]._elements[idListElement]._checked;
      }
    }
    for (let idBoardElement in json._boards[idBoard]._notes) {
      model.boards[idBoard].notes.push(itemsFactory.createNote(json._boards[idBoard]._notes[idBoardElement]._title, json._boards[idBoard]._notes[idBoardElement]._text));
      model._boards[idBoard]._notes[idBoardElement]._position = json._boards[idBoard]._notes[idBoardElement]._position;
    }
    for (let idBoardElement in json._boards[idBoard]._images) {
      model.boards[idBoard].images.push(itemsFactory.createImage(json._boards[idBoard]._images[idBoardElement]._path));
      model._boards[idBoard]._images[idBoardElement]._position = json._boards[idBoard]._images[idBoardElement]._position;
    }
  }
}
