import { eventManager as events } from "./eventpubsub";
import sidebar from "./sidebar";
import navbar from "./navbar";
import mainView from "./mainview";

const view = (() => {
  const body = document.querySelector("body");

  const init = () => {
    events.subscribe("project-data", viewProjects);
    events.subscribe("todo-data", viewTodos);
  };
  // projectCollection is projectCollection data passed through "project-data" event
  const viewProjects = projectCollection => {
    body.appendChild(sidebar.load(projectCollection));
    body.appendChild(navbar.load(projectCollection[0].title));
  };
  // projectTodo is passed through data.js loadTodo
  const viewTodos = projectTodos => {
    body.appendChild(mainView.load(projectTodos));
    mainView.loadRightContents(projectTodos[0]);
  };

  // update projects

  return { init };
})();

export default view;
