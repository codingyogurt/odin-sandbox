const component = (() => {
  // create necessary elements
  const container = document.createElement("div");

  const img = document.createElement("img");
  img.setAttribute("id", "home-img");

  const pSlogan = document.createElement("p");
  pSlogan.setAttribute("id", "main-slogan");

  const sloganDetails = document.createElement("div");
  sloganDetails.setAttribute("id", "slogan-details");

  const btn = document.createElement("button");
  btn.setAttribute("id", "main-btn");

  // append to one container
  container.appendChild(img);
  container.appendChild(pSlogan);
  container.appendChild(sloganDetails);

  // function for url image
  const setImage = imgUrlStr => {
    img.setAttribute("src", imgUrlStr);
  };
  // function to set pSlogan text
  const setSlogan = sloganText => {
    pSlogan.textContent = sloganText;
  };
  // function to set sloganDetails
  function setSloganDetails(...textArgs) {
    sloganDetails.innerHTML = "";
    textArgs.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      sloganDetails.appendChild(p);
    });
    // adding the btn here
    sloganDetails.appendChild(btn);
  }
  // function to set btn text
  const setBtnText = btnText => {
    btn.textContent = btnText;
  };

  // function to get the component
  const getComponent = () => {
    return container;
  };

  return { setImage, setSlogan, setSloganDetails, setBtnText, getComponent };
})();

export { component };
