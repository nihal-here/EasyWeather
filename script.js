document.addEventListener("DOMContentLoaded", function () {
  const url = "http://api.weatherapi.com/v1";
  const key = "8c34507699fd44998f8144303230712";

  const form = document.querySelector("form");
  const search = document.querySelector(".search");
  const cities = document.querySelector(".cities");
  const errorDiv = document.querySelector(".error");
  const weatherDiv = document.querySelector(".weather");
  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const descElement = document.querySelector(".desc");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const aqiELement = document.querySelector(".aqi");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = search.value;
    if (city) {
      getWeather(city);
    } else {
      displayError("Please enter a city");
    }
  });

  async function getWeather(city) {
    try {
      const response = await fetch(
        `${url}/current.json?key=${key}&q=${city}&aqi=yes`
      );
      if (!response.ok) {
        throw new Error(`HTTP ERROR! Status:${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      displayWeather(data);
      search.value = "";
    } catch (error) {
      console.error("Error fetching weather data", error);
      displayError("Error fetching weather data. Please try again.");
    }
  }

  //   async function getForecast(city) {
  //       try{
  //         const response=await fetch(`${url}/`)
  //       }
  //   }

  function displayWeather(data) {
    const city = data.location.name;
    const temp = data.current.temp_c;
    const desc = data.current.condition.text;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const aqi = data.current.air_quality.pm2_5;

    cityElement.textContent = city;
    tempElement.textContent = `Temperature:${temp}°C`;
    descElement.textContent = `Condition:${desc}`;
    humidityElement.textContent = `Humidity:${humidity}%`;
    windElement.textContent = `Wind:${wind}km/h`;
    aqiELement.textContent = `Air Quality Index:
    ${aqi}`;

    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";
  }

  function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    weatherDiv.style.display = "none";
  }
});
