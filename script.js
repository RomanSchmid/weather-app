const fetchURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Praha?unitGroup=metric&key=WD49RMATTW3ARZ4FQ3AQAC239&contentType=json";

const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const uvIndex = document.querySelector(".uv-index");

const city = document.querySelector(".container h1");
const cityInfo = document.querySelector(".container p");
const forecast = document.querySelector(".container h2");

const refreshTime = document.getElementById("refresh-time");
let timer = 1;

function getWeather() {
  console.log("test");
  fetch(fetchURL)
	.then(response => response.json())
	.then(response => {
    city.innerText = response.address;
    cityInfo.innerText = response.resolvedAddress;
    forecast.innerText = response.description;

    temperature.innerText = `${response.currentConditions.temp} °C`;
    feelsLike.innerText = `${response.currentConditions.feelslike} °C`;
    humidity.innerText = `${response.currentConditions.humidity} %`;
    pressure.innerText = `${response.currentConditions.pressure} hPa`;
    uvIndex.innerText = response.currentConditions.uvindex;
  })
	.catch(err => console.error(err));

  //Reset refresh timer
  timer = 1;
}

const timeUpdate = setInterval(() => {
  refreshTime.innerText = `Last update ${timer} minutes ago`;
  timer++;
}, 60000);

getWeather();
setInterval(getWeather, 300000);

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  refreshTime.innerText = "";
  getWeather();
});