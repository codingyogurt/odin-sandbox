// menu item factory
const menuItemFactory = (title, imgSrc) => {
  return { title, imgSrc };
};

const component = (() => {
  // create the needed elements
  const menuContainer = document.createElement("div");
  menuContainer.setAttribute("id", "menu-container");
  // collection of to be added menu items
  let menuItems = [];
  // create menu-item function
  const createMenuItem = (title, imgSrc) => {
    const newMenuItem = menuItemFactory(title, imgSrc);
    menuItems.push(newMenuItem);
  };
  // function for creating each menu item and
  // appending to menu-container
  const getComponent = () => {
    // clear main container first!
    menuContainer.innerHTML = "";
    menuItems.forEach(item => {
      // creating necessary elements
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";
      const img = document.createElement("img");
      img.className = "menu-item-img";
      img.setAttribute("src", item.imgSrc);
      const p = document.createElement("p");
      p.className = "menu-item-title";
      p.textContent = item.title;
      // appending each elements to menu-item
      menuItem.appendChild(img);
      menuItem.appendChild(p);
      // appending each menu item to menu-container
      menuContainer.appendChild(menuItem);
    });
    // clear the menuItems after loaded
    menuItems = [];

    return menuContainer;
  };

  return { createMenuItem, getComponent };
})();

export { component };
