import { component as nav } from "./nav.js";
import { component as homepage } from "./homepage.js";
import { component as menupage } from "./menu.js";
import { component as aboutpage } from "./about.js";

const content = document.querySelector("#content");

// setup nav bar
const showNavBar = () => {
  document.body.insertBefore(
    nav("RESTAURANT", ["Home", "Menu", "About Us"]),
    document.body.firstChild
  );
};

// add listeners to nav buttons, this requires that buttons are loaded via nav
const addNavListeners = () => {
  document.querySelectorAll("#nav-menu a").forEach(a => {
    a.addEventListener("click", () => {
      clearPage();
      switch (a.textContent) {
        case "Home":
          showHomePage();
          break;
        case "Menu":
          showMenuPage();
          break;
        case "About Us":
          showAboutPage();
          break;
      }
    });
  });
};

// setup home page
const showHomePage = () => {
  clearPage();
  homepage.setImage(
    "https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466_960_720.jpg"
  );
  homepage.setSlogan("Lorem ipsum dolor sit amet.");
  homepage.setSloganDetails(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,culpa"
  );
  homepage.setBtnText("Check out our menu");
  content.appendChild(homepage.getComponent());
};

// setup menu page
const showMenuPage = () => {
  clearPage();
  menupage.createMenuItem(
    "Sinigang na baboy",
    "https://panlasangpinoy.com/wp-content/uploads/2018/11/Sinigang-na-Baboy-Recipe.jpg"
  );
  menupage.createMenuItem(
    "Crispy Liempo",
    "https://panlasangpinoy.com/wp-content/uploads/2019/12/turbo-crispy-liempo-recipe.jpg"
  );
  menupage.createMenuItem(
    "Crispy Sisig",
    "https://panlasangpinoy.com/wp-content/uploads/2019/12/sizzling-crispy-sisig-.jpg"
  );

  content.appendChild(menupage.getComponent());
};

// setup about page
const showAboutPage = () => {
  clearPage();
  aboutpage.setText(
    "Lorem ipsum dolor sit.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et commodi facere eum fugiat nobis dolorem perspiciatis maiores. Facilis, earum placeat."
  );

  content.appendChild(aboutpage.getComponent());
};

// clear contents of the page
const clearPage = () => {
  content.innerHTML = "";
};

showNavBar();
addNavListeners();
showHomePage();
