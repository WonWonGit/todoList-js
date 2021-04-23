const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-grettings"),
    question = document.querySelector(".js-question");

    const toDo_Form = document.querySelector(".js-toDoForm");

const USER_LS = "currentUser",
    SHOWING_CN = "showing",
    QUESTION = "question";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}    

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    question.classList.add(QUESTION);
    greeting.innerText = `Hello, ${text} 👋`
    if(text==="Mattias"){
        question.innerText = `You are My Sexy Husband, it's only for you`    
    }else{
        question.innerText = `What is your main focus for today?`
    }
    toDo_Form.style.display = "block";
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();