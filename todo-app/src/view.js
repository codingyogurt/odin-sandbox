import { eventManager as events } from "./eventpubsub";
import sidebar from "./sidebar";
import navbar from "./navbar";
import mainView from "./mainview";

const view = (() => {
  const body = document.querySelector("body");

  const init = () => {
    events.subscribe("project-data", viewProjects);
    events.subscribe("todo-data", viewTodos);
    events.subscribe("add-event-prj",addProjListener);
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

  // add listener to a project button
  const addProjListener = dataObject =>{
    const {projectItem, projectList} = dataObject;

    projectItem.addEventListener("click", (e)=> {
      const index = e.target.parentElement.getAttribute("data-index");
      // reloads parts of the mainview by generating the elements and
      // appending again to the container
      if (e.target.parentElement.classList.contains("project-item")){
        document.getElementById("container").innerHTML = "";
        const todos = projectList[index].todos;
        document.getElementById("container").appendChild(mainView.loadLeft(todos));
        document.getElementById("container").appendChild(mainView.loadRight(todos));
        mainView.loadRightContents(todos[0]);
      }
      
    });
  }

  


  return { init };
})();

export default view;
