import cloudsImg from "images/clouds.png";
import clearImg from "images/clear.png";
import drizzleImg from "images/drizzle.png";
import mistImg from "images/mist.png";
import rainImg from "images/rain.png";

const apiKey = "ab3a23138e69fba38257eccdefe5b378";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city) return; 

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°F";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " mph";

    const condition = data.weather?.[0]?.main;

    switch (condition) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("API error:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
