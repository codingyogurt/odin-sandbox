/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventpubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventpubsub */ \"./src/eventpubsub.js\");\n\n\n// todo item object factory\nconst todoFactory = (title, desc, date, prior = false, done = false) => {\n  return { title, desc, date, prior, done };\n};\n\n// todo project object factory\nconst projectFactory = (title, todos) => {\n  return { title, todos };\n};\n\nconst data = (() => {\n  let projectCollection = [];\n  let activeProject;\n\n  // sample data\n  const date = new Date();\n  const todo1 = todoFactory(\n    \"Feed the cat sample\",\n    \"Feed the cat tonight sample\",\n    date.getDate(),\n    false,\n    true\n  );\n  const todo2 = todoFactory(\n    \"Feed the cat sample1\",\n    \"Feed the cat tonight sample1\",\n    date.getDate(),\n    false\n  );\n  const prj1 = projectFactory(\"Default Project\", [todo1, todo2]);\n\n  projectCollection.push(prj1);\n  activeProject = projectCollection[0];\n\n  // initializes all subscribers\n  const init = () => {\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"activate-project\", setActiveProject);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"add-project\", addProject);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"delete-project\", delProject);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"edit-project\", editProject);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"add-todo\", addTodo);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"delete-todo\", delTodo);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"edit-todo\", editTodo);\n  };\n\n  const setActiveProject = prjTitle => {\n    // find project object in the collections and set as active\n    for (let key in projectCollection) {\n      if (projectCollection[key].projTitle === prjTitle) {\n        activeProject = projectCollection[key];\n      }\n    }\n\n    // load projects\n    loadProjects();\n    // load todos\n    loadTodos();\n  };\n\n  const loadProjects = () => {\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].publish(\"project-data\", projectCollection);\n  };\n\n  const loadTodos = () => {\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].publish(\"todo-data\", activeProject.todos);\n  };\n\n  const addProject = prjObj => {\n    projectCollection.push(prjObj);\n    setActiveProject(prjObj.title);\n  };\n\n  const delProject = prjTitle => {\n    for (let key in projectCollection) {\n      if (projectCollection[key].title === prjTitle) {\n        projectCollection.splice(key, 1);\n      }\n    }\n    // set back to default project\n    setActiveProject(projectCollection[0]);\n  };\n\n  const editProject = prjObj => {\n    delProject(prjObj.title);\n    addProject(prjObj);\n    setActiveProject(prjObj.title);\n  };\n\n  const addTodo = todoObj => {\n    activeProject.todos.push(todoObj);\n    loadTodos();\n  };\n\n  const delTodo = todoTitle => {\n    for (let key in activeProject.todos) {\n      if (activeProject.todos[key].title === todoTitle) {\n        activeProject.todos.splice(key, 1);\n      }\n    }\n    loadTodos();\n  };\n\n  const editTodo = todoObj => {\n    delTodo(todoObj.title);\n    addTodo(todoObj);\n    loadTodos();\n  };\n\n  return { init };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (data);\n\n\n//# sourceURL=webpack:///./src/data.js?");

/***/ }),

/***/ "./src/eventpubsub.js":
/*!****************************!*\
  !*** ./src/eventpubsub.js ***!
  \****************************/
/*! exports provided: eventManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"eventManager\", function() { return eventManager; });\n// Event Object\n// eventName = event name, call for the event\n// handler = function that handles the event or\n// can be data passed\nconst eventFactory = (eventName, handler) => {\n  return { eventName, handler };\n};\n\nconst eventManager = (() => {\n  // contains all events\n  let eventsCollection = [];\n\n  // adds event to the collection of event.\n  const subscribe = (eventNameStr, eventFunction) => {\n    // if eventName already exist, change its handler to current function\n    for (let key in eventsCollection) {\n      if (eventsCollection[key].eventName === eventNameStr) {\n        eventsCollection[key].handler = eventFunction;\n        console.log(\"key exist replacing\");\n        return;\n      }\n    }\n\n    // else add new event to the collection\n    const newEvent = eventFactory(eventNameStr, eventFunction);\n    eventsCollection.push(newEvent);\n    console.log(\"added new key\");\n  };\n\n  // fires a certain event in the collection of events\n  const publish = (eventNameStr, dataToPass) => {\n    // run the handler if found\n    for (let key in eventsCollection) {\n      if (eventsCollection[key].eventName === eventNameStr) {\n        eventsCollection[key].handler(dataToPass);\n        return;\n      }\n    }\n    // if event is not found\n    console.log(\"Event \" + eventNameStr + \" not found\");\n  };\n\n  return { subscribe, publish };\n})();\n\n\n\n\n//# sourceURL=webpack:///./src/eventpubsub.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventpubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventpubsub */ \"./src/eventpubsub.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./src/view.js\");\n\n\n\n\n// load all data init\n\nconst initialize = () => {\n  _data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n  _view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\n  _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].publish(\"activate-project\", \"Default Project\");\n};\n\ninitialize();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mainview.js":
/*!*************************!*\
  !*** ./src/mainview.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst mainView = (() => {\n  const container = document.createElement(\"div\");\n  container.id = \"container\";\n\n  // create left element with form, form add todo and list todos\n  const loadLeft = projectTodos => {\n    const left = document.createElement(\"div\");\n    left.id = \"left\";\n    left.innerHTML = \"\";\n\n    // create todo form element head for left\n    const todoForm = document.createElement(\"div\");\n    todoForm.id = \"todo-form\";\n\n    const p = document.createElement(\"p\");\n    p.textContent = \"Todos\";\n\n    const form = document.createElement(\"form\");\n    form.action = \"#\";\n\n    const input = document.createElement(\"input\");\n    input.text = \"text\";\n    input.name = \"todo\";\n    input.id = \"todo\";\n    input.placeholder = \"Add todo\";\n\n    const button = document.createElement(\"button\");\n    button.id = \"add-todo\";\n    button.className = \"fas fa-plus-circle\";\n\n    // append all objects in order\n    form.appendChild(input);\n    form.appendChild(button);\n\n    todoForm.appendChild(p);\n    todoForm.appendChild(form);\n\n    // create todo list element\n    left.appendChild(todoForm);\n\n    left.appendChild(loadTodos(projectTodos));\n\n    // append to container\n    container.appendChild(left);\n  };\n\n  // function for creating todo items in the list based on the current project selected\n  const loadTodos = projectTodos => {\n    const todoList = document.createElement(\"div\");\n    todoList.id = \"todo-list\";\n    projectTodos.forEach(todo => {\n      const todoItem = document.createElement(\"div\");\n      todoItem.className = \"todo-item\";\n\n      const checkbox = document.createElement(\"input\");\n      checkbox.type = \"checkbox\";\n      checkbox.checked = todo.done;\n\n      const pTitle = document.createElement(\"p\");\n      pTitle.textContent = todo.title;\n\n      const pDate = document.createElement(\"p\");\n      pDate.textContent = todo.date;\n\n      todoItem.appendChild(checkbox);\n      todoItem.appendChild(pTitle);\n      todoItem.appendChild(pDate);\n\n      todoList.appendChild(todoItem);\n    });\n\n    return todoList;\n  };\n\n  // loads the right element. element for an item view\n  const loadRight = projectTodos => {\n    const right = document.createElement(\"div\");\n    right.id = \"right\";\n    right.innerHTML = \"\";\n\n    // todo option on top of right\n    const todoOption = document.createElement(\"div\");\n    todoOption.id = \"todo-option\";\n\n    const checkbox = document.createElement(\"input\");\n    checkbox.type = \"checkbox\";\n    checkbox.id = \"todo-checked\";\n\n    const pDate = document.createElement(\"p\");\n    pDate.id = \"todo-date\";\n\n    const div = document.createElement(\"div\");\n\n    const btnImp = document.createElement(\"button\");\n    btnImp.className = \"fas fa-flag\";\n    btnImp.id = \"todo-imp\";\n\n    const btnDel = document.createElement(\"button\");\n    btnDel.className = \"fas fa-trash\";\n    btnDel.id = \"todo-del\";\n\n    const btnSave = document.createElement(\"button\");\n    btnSave.className = \"fas fa-save\";\n    btnSave.id = \"todo-save\";\n\n    // append to right\n\n    todoOption.appendChild(checkbox);\n    todoOption.appendChild(pDate);\n    div.appendChild(btnImp);\n    div.appendChild(btnDel);\n    div.appendChild(btnSave);\n    todoOption.appendChild(div);\n    right.appendChild(todoOption);\n\n    // todo contents\n\n    const todoContent = document.createElement(\"div\");\n    todoContent.id = \"todo-content\";\n\n    const title = document.createElement(\"input\");\n    title.type = \"text\";\n    title.id = \"todo-title\";\n\n    const content = document.createElement(\"textarea\");\n    content.id = \"todo-textarea\";\n\n    // append to right\n\n    todoContent.appendChild(title);\n    todoContent.appendChild(content);\n    right.appendChild(todoContent);\n\n    // append right to container\n    container.appendChild(right);\n  };\n\n  // load todoItem details to the elements\n  const loadRightContents = todoItem => {\n    // I used query based on loaded items\n    document.querySelector(\"#todo-checked\").checked = todoItem.done;\n    document.querySelector(\"#todo-date\").textContent = todoItem.date;\n    document.querySelector(\"#todo-title\").value = todoItem.title;\n    document.querySelector(\"#todo-textarea\").textContent = todoItem.desc;\n  };\n\n  const load = projectTodos => {\n    loadLeft(projectTodos);\n    loadRight(projectTodos);\n\n    return container;\n  };\n\n  return { load, loadRightContents };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mainView);\n\n\n//# sourceURL=webpack:///./src/mainview.js?");

/***/ }),

/***/ "./src/navbar.js":
/*!***********************!*\
  !*** ./src/navbar.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst navbar = (() => {\n  const div = document.createElement(\"div\");\n  div.id = \"nav-bar\";\n\n  const i = document.createElement(\"i\");\n  i.className = \"fas fa-tasks\";\n\n  const h2 = document.createElement(\"h2\");\n\n  const divTitle = document.createElement(\"div\");\n  divTitle.id = \"title\";\n\n  divTitle.appendChild(i);\n\n  const load = text => {\n    h2.textContent = text;\n    divTitle.appendChild(h2);\n    div.appendChild(divTitle);\n\n    return div;\n  };\n\n  return { load };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (navbar);\n\n\n//# sourceURL=webpack:///./src/navbar.js?");

/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst sidebar = (() => {\n  const sidebarElement = document.createElement(\"div\");\n  sidebarElement.id = \"side-bar\";\n\n  // project list element\n  const projectListElement = document.createElement(\"div\");\n  projectListElement.id = \"project-list\";\n\n  // load the header elements\n  const load = projectList => {\n    // clear sidebar element\n    sidebarElement.innerHTML = \"\";\n    // logo element\n    const logo = document.createElement(\"div\");\n    logo.id = \"logo\";\n    const i = document.createElement(\"i\");\n    i.className = \"fas fa-clipboard-check\";\n    logo.appendChild(i);\n    const h1 = document.createElement(\"h1\");\n    h1.textContent = \"TODO APP\";\n    logo.appendChild(i);\n    logo.appendChild(h1);\n\n    loadProjects(projectList);\n\n    sidebarElement.appendChild(logo);\n    sidebarElement.appendChild(projectListElement);\n\n    return sidebarElement;\n  };\n\n  // load the items elements returns the element itself\n  const loadProjects = projectList => {\n    // clear projectListElement\n    projectListElement.innerHTML = \"\";\n    // project title element\n    const projectTitle = document.createElement(\"div\");\n    projectTitle.id = \"project-title\";\n\n    const pTitle = document.createElement(\"p\");\n    pTitle.textContent = \"PROJECTS\";\n    projectTitle.appendChild(pTitle);\n\n    const buttonTitle = document.createElement(\"button\");\n    buttonTitle.id = \"add-prj\";\n    buttonTitle.className = \"fas fa-plus\";\n    projectTitle.appendChild(buttonTitle);\n\n    projectListElement.appendChild(projectTitle);\n\n    // projects items\n    projectList.forEach(project => {\n      const projectItem = document.createElement(\"div\");\n      projectItem.className = \"project-item\";\n\n      const p = document.createElement(\"p\");\n      p.textContent = project.title;\n      projectItem.appendChild(p);\n\n      const p1 = document.createElement(\"p\");\n      p1.textContent = `(${project.todos.length})`;\n      projectItem.appendChild(p1);\n\n      const button = document.createElement(\"button\");\n      button.className = \"del-prj fas fa-trash\";\n      projectItem.appendChild(button);\n      // append one by one to project list element\n      projectListElement.appendChild(projectItem);\n    });\n  };\n\n  return { load, loadProjects };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (sidebar);\n\n\n//# sourceURL=webpack:///./src/sidebar.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _eventpubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventpubsub */ \"./src/eventpubsub.js\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar */ \"./src/sidebar.js\");\n/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar */ \"./src/navbar.js\");\n/* harmony import */ var _mainview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mainview */ \"./src/mainview.js\");\n\n\n\n\n\nconst view = (() => {\n  const body = document.querySelector(\"body\");\n\n  const init = () => {\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"project-data\", viewProjects);\n    _eventpubsub__WEBPACK_IMPORTED_MODULE_0__[\"eventManager\"].subscribe(\"todo-data\", viewTodos);\n  };\n  // projectCollection is projectCollection data passed through \"project-data\" event\n  const viewProjects = projectCollection => {\n    body.appendChild(_sidebar__WEBPACK_IMPORTED_MODULE_1__[\"default\"].load(projectCollection));\n    body.appendChild(_navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"].load(projectCollection[0].title));\n  };\n  // projectTodo is passed through data.js loadTodo\n  const viewTodos = projectTodos => {\n    body.appendChild(_mainview__WEBPACK_IMPORTED_MODULE_3__[\"default\"].load(projectTodos));\n    _mainview__WEBPACK_IMPORTED_MODULE_3__[\"default\"].loadRightContents(projectTodos[0]);\n  };\n\n  // update projects\n\n  return { init };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (view);\n\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ });