const startScene = document.querySelector(".start-scene");
const mainScene = document.querySelector(".main-scene");
const settingsScene = document.querySelector(".settings-scene");
const playBtn = document.querySelector(".play");
const settingsBtnStart = document.querySelector(".start-scene .edit");
const settingsBtnSettings = document.querySelector(".settings-scene .edit");
const settingsBtnMain = document.querySelector(".main-scene .edit");
const stopBtn = document.querySelector(".stop");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const adjustBtn = document.querySelector(".adjust");
const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");
let switchString = false;
let switchPause = false;
let currentSession = "";

playBtn.addEventListener("click", () => {
    initTimerParam("session");
    showMain();
    timer.textContent = buildTimeString(minutes, 0);
    startTimer();
});

settingsBtnStart.addEventListener("click", showSettings);

settingsBtnSettings.addEventListener("click", closeSettings);

settingsBtnMain.addEventListener("click", showSettings);

stopBtn.addEventListener("click", () => {
    showStart();
    switchString = true;
});

pauseBtn.addEventListener("click", (e) => {
    const eClassList = e.target.classList;

    eClassList.toggle("fa-pause");
    eClassList.toggle("fa-play");

    if (eClassList.contains("fa-pause")){
        switchPause = true; // play
        switchString = false;
        startTimer();
    } else if (eClassList.contains("fa-play")){
        switchPause = false; // pause
        switchString = true;
    }
    
});

resetBtn.addEventListener("click", () => {
    initTimerParam(currentSession);
    timer.textContent = buildTimeString(minutes, seconds = 0);
});

adjustBtn.addEventListener("click", () => {
    showStart();
    switchString = true;
});

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

function showSettings() {
    settingsScene.classList.add("fade");
}

function closeSettings() {
    settingsScene.classList.remove("fade");
}

function showMain() {
    mainScene.classList.add("fade");
    startScene.classList.remove("fade");
    settingsScene.classList.remove("fade");
}

function settingChangeValue(valueTarget, method) {
    let currentValue = Number(valueTarget.textContent);

    if (currentValue < 25) {
        if (method === "plus") {
            currentValue++;
            valueTarget.textContent = currentValue;
        }
    }

    if (currentValue > 0) {
        if (method === "minus") {
            currentValue--;
            valueTarget.textContent = currentValue.toString();
        }
    }
}

// End of UI codes

const timer = document.querySelector(".timer");
const sessionValue = document.querySelector(".session-value");
const breakValue = document.querySelector(".break-value");
const restValue = document.querySelector(".rest-value");
let minutes = 0, seconds = 0;

function initTimerParam(stringType) {
    switch (stringType) {
        case "session":
            minutes = sessionValue.textContent;
            break;
        case "break":
            minutes = breakValue.textContent;
            break;
        case "rest":
            minutes = restValue.textContent;
            break;
    }
    currentSession = stringType;
}

function buildTimeString(minutes, seconds){
    if (seconds < 10){
        seconds = "0".concat(seconds.toString());
    }
    return `${minutes}:${seconds}`;
}

function startTimer() {
    switchString = false;

    if (switchPause === false){
        seconds = 59;
        minutes--;
    }

    switchPause = false;

    const x = setInterval(() => {

        timer.textContent = buildTimeString(minutes, seconds);

        seconds--;
        if (seconds === -1) {
            clearInterval(x);
            startTimer();
        }
        if (minutes === 0 && seconds === 0) {
            clearInterval(x);
        }
        if (switchString){
            clearInterval(x);
        }

        // console.log(`${minutes}:${seconds}`);

    }, 1000);

}







