// ========== Weather API Configuration ========== 
// Using Open-Meteo API (Free, no API key needed)
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

let currentUnit = 'metric'; // metric or imperial
let currentTempSymbol = 'C';
let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

// ========== DOM Elements ========== 
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const suggestions = document.getElementById('suggestions');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const currentWeatherDiv = document.getElementById('currentWeather');
const unitBtns = document.querySelectorAll('.unit-btn');
const tabBtns = document.querySelectorAll('.tab-btn');

// ========== Event Listeners ========== 
searchBtn.addEventListener('click', searchWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchWeather();
});
searchInput.addEventListener('input', debounce(showSuggestions, 300));
locationBtn.addEventListener('click', getCurrentLocation);

// Unit toggle
unitBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        unitBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentUnit = e.target.getAttribute('data-unit');
        currentTempSymbol = e.target.getAttribute('data-symbol');
        document.getElementById('tempUnit').textContent = currentTempSymbol;
        if (searchHistory.length > 0) {
            fetchWeather(searchHistory[0].lat, searchHistory[0].lon, searchHistory[0].name);
        }
    });
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        tabBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        document.getElementById('hourlyForecast').classList.remove('active');
        document.getElementById('dailyForecast').classList.remove('active');
        
        const tabType = e.target.getAttribute('data-tab');
        if (tabType === 'hourly') {
            document.getElementById('hourlyForecast').classList.add('active');
        } else {
            document.getElementById('dailyForecast').classList.add('active');
        }
    });
});

// ========== Search Functions ========== 
async function showSuggestions() {
    const query = searchInput.value.trim();
    if (query.length < 2) {
        suggestions.classList.remove('show');
        return;
    }

    try {
        const response = await fetch(
            `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            suggestions.classList.remove('show');
            return;
        }

        suggestions.innerHTML = data.results.map(city => `
            <div class="suggestion-item" onclick="selectCity('${city.name}', '${city.admin1 || ''}', '${city.country}', ${city.latitude}, ${city.longitude})">
                <strong>${city.name}</strong>
                <span style="color: var(--muted-text); font-size: 0.9rem;">
                    ${city.admin1 ? city.admin1 + ', ' : ''}${city.country}
                </span>
            </div>
        `).join('');
        
        suggestions.classList.add('show');
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

function selectCity(name, admin, country, lat, lon) {
    searchInput.value = `${name}, ${country}`;
    suggestions.classList.remove('show');
    fetchWeather(lat, lon, name);
}

async function searchWeather() {
    const query = searchInput.value.trim();
    if (!query) return;

    // Check if input is coordinates
    const coordMatch = query.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lon = parseFloat(coordMatch[2]);
        fetchWeather(lat, lon, 'Location');
        return;
    }

    // Search for city
    try {
        showLoading(true);
        const response = await fetch(
            `${GEOCODING_API}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            showError('City not found. Please try again.');
            showLoading(false);
            return;
        }

        const city = data.results[0];
        fetchWeather(city.latitude, city.longitude, city.name);
    } catch (error) {
        showError('Error searching for city');
        console.error(error);
        showLoading(false);
    }
}

function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude, 'Current Location');
        },
        (error) => {
            showError('Unable to get your location: ' + error.message);
            showLoading(false);
        }
    );
}

// ========== Fetch Weather Data ========== 
async function fetchWeather(lat, lon, cityName) {
    try {
        showLoading(true);
        showError('');

        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl,visibility,cloud_cover',
            hourly: 'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
            daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
            temperature_unit: currentUnit === 'metric' ? 'celsius' : 'fahrenheit',
            wind_speed_unit: currentUnit === 'metric' ? 'kmh' : 'mph',
            timezone: 'auto',
            forecast_days: 5
        });

        const response = await fetch(`${WEATHER_API}?${params}`);
        const data = await response.json();

        addToSearchHistory(cityName, lat, lon);
        displayCurrentWeather(data, cityName);
        displayHourlyForecast(data);
        displayDailyForecast(data);
        showLoading(false);
    } catch (error) {
        showError('Error fetching weather data');
        console.error(error);
        showLoading(false);
    }
}

// ========== Display Current Weather ========== 
function displayCurrentWeather(data, cityName) {
    const current = data.current;
    const weatherCode = current.weather_code;
    const weatherDescription = getWeatherDescription(weatherCode);
    const weatherIcon = getWeatherIcon(weatherCode);

    // Get timezone offset for date
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('weatherDate').textContent = dateString;
    document.getElementById('temperature').textContent = Math.round(current.temperature_2m);
    document.getElementById('tempUnit').textContent = currentTempSymbol;
    document.getElementById('weatherIcon').src = weatherIcon;
    document.getElementById('weatherDescription').textContent = weatherDescription;
    document.getElementById('humidity').textContent = current.relative_humidity_2m + '%';
    document.getElementById('windSpeed').textContent = Math.round(current.wind_speed_10m * 10) / 10 + (currentUnit === 'metric' ? ' km/h' : ' mph');
    document.getElementById('pressure').textContent = current.pressure_msl + ' mb';
    document.getElementById('visibility').textContent = (current.visibility / 1000).toFixed(1) + ' km';
    document.getElementById('feelsLike').textContent = Math.round(current.apparent_temperature) + '°';
    document.getElementById('cloudCover').textContent = current.cloud_cover + '%';

    currentWeatherDiv.classList.add('active');
}

// ========== Display Hourly Forecast ========== 
function displayHourlyForecast(data) {
    const hourly = data.hourly;
    const times = hourly.time;
    const temps = hourly.temperature_2m;
    const weatherCodes = hourly.weather_code;
    const precipProb = hourly.precipitation_probability;

    const container = document.getElementById('hourlyForecast');
    container.innerHTML = '';

    // Show next 24 hours
    for (let i = 0; i < Math.min(24, times.length); i++) {
        const time = new Date(times[i]);
        const hour = time.getHours().toString().padStart(2, '0') + ':00';
        const temp = Math.round(temps[i]);
        const weatherCode = weatherCodes[i];
        const icon = getWeatherIcon(weatherCode);
        const desc = getWeatherDescription(weatherCode);
        const prob = precipProb[i];

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-time">${hour}</div>
            <img src="${icon}" alt="Weather" class="forecast-icon">
            <div class="forecast-temp">${temp}°</div>
            <div class="forecast-desc">${desc}</div>
            <div class="forecast-details">💧 ${prob}%</div>
        `;
        container.appendChild(card);
    }

    container.classList.add('active');
}

// ========== Display Daily Forecast ========== 
function displayDailyForecast(data) {
    const daily = data.daily;
    const dates = daily.time;
    const maxTemps = daily.temperature_2m_max;
    const minTemps = daily.temperature_2m_min;
    const weatherCodes = daily.weather_code;
    const precipitation = daily.precipitation_sum;

    const container = document.getElementById('dailyForecast');
    container.innerHTML = '';

    for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateNum = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const maxTemp = Math.round(maxTemps[i]);
        const minTemp = Math.round(minTemps[i]);
        const weatherCode = weatherCodes[i];
        const icon = getWeatherIcon(weatherCode);
        const desc = getWeatherDescription(weatherCode);
        const precip = precipitation[i];

        const card = document.createElement('div');
        card.className = 'forecast-card daily-card';
        card.innerHTML = `
            <div class="forecast-time">${dayName}, ${dateNum}</div>
            <img src="${icon}" alt="Weather" class="forecast-icon">
            <div class="daily-temps">
                <span class="temp-max">↑ ${maxTemp}°</span>
                <span class="temp-min">↓ ${minTemp}°</span>
            </div>
            <div class="forecast-desc">${desc}</div>
            <div class="forecast-details">💧 ${precip.toFixed(1)} mm</div>
        `;
        container.appendChild(card);
    }

    // Hide hourly by default, show daily
    document.getElementById('hourlyForecast').classList.remove('active');
    container.classList.add('active');
}

// ========== Weather Code to Description ========== 
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
}

// ========== Weather Code to Icon ========== 
function getWeatherIcon(code) {
    // Using open-meteo weather icon mapping
    if (code === 0) return 'https://www.open-meteo.com/images/weather_icons/clear_sky.svg';
    if (code === 1 || code === 2) return 'https://www.open-meteo.com/images/weather_icons/partly_cloudy.svg';
    if (code === 3) return 'https://www.open-meteo.com/images/weather_icons/cloudy.svg';
    if (code === 45 || code === 48) return 'https://www.open-meteo.com/images/weather_icons/fog.svg';
    if (code >= 51 && code <= 67) return 'https://www.open-meteo.com/images/weather_icons/rain.svg';
    if (code >= 71 && code <= 86) return 'https://www.open-meteo.com/images/weather_icons/snow.svg';
    if (code >= 80 && code <= 82) return 'https://www.open-meteo.com/images/weather_icons/rain.svg';
    if (code >= 85 && code <= 86) return 'https://www.open-meteo.com/images/weather_icons/snow.svg';
    if (code >= 95 && code <= 99) return 'https://www.open-meteo.com/images/weather_icons/thunderstorm.svg';
    return 'https://www.open-meteo.com/images/weather_icons/clear_sky.svg';
}

// ========== Helper Functions ========== 
function showLoading(show) {
    if (show) {
        loading.classList.add('active');
    } else {
        loading.classList.remove('active');
    }
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (message) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    } else {
        errorDiv.classList.remove('show');
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== Search History ========== 
function addToSearchHistory(name, lat, lon) {
    // Remove if already exists
    searchHistory = searchHistory.filter(item => !(item.lat === lat && item.lon === lon));
    
    // Add to beginning
    searchHistory.unshift({ name, lat, lon, date: new Date().toLocaleDateString() });
    
    // Keep only last 10
    searchHistory = searchHistory.slice(0, 10);
    
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
}

function displaySearchHistory() {
    if (searchHistory.length === 0) {
        document.getElementById('recentSearchesSection').classList.remove('show');
        return;
    }

    const historyDiv = document.getElementById('searchHistory');
    historyDiv.innerHTML = searchHistory.map((item, index) => `
        <div class="history-item" onclick="fetchWeather(${item.lat}, ${item.lon}, '${item.name}')">
            <div class="history-city">${item.name}</div>
            <div class="history-date">${item.date}</div>
        </div>
    `).join('');

    document.getElementById('recentSearchesSection').classList.add('show');
}

// ========== Initialize ========== 
document.addEventListener('DOMContentLoaded', () => {
    displaySearchHistory();
    
    // Auto-load weather for default city (e.g., New York)
    fetchWeather(40.7128, -74.0060, 'New York');
});
