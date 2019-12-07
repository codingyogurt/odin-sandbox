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
let switchPause = false;
let currentSession = "";
let sessionNumber = 0;
const SESSION = "session";
const BREAK = "break";
const REST = "rest";

playBtn.addEventListener("click", () => {
    initTimerParam(SESSION);
    updateSessionText();
    showMain();
    timer.textContent = secToTimeStr
        (minutes, 0);
    startTimer();
});

settingsBtnStart.addEventListener("click", showSettings);

settingsBtnSettings.addEventListener("click", closeSettings);

settingsBtnMain.addEventListener("click", showSettings);

stopBtn.addEventListener("click", () => {
    clearInterval(decrement);
    showStart();
    resetAll();
});

pauseBtn.addEventListener("click", (e) => {
    const eClassList = e.target.classList;
    updatePauseBtn(eClassList);
});

resetBtn.addEventListener("click", () => {
    initTimerParam(currentSession);
    timer.textContent = secToTimeStr
        (minutes, seconds = 0);
});

adjustBtn.addEventListener("click", () => {
    showStart();
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

function updatePauseBtn(eClassList) {
    eClassList.toggle("fa-pause");
    eClassList.toggle("fa-play");

    if (eClassList.contains("fa-pause")) {
        switchPause = true; // play
        setInterval(decrement, 1000);
        startTimer();
    } else if (eClassList.contains("fa-play")) {
        switchPause = false; // pause
        clearInterval(decrement);
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
let minutes = 0, seconds = 0, defSecond = 59;
let decrement = true;

function testMode() {
    breakValue.textContent = 1;
    restValue.textContent = 1;
    sessionValue.textContent = 1;
    defSecond = 3;
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

function secToTimeStr(sec) {
    let hour = 0, minute = 0;
    hour = Math.floor(sec / 3600);
    sec = sec - (hour * 3600);
    minutes = Math.floor(sec / 60);
    sec = sec - (minutes * 60);

    function format(n){
        return n < 10 ? "0" + n : n;
    }

    return hour > 0 ? `${format(hour)}:${format(minutes)}:${format(sec)}` : 
    `${format(minutes)}:${format(sec)}`;
}


function startTimer() {



}

function sessionMonitorUpdate() {
    // console.log(currentSession + " sesh:" + (sessionNumber));

    if (currentSession === SESSION && sessionNumber < 3) {
        initTimerParam(BREAK);
    } else if (currentSession === BREAK && sessionNumber < 3) {
        sessionNumber++;
        initTimerParam(SESSION);
    } else if (currentSession === SESSION && sessionNumber === 3) {
        initTimerParam(REST);
    } else if (currentSession === REST) {
        resetAll();
    }


    const eClassList = pauseBtn.classList;
    updatePauseBtn(eClassList);

    updateSessionText();

    beepAudio.play();
}

function updateSessionText() {
    if (currentSession === REST) {
        sessionText.textContent = "Congratulations! Please Rest :)";
        return;
    } else if (currentSession === BREAK) {
        sessionText.textContent = `Break ${sessionNumber + 1}`;
        return;
    }
    sessionText.textContent = `Session ${sessionNumber + 1}`;
}

function resetAll() {
    switchString = true;
    switchPause = false;
    currentSession = SESSION;
    sessionNumber = 0;
    minutes = 0;
    seconds = 0;

    initTimerParam(SESSION);
    timer.textContent = secToTimeStr
        (minutes, 0);
    sessionText.textContent = `Session ${sessionNumber + 1}`;
}




