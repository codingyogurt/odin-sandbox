import { eventManager as events } from "./eventpubsub";
import {format} from "date-fns";

// todo item object factory
const todoFactory = (title, desc, date, prior = false, done = false) => {
  return { title, desc, date, prior, done };
};

// todo project object factory
const projectFactory = (title, todos) => {
  return { title, todos };
};

const data = (() => {
  let projectCollection = [];
  let activeProject;

  // sample data
  const d = format(new Date(), "MMMM dd, yyyy");
  const todo1 = todoFactory(
    "Feed the cat sample",
    "Feed the cat tonight sample",
    d,
    false,
    true
  );
  const todo2 = todoFactory(
    "Feed the cat sample1",
    "Feed the cat tonight sample1",
    d,
    false
  );
  const todo3 = todoFactory(
    "Done with activating a Todo",
    "Not that simple",
    d,
    false
  )

  const prj1 = projectFactory("Default Project", [todo1, todo2]);
  const prj2 = projectFactory("Project 1", [todo1, todo2, todo3]);
  

  projectCollection.push(prj1);
  projectCollection.push(prj2);
  activeProject = projectCollection[0];

  // initializes all subscribers
  const init = () => {
    events.subscribe("activate-project", setActiveProject);
    events.subscribe("add-project", addProject);
    events.subscribe("delete-project", delProject);
    events.subscribe("edit-project", editProject);
    events.subscribe("add-todo", addTodo);
    events.subscribe("delete-todo", delTodo);
    events.subscribe("edit-todo", editTodo);
  };

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
  };

  const delProject = prjTitle => {
    for (let key in projectCollection) {
      if (projectCollection[key].title === prjTitle) {
        projectCollection.splice(key, 1);
      }
    }
    // set back to default project
    setActiveProject(projectCollection[0]);
  };

  const editProject = prjObj => {
    delProject(prjObj.title);
    addProject(prjObj);
    setActiveProject(prjObj.title);
  };

  const addTodo = todoObj => {
    activeProject.todos.push(todoObj);
    loadTodos();
  };

  const delTodo = todoTitle => {
    for (let key in activeProject.todos) {
      if (activeProject.todos[key].title === todoTitle) {
        activeProject.todos.splice(key, 1);
      }
    }
    loadTodos();
  };

  const editTodo = todoObj => {
    delTodo(todoObj.title);
    addTodo(todoObj);
    loadTodos();
  };

  return { init };
})();

export default data;
