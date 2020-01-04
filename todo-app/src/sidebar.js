const sidebar = (() => {
  const sidebarElement = document.createElement("div");
  sidebarElement.id = "side-bar";

  // project list element
  const projectListElement = document.createElement("div");
  projectListElement.id = "project-list";

  // load the header elements
  const load = projectList => {
    // clear sidebar element
    sidebarElement.innerHTML = "";
    // logo element
    const logo = document.createElement("div");
    logo.id = "logo";
    const i = document.createElement("i");
    i.className = "fas fa-clipboard-check";
    logo.appendChild(i);
    const h1 = document.createElement("h1");
    h1.textContent = "TODO APP";
    logo.appendChild(i);
    logo.appendChild(h1);

    loadProjects(projectList);

    sidebarElement.appendChild(logo);
    sidebarElement.appendChild(projectListElement);

    return sidebarElement;
  };

  // load the items elements returns the element itself
  const loadProjects = projectList => {
    // clear projectListElement
    projectListElement.innerHTML = "";
    // project title element
    const projectTitle = document.createElement("div");
    projectTitle.id = "project-title";

    const pTitle = document.createElement("p");
    pTitle.textContent = "PROJECTS";
    projectTitle.appendChild(pTitle);

    const buttonTitle = document.createElement("button");
    buttonTitle.id = "add-prj";
    buttonTitle.className = "fas fa-plus";
    projectTitle.appendChild(buttonTitle);

    projectListElement.appendChild(projectTitle);

    // projects items
    projectList.forEach(project => {
      const projectItem = document.createElement("div");
      projectItem.className = "project-item";

      const p = document.createElement("p");
      p.textContent = project.title;
      projectItem.appendChild(p);

      const p1 = document.createElement("p");
      p1.textContent = `(${project.todos.length})`;
      projectItem.appendChild(p1);

      const button = document.createElement("button");
      button.className = "del-prj fas fa-trash";
      projectItem.appendChild(button);
      // append one by one to project list element
      projectListElement.appendChild(projectItem);
    });
  };

  return { load, loadProjects };
})();

export default sidebar;
