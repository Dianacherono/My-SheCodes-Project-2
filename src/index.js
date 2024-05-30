function refreshWeatherPage(result) {
  let temperatureValue = document.querySelector("#temperature");
  let temperature = result.data.temperature.current;
  let cityValue = document.querySelector("#city");
  let descriptionValue = document.querySelector("#description");
  let humidityValue = document.querySelector("#humidity");
  let windSpeedValue = document.querySelector("#wind-speed");
  let timeValue = document.querySelector("#time");
  let date = new Date(result.data.time * 1000);
  let iconValue = document.querySelector("#icon");

  cityValue.innerHTML = result.data.city;
  timeValue.innerHTML = dateUpdate(date);
  descriptionValue.innerHTML = result.data.condition.description;
  humidityValue.innerHTML = `${result.data.temperature.humidity}%`;
  windSpeedValue.innerHTML = `${result.data.wind.speed}km/h`;
  temperatureValue.innerHTML = Math.round(temperature);
  iconValue.innerHTML = `<img src="${result.data.condition.icon_url}" class="weather_app_icon" />`;
}

function dateUpdate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function currentCity(city) {
  let apiKey = "0e436o1d84aebftf2dab3947e4a43d3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeatherPage);
}

function searchInputSubmission(event) {
  event.preventDefault();
  let formInput = document.querySelector("#search-input");

  currentCity(formInput.value);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", searchInputSubmission);

currentCity("Dublin");
