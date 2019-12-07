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
let sessionNumber = 0;
const SESSION = "session";
const BREAK = "break";
const REST = "rest";

playBtn.addEventListener("click", () => {
    initTimerParam(SESSION);
    showMain();
    timer.textContent = buildTimeString(minutes, 0);
    startTimer();
});

settingsBtnStart.addEventListener("click", showSettings);

settingsBtnSettings.addEventListener("click", closeSettings);

settingsBtnMain.addEventListener("click", showSettings);

stopBtn.addEventListener("click", () => {
    showStart();
    resetAll();
});

pauseBtn.addEventListener("click", (e) => {
    const eClassList = e.target.classList;
    updatePauseBtn(eClassList);
    updateSessionText();
});

resetBtn.addEventListener("click", () => {
    initTimerParam(currentSession);
    timer.textContent = buildTimeString(minutes, seconds = 0);
});

adjustBtn.addEventListener("click", () => {
    showStart();
    switchString = true;
    sessionNumber = 0;
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

function updatePauseBtn(eClassList){
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
}

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

    if (currentValue > 1) {
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
const sessionText = document.querySelector(".session");
const beepAudio = document.querySelector(".beep-audio");
let minutes = 0, seconds = 0;

function testMode(){
    breakValue.textContent = 1;
    restValue.textContent = 1;
    sessionValue.textContent = 1;
}

testMode();

function initTimerParam(stringType) {
    switch (stringType) {
        case SESSION:
            minutes = sessionValue.textContent;
            break;
        case BREAK:
            minutes = breakValue.textContent;
            break;
        case REST:
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
        seconds = 3;
        minutes--;
    }

    switchPause = false;

    const x = setInterval(() => {

        timer.textContent = buildTimeString(minutes, seconds);

        seconds--;

        console.log(`${minutes}:${seconds}`);


        if (seconds === -1) {
            clearInterval(x);
            startTimer();
        }
        if (minutes === 0 && seconds === 0) {
            clearInterval(x);
            sessionMonitorUpdate();

        }
        if (switchString){
            clearInterval(x);
        }


    }, 1000);
    

}

function sessionMonitorUpdate(){
    // console.log(currentSession + " sesh:" + (sessionNumber));


    if (currentSession === SESSION && sessionNumber < 3) {
        initTimerParam(BREAK);
    } else if (currentSession === BREAK && sessionNumber < 3) {
        sessionNumber++;
        initTimerParam(SESSION);
    } else if (currentSession === SESSION && sessionNumber === 3){
        initTimerParam(REST);
    } else if (currentSession === REST){
        resetAll();
    }


    const eClassList = pauseBtn.classList;
    updatePauseBtn(eClassList);

    updateSessionText();

    beepAudio.play();
}

function updateSessionText(){
    if (currentSession === REST) {
        sessionText.textContent = "Congratulations! Please Rest :)";
        return;
    } else if (currentSession === BREAK) {
        sessionText.textContent = `Break ${sessionNumber + 1}`;
        return;
    }
    sessionText.textContent = `Session ${sessionNumber + 1}`;
}

function resetAll(){
    switchString = false;
    switchPause = false;
    currentSession = "";
    sessionNumber = 0;
    minutes = 0;
    seconds = 0;

    initTimerParam(SESSION);
    timer.textContent = buildTimeString(minutes, 0);
    sessionText.textContent = `Session ${sessionNumber + 1}`;
}




