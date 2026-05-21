/**
 * ui.js
 * Handles DOM manipulation and UI state updates
 */

import { StorageManager } from './storage.js';

// Technical Requirement: DOM manipulation (Selecting elements)
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

export const UI = {
  /**
   * Initialize theme based on saved preference
   */
  initTheme: () => {
    const savedTheme = StorageManager.getTheme();
    UI.applyTheme(savedTheme);
  },

  /**
   * Apply a specific theme and update UI
   * @param {string} theme 'light' or 'dark'
   */
  applyTheme: (theme) => {
    // Technical Requirement: DOM manipulation (Manipulating elements)
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
      // Update icon to sun for dark mode
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    } else {
      htmlElement.removeAttribute('data-theme');
      // Update icon to moon for light mode
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    }
  },

  /**
   * Toggle between light and dark theme
   */
  toggleTheme: () => {
    // Technical Requirement: Conditional (ternary) operator
    const currentTheme = htmlElement.hasAttribute('data-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    UI.applyTheme(newTheme);
    StorageManager.saveTheme(newTheme);
  },
  
  /**
   * Bind event listeners to UI elements
   */
  bindEvents: () => {
    // Technical Requirement: DOM manipulation (Events aan elementen koppelen)
    if (themeBtn) {
      themeBtn.addEventListener('click', UI.toggleTheme);
    }
  },
  
  /**
   * Render weather data to the DOM using template literals and array iteration
   * @param {Object} location - Location object with name, country, etc.
   * @param {Object} weatherData - Weather data from Open-Meteo
   */
  renderWeather: (location, weatherData) => {
    const displayElement = document.getElementById('weather-display');
    if (!displayElement) return;

    const current = weatherData.current;
    const hourly = weatherData.hourly;

    // Technical Requirement: Template Literals
    const cardHTML = `
      <div class="weather-card">
        <h3>${location.name}, ${location.country}</h3>
        <div class="current-weather">
          <div class="temp-big">${current.temperature_2m}°C</div>
          <div class="weather-details">
            <p>Feels like: ${current.apparent_temperature}°C</p>
            <p>Precipitation: ${current.precipitation}mm</p>
            <p>Wind: ${current.wind_speed_10m}km/h</p>
          </div>
        </div>
      </div>
    `;

    let tableHTML = `
      <div class="forecast-table-container">
        <h3>24-Hour Forecast</h3>
        <table class="forecast-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Temp (°C)</th>
              <th>Feels Like (°C)</th>
              <th>Precip. (mm)</th>
              <th>Wind (km/h)</th>
              <th>Wind Dir (°)</th>
            </tr>
          </thead>
          <tbody>
    `;

    // Technical Requirement: Array iteration & iteration of data
    // Create an array of 24 indices representing the next 24 hours
    const next24Hours = Array.from({ length: 24 }, (_, i) => i);
    
    next24Hours.forEach(i => {
        const timeStr = new Date(hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        tableHTML += `
            <tr>
                <td>${timeStr}</td>
                <td>${hourly.temperature_2m[i]}</td>
                <td>${hourly.apparent_temperature[i]}</td>
                <td>${hourly.precipitation[i]}</td>
                <td>${hourly.wind_speed_10m[i]}</td>
                <td>${hourly.wind_direction_10m[i]}</td>
            </tr>
        `;
    });

    tableHTML += `
          </tbody>
        </table>
      </div>
    `;

    // Update DOM
    displayElement.innerHTML = `<h2>Current Weather</h2>` + cardHTML + tableHTML;
  },
  
  /**
   * Display error messages
   */
  showError: (message) => {
    const displayElement = document.getElementById('weather-display');
    if (displayElement) {
        displayElement.innerHTML = `
          <h2>Current Weather</h2>
          <div class="error-box">
             <p>Error: ${message}</p>
          </div>
        `;
    }
  }
};
