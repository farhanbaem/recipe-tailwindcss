// OpenWeatherMap API configuration

// 1. API Configuration

const API_KEY ='c90af758c835d6229bb1254499ce181d';// Replace with your OpenWeatherMap API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 2. Button Click Event
document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();

    if (!city) {
        displayError('Please enter a city name.');
        return;
    }

    try {
        
        // 3. Fetching Weather data
        const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        
        // 4. Error Handling
        if (!response.ok) {
            throw new Error(`City not found.`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
});

// 5. Displaying Weather Data
function displayWeather(data) {
    const { name, main, weather } = data;

    const weatherHTML = `
        <h2 class="text-xl font-bold">${name}</h2>
        <p class="text-lg">${weather[0].description}</p>
        <p class="text-2xl font-bold">${main.temp}°C</p>
        <p class="text-sm text-gray-500">Feels like: ${main.feels_like}°C</p>
        <p class="text-sm text-gray-500">Humidity: ${main.humidity}%</p>
    `;

    document.getElementById('weatherResult').innerHTML = weatherHTML;
}

//6. Display error messages
function displayError(message) {
    document.getElementById('weatherResult').innerHTML = `
        <p class="text-red-500 font-bold">${message}</p>
    `;
}
