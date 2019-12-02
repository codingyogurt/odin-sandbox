const resultText = document.querySelector(".p-result");
const equationText = document.querySelector(".p-equation");

document.querySelectorAll(".normal").forEach((btn) =>{
    btn.addEventListener("click", (e) => {
        if(equationText.textContent === "0"){
            equationText.textContent =
            e.target.textContent;
        } else {
            updateEquation(e.target.textContent);
        }
    });
});

document.querySelectorAll(".t").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if(btn.classList.contains("ac")){
            clearDisplay();
        }
        if(btn.classList.contains("del")){
            backSpace();
        }
        if(btn.classList.contains("fa-divide")){
            updateEquation(" / ");
        }
        if(btn.classList.contains("fa-times")){
            updateEquation(" x ");
        }
        if(btn.classList.contains("fa-minus")){
            updateEquation(" - ");
        }
        if(btn.classList.contains("fa-plus")){
            updateEquation(" + ");
        }
        if(btn.classList.contains("equal")){
            resultText.innerHTML =
            `<strong>
            ${parseProblem(equationText.textContent)}
            </strong>`; 
        }
    });

});

const checkIfOperator = ((stringOperator) => {
    if(stringOperator.indexOf("x") >= 0){
        return true;
    }
    if(stringOperator.indexOf("/") >= 0){
        return true;
    }
    if(stringOperator.indexOf("+") >= 0){
        return true;
    }
    if(stringOperator.indexOf("-") >= 0){
        return true;
    }

    return false;
});

const updateEquation = ((stringToAdd) => {
    const text = equationText.textContent;
    let endText = text.substr(text.length - 2, 2);
    if (checkIfOperator(endText) && checkIfOperator(stringToAdd)){
        endText = text.substr(0, text.length - 3);
        equationText.textContent = endText + stringToAdd;
    } else {
        equationText.textContent = text + stringToAdd;
    }

});

const backSpace = () => {
    let text = equationText.textContent;

    if(text.substr(text.length - 1, text.length) === " "){
        text = text.substr(0, text.length - 3);
    } else {
        text = text.substr(0,text.length - 1);
    }

    equationText.textContent = text;

    if(equationText.textContent === ""){
        equationText.textContent = "0";
        resultText.textContent = "0";
    }
}

const clearDisplay = () => {
    equationText.textContent = "0";
    resultText.innerHTML =
    `<strong>0</strong>`; 
}

const parseProblem = ((stringProblem) => {
    // check for syntax error
    let endText = stringProblem.substr(stringProblem.length - 2, 2);
    if(checkIfOperator(endText)){
        return "OOPS!";
    }

    // check for dividing by 0
    endText = stringProblem.substr(stringProblem.length - 3, 3);
    if(endText.indexOf("/") >= 0){
        endText = stringProblem.substr(stringProblem.length - 2, 2);
        if(endText.indexOf("0") >= 0){
            return "NOPE!";
        }
    }

    const arrayProblem = stringProblem.split(" ");

    let num1, num2;
    // MDAS (M)
    while(arrayProblem.indexOf("x") !== -1){
        const xIndex = arrayProblem.indexOf("x");
        num1 = arrayProblem[xIndex -1];
        num2 = arrayProblem[xIndex + 1];
        arrayProblem.splice(
            xIndex - 1,
            3,
            multiply(num1,num2)
        );
    }
    // (D)
    while(arrayProblem.indexOf("/") !== -1){
        const xIndex = arrayProblem.indexOf("/");
        num1 = arrayProblem[xIndex -1];
        num2 = arrayProblem[xIndex + 1];
        arrayProblem.splice(
            xIndex - 1,
            3,
            divide(num1,num2)
        );
    }
    // (A)
    while(arrayProblem.indexOf("+") !== -1){
        const xIndex = arrayProblem.indexOf("+");
        num1 = arrayProblem[xIndex -1];
        num2 = arrayProblem[xIndex + 1];
        arrayProblem.splice(
            xIndex - 1,
            3,
            add(num1,num2)
        );
    }
    // (S)
    while(arrayProblem.indexOf("-") !== -1){
        const xIndex = arrayProblem.indexOf("-");
        num1 = arrayProblem[xIndex -1];
        num2 = arrayProblem[xIndex + 1];
        arrayProblem.splice(
            xIndex - 1,
            3,
            substract(num1,num2)
        );
    }

    return Number(arrayProblem.join("")).toFixed(2);
});

const operate = ((operator, num1, num2) => {
    if(operator === "x"){ // MDAS
        return multiply(num1,num2);
    }
    if(operator === "/"){
        return divide(num1,num2);
    }
    if(operator === "+"){
        return add(num1, num2);
    }
    if(operator === "-"){
        return substract(num1,num2);
    }
});

const add = ((num1, num2) => {
    return Number(num1) + Number(num2);
});

const substract = ((num1, num2) => {
    return Number(num1) - Number(num2);
});

const multiply = ((num1, num2) => {
    return Number(num1) * Number(num2);
});

const divide = ((num1, num2) => {
    return Number(num1) / Number(num2);
});
