import { component as nav } from "./nav.js";
import { component as homepage } from "./homepage.js";

const content = document.querySelector("#content");

// setup nav bar
const showNavBar = () => {
  document.body.appendChild(nav("RESTAURANT", ["Home", "Menu", "About Us"]));
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

// clear contents of the page
const clearPage = () => {
  content.innerHTML = "";
};

showNavBar();
addNavListeners();
showHomePage();
