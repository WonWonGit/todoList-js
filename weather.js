const API_KEY = "856dd9e10e514598dbfa24f7d013cb3a";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const weather_icon = document.querySelector("i");

function getWeather(lat, lon){
    let weatherIcon = { 
        '01' : '☀️☀️', 
        '02' : '⛅️⛅', 
        '03' : '☁️☁️', 
        '04' : '☁️🌫', 
        '09' : '☔️☔️', 
        '10' : '🌧🌧', 
        '11' : '🌩🌩', 
        '13' : '❄️☃️', 
        '50' : '🌫🌫' };
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
        const icon = weatherIcon[(json.weather["0"].icon).substr(0,2)];
        weather.innerText = `${icon} ${condition} ${temperature}℃ ${place}`;
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