async function fetchData() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

const success = async (position) => {
  const { latitude, longitude } = position.coords;
  const API_KEY = "b78b13aa3df93dea9d50f7668df655c8";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  const weatherData = await res.json();
  document.getElementById("city-name").innerHTML = weatherData.name;
  document.getElementById("temperature").innerHTML =
    weatherData.main.temp + " \u00B0C";
  document.getElementById("weather-description").innerHTML =
    weatherData.weather[0].description;
  document.getElementById("wind-speed").innerHTML =
    weatherData.wind.speed + " km/h";
  document.getElementById("humidity").innerHTML = weatherData.main.humidity;
  const date = new Date();
  const hour = date.getHours();
  const mins = date.getMinutes();
  const sec = date.getSeconds();
  const currentTime = `${hour}:${mins}:${sec}`;
  document.getElementById("current-time").innerHTML = currentTime;
  const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  document.getElementById("weather-icon").src = iconURL;
};

const error = () => {
  alert("Something Went Wrong");
};
fetchData();
