import { eventManager as events } from "./eventpubsub";

// todo item object factory
const todoFactory = (title, desc, due, prior, project) => {
  return { title, desc, due, prior, project };
};

// todo project object factory
const projectFactory = (title, todos) => {
  return { title, todos };
};

const data = (() => {
  let projectCollection = [];
  let activeProject;

  const setActiveProject = prjTitle => {
    // find project object in the collections and set as active
    for (let key in projectCollection) {
      if (projectCollection[key].projTitle === prjTitle) {
        activeProject = projectCollection[key];
      }
    }
    // load projects
    loadProjects();
    // load todos
    loadTodos();

    events.subscribe("activate-project", setActiveProject);
  };

  const init = () => {
    // calls necessary functions
  };

  const loadProjects = () => {
    events.publish("project-data", projectCollection);
  };

  const loadTodos = () => {
    events.publish("todo-data", activeProject.todos);
  };

  const addProject = prjObj => {
    projectCollection.push(prjObj);
    setActiveProject(prjObj.title);
    events.subscribe("add-project", addProject);
  };

  const delProject = prjTitle => {
    for (let key in projectCollection) {
      if (projectCollection[key].title === prjTitle) {
        projectCollection.splice(key, 1);
      }
    }
    // set back to default project
    setActiveProject(projectCollection[0]);
    events.subscribe("delete-project", delProject);
  };

  const editProject = prjObj => {
    delProject(prjObj.title);
    addProject(prjObj);
    setActiveProject(prjObj.title);
    events.subscribe("edit-project", editProject);
  };

  const addTodo = todoObj => {
    activeProject.todos.push(todoObj);
    loadTodos();
    events.subscribe("add-todo", addTodo);
  };

  const delTodo = todoTitle => {
    for (let key in activeProject.todos) {
      if (activeProject.todos[key].title === todoTitle) {
        activeProject.todos.splice(key, 1);
      }
    }
    loadTodos();
    events.subscribe("delete-todo", delTodo);
  };

  const editTodo = todoObj => {
    delTodo(todoObj.title);
    addTodo(todoObj);
    loadTodos();
    subscribe("edit-todo", editTodo);
  };
})();
