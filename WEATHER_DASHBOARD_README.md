# 🌤️ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from a public API.

## ✨ Features

- 🌍 **Global City Search** - Search for any city in the world with autocomplete suggestions
- 📍 **Geolocation** - Get weather for your current location
- 📊 **Current Weather Display** - Temperature, humidity, wind speed, pressure, visibility, and more
- 📈 **Hourly Forecast** - 24-hour detailed forecast
- 📅 **5-Day Forecast** - Daily weather predictions
- 🌡️ **Temperature Toggle** - Switch between Celsius and Fahrenheit
- 💾 **Search History** - Save and quickly access recent searches (stored in localStorage)
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful dark theme with smooth animations
- ⚡ **No API Key Required** - Uses Open-Meteo free API

## 🚀 Quick Start

### 1. Open the Dashboard
Simply open `weather-dashboard.html` in your browser:
```bash
# Option 1: Direct file
- Navigate to: file:///path/to/weather-dashboard.html

# Option 2: Using Live Server (VS Code)
- Right-click on weather-dashboard.html
- Select "Open with Live Server"

# Option 3: Python HTTP Server
cd /path/to/Komire
python -m http.server 8000
# Then visit: http://localhost:8000/weather-dashboard.html
```

### 2. Use the Dashboard
- **Search Cities**: Type a city name in the search box, select from suggestions
- **Use GPS**: Click "My Location" button to get weather for your current location
- **View Forecast**: Switch between hourly and daily forecast tabs
- **Change Units**: Toggle between °C and °F using buttons in the bottom-right

## 📁 File Structure

```
weather-dashboard/
├── weather-dashboard.html   # Main HTML structure
├── weather-styles.css       # Styling and responsive design
├── weather-script.js        # JavaScript with API integration
└── README.md               # Documentation
```

## 🔧 Technical Details

### APIs Used
- **Open-Meteo Forecast API** - Real-time weather data (free, no key required)
- **Open-Meteo Geocoding API** - City search and coordinates lookup

### Data Displayed

**Current Weather:**
- Temperature (current & "feels like")
- Weather condition description
- Humidity percentage
- Wind speed (km/h or mph)
- Atmospheric pressure (mb)
- Visibility (km)
- Cloud cover percentage

**Hourly Forecast:**
- Temperature for next 24 hours
- Weather conditions
- Precipitation probability

**Daily Forecast:**
- High/Low temperatures
- Weather conditions
- Precipitation amount

## 🎯 How to Use

### Search for a City
```
1. Type city name (e.g., "London", "Tokyo", "New York")
2. Select from dropdown suggestions
3. Weather data loads automatically
```

### Use Your Location
```
1. Click the "My Location" button
2. Allow browser to access your location
3. Weather for your current coordinates loads
```

### Search by Coordinates
```
1. Enter coordinates as: latitude,longitude
2. Example: 40.7128,-74.0060 (New York)
3. Press search
```

### Switch Temperature Units
```
1. Click °C or °F buttons (bottom-right corner)
2. All temperatures update automatically
3. Preference is saved in localStorage
```

### View Recent Searches
```
1. Scroll to "Recent Searches" section
2. Click any previous search to reload weather
3. Last 10 searches are saved locally
```

## 🎨 Customization

### Change Color Scheme
Edit CSS variables in `weather-styles.css`:
```css
:root {
    --primary-color: #3498db;      /* Main color (blue) */
    --secondary-color: #2ecc71;    /* Success color (green) */
    --accent-color: #e74c3c;       /* Alert color (red) */
    --warning-color: #f39c12;      /* Warning color (orange) */
    --dark-bg: #1a1a2e;            /* Dark background */
    --card-bg: #16213e;            /* Card background */
}
```

### Change Default City
Edit the initialization in `weather-script.js`:
```javascript
// Line ~350 - Change these coordinates
fetchWeather(40.7128, -74.0060, 'New York');  // Default city on load
```

### Modify Forecast Duration
In `weather-script.js`, adjust the `forecast_days` parameter:
```javascript
forecast_days: 5  // Change this number (1-16 days available)
```

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Geolocation requires HTTPS or localhost

## 📊 API Response Example

```json
{
  "current": {
    "temperature_2m": 22.5,
    "relative_humidity_2m": 65,
    "weather_code": 2,
    "wind_speed_10m": 12.5,
    "pressure_msl": 1013.25
  },
  "hourly": {
    "time": ["2026-05-23T14:00", "2026-05-23T15:00"],
    "temperature_2m": [22.5, 23.1],
    "precipitation_probability": [10, 15]
  }
}
```

## 💾 Local Storage

The app saves:
- Search history (last 10 searches with coordinates and date)
- Key: `weatherHistory`

## 🔒 Privacy

- No personal data is collected
- Location data is used only for weather lookup
- All data processing happens locally in the browser
- Open-Meteo API doesn't require authentication

## 🐛 Troubleshooting

### Weather data not loading
- Check internet connection
- Verify Open-Meteo API is accessible
- Check browser console for errors (F12)

### Geolocation not working
- Ensure you're on HTTPS or localhost
- Allow location permission in browser
- Check browser geolocation settings

### Icons not showing
- Verify internet connection (icons load from CDN)
- Check if open-meteo.com is accessible

### Search suggestions not appearing
- Wait a moment while typing
- Ensure at least 2 characters typed
- Check for typos in city name

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
# Your files are already in GitHub
# Go to Settings > Pages
# Select branch 'main'
# URL will be: https://vannzy220.github.io/Komire/weather-dashboard.html
```

### Deploy to Netlify
```bash
# Drag and drop the weather-dashboard.html and related files
# Or connect your GitHub repository
```

### Deploy to Vercel
```bash
# Import from GitHub repository
# Automatic deployment on push
```

## 📝 Code Features

- **Vanilla JavaScript** - No frameworks or dependencies
- **Async/Await** - Clean asynchronous API calls
- **Local Storage** - Persistent search history
- **Responsive Grid** - Mobile-first design
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during data fetching
- **Debouncing** - Optimized search suggestions

## 🎓 Learning Resources

This dashboard demonstrates:
- Fetch API and async/await
- Working with third-party APIs
- DOM manipulation and event handling
- LocalStorage for client-side persistence
- Responsive CSS Grid and Flexbox
- Weather API integration without authentication

## 📄 License

Open source - Free to use and modify

## 🔗 Useful Links

- [Open-Meteo Documentation](https://open-meteo.com/en/docs)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

**Made with ❤️ for weather enthusiasts**
