const doContainer = document.querySelector(".container");

function setGrid(numGrid){
    
    for(i = 0; i < (numGrid**2); i++){
        const doPixel = document.createElement("div");
        doPixel.className = "pixel";
        doContainer.appendChild(doPixel);
    }
    
    doContainer.style.gridTemplateColumns = `repeat(${numGrid},1fr)`;

}

setGrid(16);