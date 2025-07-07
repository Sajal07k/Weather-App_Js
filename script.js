const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const weatherBody = document.querySelector('.weather-body');

const locationNotFound = document.querySelector('.location_not_found');

async function checkWeather(city) {
    const api_key = "94c7fee5353c5186aaacb78ec392769a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    let weather_Data = await fetch(`${url}`).then(response => response.json()); // fetch always return a promise

    if(weather_Data.cod == `404`) {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }

    // console.log("API URL:", url);
    // console.log(weather_Data);
    weatherBody.style.display = "flex";
    locationNotFound.style.display = "none";
    temperature.innerHTML = `${Math.round(weather_Data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_Data.weather[0].description}`;
    humidity.innerHTML = `${weather_Data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_Data.wind.speed}Km/h`;

    switch(weather_Data.weather[0].main) {
        case 'Clouds':
            weather_img.src = 'images/cloud.png';
            break;
        case 'Clear':
            weather_img.src = 'images/clear.png';
            break;
        case 'Rain':
            weather_img.src = 'images/rain.png';
            break;
        case 'Mist':
            weather_img.src = 'images/mist.png';
            break;
        case 'Snow':
            weather_img.src = 'images/snow.png';
            break;
    }
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});