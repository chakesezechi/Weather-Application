// api key : e7351e78127bf42cf6121f7cb7225706


// SELECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const weatherIcon = document.querySelector(".weather-icon");
const temperatureValue = document.querySelector(".temperature-value p");
const temperatureDescription = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

// const searchInput = document.querySelector("#search-input");
// const searchButton = document.querySelector("#search-button");







// App data
const weather = {};

weather.temperature = {
  unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = "e7351e78127bf42cf6121f7cb7225706";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION 
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}


// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}


// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){

  //const proxy = "https://cors-anywhere.herokuapp.com/";
  
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;


  fetch(api)
    .then(function(response){                 // or arrow function (response =>{}) 
        let data = response.json();
        return data;
    })
    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        console.log(data);
    })
    .then(function() {
        displayWeather();
    });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
  weatherIcon.innerHTML = `<img src="icons/${weather.iconId}.png">`;
  temperatureValue.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  temperatureDescription.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}


// C to F conversion
function celsuisToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
  temperatureValue.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return

    if(weather.temperature.unit === "celsuis"){
      let fahrenheit = celsuisToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      temperatureValue.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
    } else {
      temperatureValue.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsuis";
    }
  });