const component = (() => {
  // create necessary elements
  const container = document.createElement("div");
  container.setAttribute("id", "about-container");
  // function to create main and simple text and
  // add values to them, append to container
  const setText = (mainText, simpleText, emailBtnTxt = "Email us") => {
    // clear html of the container, loaded in memory
    container.innerHTML = "";
    // create necessary elements
    const mainP = document.createElement("p");
    mainP.setAttribute("id", "about-main-text");
    mainP.textContent = mainText;
    const simpleP = document.createElement("p");
    simpleP.setAttribute("id", "about-simple-text");
    simpleP.textContent = simpleText;
    const emailBtn = document.createElement("button");
    emailBtn.setAttribute("id", "email-btn");
    emailBtn.textContent = emailBtnTxt;
    // append to container
    container.appendChild(mainP);
    container.appendChild(simpleP);
    container.appendChild(emailBtn);
  };

  // function to get the component
  const getComponent = () => {
    return container;
  };

  return { setText, getComponent };
})();

export { component };
