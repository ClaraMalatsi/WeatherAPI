const apiKey = '4e47615a6232ea202cc28959e89d7ccb'; // Replace with your OpenWeatherMap API key

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});

document.getElementById('currentLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, () => {
            alert('Geolocation service failed.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

function fetchWeather(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Weather icon

    weatherResult.innerHTML = `
        <h2>Weather in ${city}</h2>
        <img src="${icon}" alt="${description}">
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}
