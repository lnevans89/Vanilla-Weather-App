function formatDate(timestamp) {
  let date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Ensure that the minutes are displayed with leading zeros if they are less than 10
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let precipitationElement = document.querySelector("#precipitation");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°F";
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  // Note: Typo in "precipitation" fixed, and it's better to check if the field exists in the response
  if (response.data.hasOwnProperty("rain")) {
    precipitationElement.innerHTML = response.data.rain["1h"] + "mm";
  } else {
    precipitationElement.innerHTML = "N/A";
  }

  dateElement.innerHTML = formatDate(response.data.dt);
}

let apiKey = "729ec012e09d75893dd32df26e7e21a4";
let city = "Memphis";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
