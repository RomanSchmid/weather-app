const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const uvIndex = document.querySelector(".uv-index");

const city = document.getElementById("city")
const cityInfo = document.getElementById("city-info");
const forecast = document.getElementById("forecast");

const refreshTime = document.getElementById("refresh-time");
let timer = 1;

let timeUpdate;
function resetTimer() {
  clearInterval(timeUpdate);
  refreshTime.innerText = "";
  timeUpdate = setInterval(() => {
    refreshTime.innerText = `Last update ${timer} minutes ago`;
    timer++;
  }, 60000);
}

function getWeather() {
  resetTimer();
  fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city.innerText + "?unitGroup=metric&key=WD49RMATTW3ARZ4FQ3AQAC239&contentType=json")
	.then(response => response.json())
	.then(response => {
    /* console.log(response); */
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

getWeather();
setInterval(getWeather, 300000);

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  getWeather();
});

const anotherCity = document.querySelector(".another-city");
const contentToHide = document.querySelector(".content-to-hide");
//Display optional city and hide everything else
city.addEventListener("click", () => {
  anotherCity.classList.toggle("display-block");
  contentToHide.classList.toggle("display-none");
})

//Toggle between cities
anotherCity.addEventListener("click", () => {
  let curCity = city.innerText;
  let newCity = anotherCity.innerText;
  city.innerText = newCity;
  anotherCity.innerText = curCity;
  anotherCity.classList.toggle("display-block");
  contentToHide.classList.toggle("display-none");
  getWeather();
})