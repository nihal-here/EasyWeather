document.addEventListener("DOMContentLoaded", function () {
  const url = "http://api.weatherapi.com/v1";
  const key = "8c34507699fd44998f8144303230712";

  const form = document.querySelector("form");
  const search = document.querySelector(".search");
  const errorDiv = document.querySelector(".error");
  const weatherDiv = document.querySelector(".weather");
  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const conditionElement = document.querySelector(".condition-text");
  const conditionIconElement = document.querySelector(".conditionIcon");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const aqiELement = document.querySelector(".aqi");

  const forecastDiv = document.querySelector(".forecast");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = search.value.trim();
    if (city) {
      getWeather(city);
      getForecast(city);
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
      displayCurrentWeather(data);
      search.value = "";
    } catch (error) {
      console.error("Error fetching weather data", error);
      displayError("Error fetching weather data. Please try again.");
    }
  }

  async function getForecast(city) {
    try {
      const response = await fetch(
        `${url}/forecast.json?key=${key}&q=${city}&days=5&aqi=yes&alerts=no`
      );
      if (!response.ok) {
        throw new Error(`HTTP ERROR! status:${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      displayWeatherForecast(data);
      search.value = "";
    } catch (error) {
      console.error("Error fetching weather data", error);
      displayError("Error fetching weather data. Please try again.");
    }
  }

  function displayCurrentWeather(data) {
    const city = data.location.name;
    const temp = data.current.temp_c;
    const desc = data.current.condition.text;
    const descIcon = data.current.condition.icon;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const aqi = data.current.air_quality.pm2_5;

    cityElement.textContent = city;
    conditionIconElement.src = descIcon;
    conditionElement.textContent = `Condition:${desc}`;
    tempElement.textContent = `Temperature:${temp}°C`;
    humidityElement.textContent = `Humidity:${humidity}%`;
    windElement.textContent = `Wind:${wind}km/h`;
    aqiELement.textContent = `Air Quality Index:
    ${aqi}`;

    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";
  }

  function displayWeatherForecast(data) {
    const forecastDays = data.forecast.forecastday;

    forecastDiv.innerHTML = "";

    forecastDays.forEach((day) => {
      const date = day.date;
      const conditiontText = day.day.condition.text;
      const conditionIcon = day.day.condition.icon;
      const maxTemp = day.day.maxtemp_c;
      const minTemp = day.day.mintemp_c;
      const avgTemp = day.day.avgtemp_c;
      const maxwindKph = day.day.maxwind_kph;
      const totalprecip = day.day.totalprecip_mm;
      const avgHumidity = day.day.avghumidity;
      const avgVisibilityKM = day.day.avgvis_km;
      const uvIndex = day.day.uv;

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");

      const dateElement = document.createElement("p");
      dateElement.classList.add("date");
      dateElement.textContent = date;

      const conditionIconElement = document.createElement("img");
      conditionIconElement.classList.add("condition-icon");
      conditionIconElement.src = conditionIcon;

      const conditionTextElement = document.createElement("p");
      conditionTextElement.classList.add("condition-text");
      conditionTextElement.textContent = conditiontText;

      const maxTempElement = document.createElement("p");
      maxTempElement.textContent = `Max Temp: ${maxTemp}°C`;

      const minTempElement = document.createElement("p");
      minTempElement.textContent = `Min Temp: ${minTemp}°C`;

      const avgTempElement = document.createElement("p");
      avgTempElement.textContent = `Avg Temp: ${avgTemp}°C`;

      const maxwindKphElement = document.createElement("p");
      maxwindKphElement.textContent = `Max Wind: ${maxwindKph}km/h`;

      const totalprecipElement = document.createElement("p");
      totalprecipElement.textContent = `Total precip: ${totalprecip}mm`;

      const avgHumidityElement = document.createElement("p");
      avgHumidityElement.textContent = `Avg Humidity: ${avgHumidity}%`;

      const avgVisibilityKMElement = document.createElement("p");
      avgVisibilityKMElement.textContent = `Avg Visibility: ${avgVisibilityKM}km`;

      const uvIndexElement = document.createElement("p");
      uvIndexElement.textContent = `UV Index: ${uvIndex}`;

      forecastItem.appendChild(dateElement);
      forecastItem.appendChild(conditionIconElement);
      forecastItem.appendChild(conditionTextElement);
      forecastItem.appendChild(maxTempElement);
      forecastItem.appendChild(minTempElement);
      forecastItem.appendChild(avgTempElement);
      forecastItem.appendChild(maxwindKphElement);
      forecastItem.appendChild(totalprecipElement);
      forecastItem.appendChild(avgHumidityElement);
      forecastItem.appendChild(avgVisibilityKMElement);
      forecastItem.appendChild(uvIndexElement);

      forecastDiv.appendChild(forecastItem);
    });
    forecastDiv.style.display = "flex";
    errorDiv.style.display = "none";
  }
  function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    weatherDiv.style.display = "none";
    forecastDiv.style.display = "none";
  }
});
