const startScene = document.querySelector(".start-scene");
const mainScene = document.querySelector(".main-scene");
const settingsScene = document.querySelector(".settings-scene");
const playBtn = document.querySelector(".play");
const settingsBtnStart = document.querySelector(".start-scene .edit");
const settingsBtnSettings = document.querySelector(".settings-scene .edit");
const settingsBtnMain = document.querySelector(".main-scene .edit");

playBtn.addEventListener("click", showMain);

settingsBtnStart.addEventListener("click", showSettings);

settingsBtnSettings.addEventListener("click", showStart);

settingsBtnMain.addEventListener("click", showSettings);

function showStart() {
    mainScene.classList.remove("fade");
    startScene.classList.add("fade");
    settingsScene.classList.remove("fade");
}

function showSettings(){
    mainScene.classList.remove("fade");
    startScene.classList.remove("fade");
    settingsScene.classList.add("fade");
}

function showMain(){
    mainScene.classList.add("fade");
    startScene.classList.remove("fade");
    settingsScene.classList.remove("fade");

}









