function displayTemperature(response) {
  console.log(response.data.main.temp);
  console.log(response.data);

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
  precipitationElement.innerHTML = response.data.main.percipitation;
  dateElement.innerHTML = "Friday 7:11";
}
let apiKey = "729ec012e09d75893dd32df26e7e21a4";
let city = "Memphis";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);