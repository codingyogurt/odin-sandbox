const component = (logoText, menusArr) => {
  // create the needed elements

  // the nav bar
  const nav = document.createElement("div");
  nav.setAttribute("id", "nav");

  // the logo on the right, p wrapped in a
  const logo = document.createElement("a");
  logo.setAttribute("href", "#");
  const p = document.createElement("p");
  p.textContent = logoText;
  logo.appendChild(p);

  // menu div. runs forEach item and then add li
  const menu = document.createElement("div");
  menu.setAttribute("id", "menu");
  const ul = document.createElement("ul");
  ul.setAttribute("id", "nav-menu");
  menusArr.forEach(text => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#">${text}</a>`;
    ul.appendChild(li);
  });
  menu.appendChild(ul);

  // append all to nav
  nav.appendChild(logo);
  nav.appendChild(menu);

  return nav;
};

export { component };
