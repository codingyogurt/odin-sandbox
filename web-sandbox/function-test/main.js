const inputAdd7 = document.querySelector("#input-add7");
const resultAdd7 = document.querySelector("#result-add7");

inputAdd7.onchange = function(){
    const num = inputAdd7.value;
    if (isNaN(num)){
        resultAdd7.textContent = "Please enter a number only";
    } else {
        resultAdd7.textContent = add7(num);
    }
}

// comment

const inputMultiply = document.querySelector("#input-multiply");
const resultMultiply = document.querySelector("#result-multiply");

inputMultiply.onchange = function(){
    const num1 = inputAdd7.value;
    const num2 = inputMultiply.value;
    if(isNaN(num2)){
        resultMultiply.textContent = "Please enter a number only!";
    } else {
        resultMultiply.textContent = multiply(num1,num2);
    }
}

const inputCapitalize = document.querySelector("#input-capitalize");
const resultCapitalize = document.querySelector("#result-capitalize");

inputCapitalize.onchange = function(){
    const string = inputCapitalize.value;
    if(!isNaN(string)){
        resultCapitalize.textContent = "Please enter a text only!";
    } else {
        resultCapitalize.textContent = capitalize(string);
    }
}

const inputLastLetter = document.querySelector("#input-lastLetter");
const resultLastLetter = document.querySelector("#result-lastLetter");

inputLastLetter.onchange = function(){
    const string = inputLastLetter.value;
    if(!isNaN(string)){
        resultLastLetter.textContent = "Please enter a text only!";
    } else {
        resultLastLetter.textContent = lastLetter(string);
    }
}


function add7(num){
    return parseInt(num) + 7;
}

function multiply(num1, num2){
    return num1 * num2;
}

function capitalize(string){
    const firstLetter = string.charAt(0);
    let newStr = string.replace(firstLetter,firstLetter.toUpperCase());
    return newStr;
}

function lastLetter(string){
    const lastLetter = string.charAt(string.length - 1);
    let newStr = string.substring(0, string.length - 1);
    newStr = newStr + lastLetter.toUpperCase();
    return newStr;
}