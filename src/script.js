let fahrenheitTemperature = null;
let celsiusTemperature = null;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();

  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
 
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class = "row">';
  let days = ["Thu", "Fri", "Sat","Sun","Mon","Tue"];

  days.forEach(function (day) {
    forecastHTML += `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img src="http://openweathermap.org/img/wn/01d.png" alt="" width="36" />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">82°</span>
          <span class="weather-forecast-temperature-min">53°</span>
        </div>
      </div>`;
  });

  forecastHTML += '</div>';
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let precipitationElement = document.querySelector("#precipitation");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let temperatureInFahrenheit = response.data.main.temp;
  let temperatureInCelsius = ((temperatureInFahrenheit - 32) * 5) / 9;

  temperatureElement.innerHTML = Math.round(temperatureInFahrenheit) + "°F";
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  if (response.data.hasOwnProperty("rain")) {
    precipitationElement.innerHTML = response.data.rain["1h"] + "mm";
  } else {
    precipitationElement.innerHTML = "N/A";
  }

  dateElement.innerHTML = formatDate(response.data.dt);

  fahrenheitTemperature = temperatureInFahrenheit;
  celsiusTemperature = temperatureInCelsius;
}

function search(city) {
  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C";
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "°F";
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

search("Memphis");
displayForecast();