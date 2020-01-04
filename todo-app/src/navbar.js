const navbar = (() => {
  const div = document.createElement("div");
  div.id = "nav-bar";

  const i = document.createElement("i");
  i.className = "fas fa-tasks";

  const h2 = document.createElement("h2");

  const divTitle = document.createElement("div");
  divTitle.id = "title";

  divTitle.appendChild(i);

  const load = text => {
    h2.textContent = text;
    divTitle.appendChild(h2);
    div.appendChild(divTitle);

    return div;
  };

  return { load };
})();

export default navbar;
