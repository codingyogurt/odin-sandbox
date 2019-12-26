import myName from "./myName.js";

function component() {
  const element = document.createElement("div");
  element.innerHTML = myName("Ryan");
  return element;
}

document.body.appendChild(component());
