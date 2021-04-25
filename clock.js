const clockContainer = document.querySelector(".js-clock");
const dateTitle = clockContainer.querySelector(".js-date");
const clockTitle = clockContainer.querySelector(".js-title");

function getTIme(){
    const date =  new Date();
    const year = date.getFullYear();;
    const month = date.getMonth();
    const day = date.getDate();
    const week = date.getDay();
    const weeks = new Array('SUN','MON','TUE','WED','THU','FRI','SAT')
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    dateTitle.innerText = `${year}.${month < 10 ? `0${month}` : month}.${
        day < 10 ? `0${day}` : day
    } ${weeks[week]}`;
    clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours }:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
}

function init(){
    getTIme();
    setInterval(getTIme,1000);
}

init();