const content = document.querySelector(".content");


const p = document.createElement('p');
p.style.color = "red";
p.textContent = "Hey I'm red!";
content.appendChild(p);

const h3 = document.createElement('h3');
h3.style.color = "blue";
h3.textContent = "I'm a blue h3!";
content.appendChild(h3);

const div = document.createElement('div');
div.style.border = "5px solid black";
div.style.backgroundColor = "pink";

const h1 = document.createElement('h1');
h1.textContent = "I'm in a div";

const p1 = document.createElement("p");
p1.textContent = "ME TOO!";

div.appendChild(h1);
div.appendChild(p1);

content.appendChild(div);

const btn1 = document.createElement("button");
btn1.textContent = "Button 1";
const btn2 = document.createElement("button");
btn2.textContent = "Button 2";
const btn3 = document.createElement("button");
btn3.textContent = "Button 3";

function changeMyColor(e){
    e.target.style.backgroundColor = "red";
}

content.appendChild(btn1);
content.appendChild(btn2);
content.appendChild(btn3);

const btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener("click", changeMyColor);
});
