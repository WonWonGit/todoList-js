const API_KEY = "856dd9e10e514598dbfa24f7d013cb3a";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const weather_icon = document.querySelector("i");

function getWeather(lat, lon){
    const date =  new Date();
    const get_hours = date.getHours();
    var weatherIcon = {eveing : { 
        '01' : 'fas fa-sun', 
        '02' : 'fas fa-cloud-sun', 
        '03' : 'fas fa-cloud', 
        '04' : 'fas fa-cloud-sun', 
        '09' : 'fas fa-cloud-sun-rain', 
        '10' : 'fas fa-cloud-showers-heavy', 
        '11' : 'fas fa-poo-storm', 
        '13' : 'fas fa-snow-flake', 
        '50' : 'fas fa-water' },
        dinner : {'01' : 'fas fa-moon', 
        '02' : 'fas fa-cloud-moon', 
        '03' : 'fas fa-cloud', 
        '04' : 'fas fa-cloud-moon', 
        '09' : 'fas fa-cloud-moon-rain', 
        '10' : 'fas fa-cloud-showers-heavy', 
        '11' : 'fas fa-poo-storm', 
        '13' : 'fas fa-snow-flake', 
        '50' : 'fas fa-water'}};
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(
        function(response){
            return response.json()
        }
    ).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const condition = json.weather["0"].main;
        var icon;
        const jsonIcon = (json.weather["0"].icon).substr(0,2);
        if(get_hours>=18){
             icon = weatherIcon["dinner"][jsonIcon];
        }else{
             icon = weatherIcon["evening"][jsonIcon];
        }
        weather_icon.className += icon;
        weather.innerText = `${condition} ${temperature}℃ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSoucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handelGeoError(){
    console.log("cant");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSoucces, handelGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();