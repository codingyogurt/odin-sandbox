const mainView = (() => {
  const container = document.createElement("div");
  container.id = "container";

  // create left element with form, form add todo and list todos
  const loadLeft = projectTodos => {
    const left = document.createElement("div");
    left.id = "left";
    left.innerHTML = "";

    // create todo form element head for left
    const todoForm = document.createElement("div");
    todoForm.id = "todo-form";

    const p = document.createElement("p");
    p.textContent = "Todos";

    const form = document.createElement("form");
    form.action = "#";

    const input = document.createElement("input");
    input.text = "text";
    input.name = "todo";
    input.id = "todo";
    input.placeholder = "Add todo";

    const button = document.createElement("button");
    button.id = "add-todo";
    button.className = "fas fa-plus-circle";

    // append all objects in order
    form.appendChild(input);
    form.appendChild(button);

    todoForm.appendChild(p);
    todoForm.appendChild(form);

    // create todo list element
    left.appendChild(todoForm);

    left.appendChild(loadTodos(projectTodos));

    // append to container
    container.appendChild(left);
    return left;
  };

  // function for creating todo items in the list based on the current project selected
  const loadTodos = projectTodos => {
    const todoList = document.createElement("div");
    todoList.id = "todo-list";
    projectTodos.forEach(todo => {
      const todoItem = document.createElement("div");
      todoItem.className = "todo-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;

      const pTitle = document.createElement("p");
      pTitle.textContent = todo.title;

      const pDate = document.createElement("p");
      pDate.textContent = todo.date;

      todoItem.appendChild(checkbox);
      todoItem.appendChild(pTitle);
      todoItem.appendChild(pDate);

      todoList.appendChild(todoItem);
    });

    return todoList;
  };

  // loads the right element. element for an item view
  const loadRight = projectTodos => {
    const right = document.createElement("div");
    right.id = "right";
    right.innerHTML = "";

    // todo option on top of right
    const todoOption = document.createElement("div");
    todoOption.id = "todo-option";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "todo-checked";

    const pDate = document.createElement("p");
    pDate.id = "todo-date";

    const div = document.createElement("div");

    const btnImp = document.createElement("button");
    btnImp.className = "fas fa-flag";
    btnImp.id = "todo-imp";

    const btnDel = document.createElement("button");
    btnDel.className = "fas fa-trash";
    btnDel.id = "todo-del";

    const btnSave = document.createElement("button");
    btnSave.className = "fas fa-save";
    btnSave.id = "todo-save";

    // append to right

    todoOption.appendChild(checkbox);
    todoOption.appendChild(pDate);
    div.appendChild(btnImp);
    div.appendChild(btnDel);
    div.appendChild(btnSave);
    todoOption.appendChild(div);
    right.appendChild(todoOption);

    // todo contents

    const todoContent = document.createElement("div");
    todoContent.id = "todo-content";

    const title = document.createElement("input");
    title.type = "text";
    title.id = "todo-title";

    const content = document.createElement("textarea");
    content.id = "todo-textarea";

    // append to right

    todoContent.appendChild(title);
    todoContent.appendChild(content);
    right.appendChild(todoContent);

    // append right to container
    container.appendChild(right);

    return right;
  };

  // load todoItem details to the elements
  const loadRightContents = todoItem => {
    // I used query based on loaded items
    document.querySelector("#todo-checked").checked = todoItem.done;
    document.querySelector("#todo-date").textContent = todoItem.date;
    document.querySelector("#todo-title").value = todoItem.title;
    document.querySelector("#todo-textarea").textContent = todoItem.desc;
  };

  const load = projectTodos => {
    loadLeft(projectTodos);
    loadRight(projectTodos);

    return container;
  };

  return { load, loadLeft, loadRight, loadRightContents };
})();

export default mainView;
