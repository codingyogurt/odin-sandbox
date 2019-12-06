const startScene = document.querySelector(".start-scene");
const mainScene = document.querySelector(".main-scene");
const settingsScene = document.querySelector(".settings-scene");
const playBtn = document.querySelector(".play");
const settingsBtnStart = document.querySelector(".start-scene .edit");
const settingsBtnSettings = document.querySelector(".settings-scene .edit");
const settingsBtnMain = document.querySelector(".main-scene .edit");
const stopBtn = document.querySelector(".stop");
const pauseBtn = document.querySelector(".pause");
const adjustBtn = document.querySelector(".adjust");
const sessionValue = document.querySelector(".session-value");
const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");

playBtn.addEventListener("click", showMain);

settingsBtnStart.addEventListener("click", showSettings);

settingsBtnSettings.addEventListener("click", closeSettings);

settingsBtnMain.addEventListener("click", showSettings);

stopBtn.addEventListener("click", showStart);

pauseBtn.addEventListener("click", (e) => {
    e.target.classList.toggle("fa-pause");
    e.target.classList.toggle("fa-play");
});

adjustBtn.addEventListener("click", showStart);

minusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        settingChangeValue(btn.nextElementSibling, "minus");
    })
});

plusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        settingChangeValue(btn.previousElementSibling, "plus");
    })
});

function showStart() {
    mainScene.classList.remove("fade");
    startScene.classList.add("fade");
    settingsScene.classList.remove("fade");
}

function showSettings(){
    settingsScene.classList.add("fade");
}

function closeSettings(){
    settingsScene.classList.remove("fade");
}

function showMain(){
    mainScene.classList.add("fade");
    startScene.classList.remove("fade");
    settingsScene.classList.remove("fade");
}

function settingChangeValue(valueTarget, method){
    let currentValue = Number(valueTarget.textContent);
    
    if (currentValue < 25){        
        if(method === "plus"){
            currentValue++;
            valueTarget.textContent = currentValue;
        }
    }

    if (currentValue > 0){
        if(method === "minus"){
            currentValue--;
            valueTarget.textContent = currentValue.toString();
        }
    }
}












