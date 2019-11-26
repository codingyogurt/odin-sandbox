const doReset = document.querySelector("#btn-reset");

doReset.addEventListener("click", (e) => setGrid(lastGridNum));

const doResizePixels = document.querySelector("#btn-resize");
let lastGridNum = 16;

doResizePixels.addEventListener("click", resizePixels);

function resizePixels(){
    let num = prompt("Enter new pixel size");
    if(isNaN(num) || num === ""){
        num = 16;
    }
    setGrid(num);
    lastGridNum = num;
    console.log("Grid updated");
}


const doContainer = document.querySelector(".container");

function setGrid(numGrid){

    doContainer.innerHTML = "";
    
    for(i = 0; i < (numGrid**2); i++){
        const doPixel = document.createElement("div");
        doPixel.className = "pixel black";
        doPixel.addEventListener("mouseenter", changeColor);
        doContainer.appendChild(doPixel);
    }
    
    doContainer.style.gridTemplateColumns = `repeat(${numGrid},1fr)`;

}

const doBtnRgb = document.querySelector("#btn-rgb");
const doBtnOpacityBlack = document.querySelector("#btn-opacity-black");
const doBtnBlack = document.querySelector("#btn-black");

const colorBtns = document.querySelectorAll(".color");

colorBtns.forEach((btn)=>{
    btn.addEventListener("click", (e)=>{
        unselectButtons();
        e.target.classList.toggle("active");
    });
});

function unselectButtons(){
    doBtnRgb.classList.remove("active");
    doBtnOpacityBlack.classList.remove("active");
    doBtnBlack.classList.remove("active");
}

function changeColor(){
    if(doBtnRgb.classList.contains("active")){
        this.style.backgroundColor = `rgb(${rgbNum()},${rgbNum()},${rgbNum()})`;
        this.style.opacity = 1;
    }
    if(doBtnOpacityBlack.classList.contains("active")){
        this.style.backgroundColor = "rgb(0,0,0)";
        if(this.style.opacity < 1){
            this.style.opacity = Number(this.style.opacity) + 0.1;
        }
    }
    if(doBtnBlack.classList.contains("active")){
        this.style.backgroundColor = "rgb(0,0,0)";
        this.style.opacity = 1;
    }
}

function rgbNum(){
    return Math.floor(Math.random() * 255);
}

setGrid(16);


