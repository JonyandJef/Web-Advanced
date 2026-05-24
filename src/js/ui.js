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
  state: {
    location: null,
    weatherData: null,
    sortCol: 'time',
    sortAsc: true,
    minTempFilter: ''
  },
  
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
  
  bindEvents: () => {
    // Technical Requirement: DOM manipulation (Events aan elementen koppelen)
    if (themeBtn) {
      themeBtn.addEventListener('click', UI.toggleTheme);
    }
    
    // Technical Requirement: Event Delegation
    const favoritesList = document.getElementById('favorites-list');
    if (favoritesList) {
      favoritesList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-fav-btn')) {
          e.stopPropagation();
          const name = e.target.dataset.name;
          let favorites = StorageManager.getFavorites();
          favorites = favorites.filter(f => f.name !== name);
          StorageManager.saveFavorites(favorites);
          UI.renderFavorites();
          
          if (UI.state.location && UI.state.location.name === name) {
            UI.renderWeatherView();
          }
        } else {
          const item = e.target.closest('.favorite-item');
          if (item) {
            const location = {
              name: item.dataset.name,
              country: item.dataset.country,
              latitude: item.dataset.lat,
              longitude: item.dataset.lon
            };
            document.dispatchEvent(new CustomEvent('loadWeather', { detail: { location } }));
          }
        }
      });
    }
  },
  
  toggleFavorite: (location) => {
    let favorites = StorageManager.getFavorites();
    const index = favorites.findIndex(f => f.name === location.name);
    
    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push({
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
    
    StorageManager.saveFavorites(favorites);
    UI.renderWeatherView(); 
    UI.renderFavorites();   
  },

  renderFavorites: () => {
    const listElement = document.getElementById('favorites-list');
    if (!listElement) return;
    
    const favorites = StorageManager.getFavorites();
    
    if (favorites.length === 0) {
      listElement.innerHTML = `<li class="empty-state">No favorites yet</li>`;
      return;
    }
    
    listElement.innerHTML = favorites.map(fav => `
      <li class="favorite-item" data-lat="${fav.latitude}" data-lon="${fav.longitude}" data-name="${fav.name}" data-country="${fav.country}">
        <span class="fav-name">${fav.name}, ${fav.country}</span>
        <button class="remove-fav-btn" data-name="${fav.name}" aria-label="Remove favorite">&times;</button>
      </li>
    `).join('');
  },

  /**
   * Render weather data to the DOM using template literals and array iteration
   * @param {Object} location - Location object with name, country, etc.
   * @param {Object} weatherData - Weather data from Open-Meteo
   */
  renderWeather: (location, weatherData) => {
    UI.state.location = location;
    UI.state.weatherData = weatherData;
    UI.renderWeatherView();
  },

  handleSort: (column) => {
    if (UI.state.sortCol === column) {
      UI.state.sortAsc = !UI.state.sortAsc;
    } else {
      UI.state.sortCol = column;
      UI.state.sortAsc = true;
    }
    UI.renderWeatherView();
  },

  handleFilter: (e) => {
    UI.state.minTempFilter = e.target.value;
    UI.renderWeatherView();
  },

  renderWeatherView: () => {
    const displayElement = document.getElementById('weather-display');
    if (!displayElement || !UI.state.weatherData) return;

    const current = UI.state.weatherData.current;
    const hourly = UI.state.weatherData.hourly;
    const location = UI.state.location;

    // Technical Requirement: Template Literals
    const isFavorite = StorageManager.getFavorites().some(f => f.name === location.name);
    const favButtonText = isFavorite ? '★ Saved' : '☆ Save to Favorites';
    const favButtonClass = isFavorite ? 'fav-btn active' : 'fav-btn';

    const cardHTML = `
      <div class="weather-card fade-in">
        <div class="weather-header">
          <h3>${location.name}, ${location.country}</h3>
          <button class="${favButtonClass}" id="save-fav-btn">${favButtonText}</button>
        </div>
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

    // Process data for the table (next 24 hours)
    let forecastData = Array.from({ length: 24 }, (_, i) => ({
      index: i,
      time: new Date(hourly.time[i]),
      timeStr: new Date(hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: hourly.temperature_2m[i],
      feelsLike: hourly.apparent_temperature[i],
      precip: hourly.precipitation[i],
      wind: hourly.wind_speed_10m[i],
      windDir: hourly.wind_direction_10m[i]
    }));

    // Filtering functionality
    if (UI.state.minTempFilter !== '') {
      const minTemp = parseFloat(UI.state.minTempFilter);
      if (!isNaN(minTemp)) {
        forecastData = forecastData.filter(item => item.temp >= minTemp);
      }
    }

    // Sorting functionality
    forecastData.sort((a, b) => {
      let valA = a[UI.state.sortCol];
      let valB = b[UI.state.sortCol];
      if (UI.state.sortCol === 'time') {
        valA = valA.getTime();
        valB = valB.getTime();
      }
      
      if (valA < valB) return UI.state.sortAsc ? -1 : 1;
      if (valA > valB) return UI.state.sortAsc ? 1 : -1;
      return 0;
    });

    const getSortIcon = (col) => {
      if (UI.state.sortCol !== col) return '↕';
      return UI.state.sortAsc ? '↑' : '↓';
    };

    let tableHTML = `
      <div class="forecast-table-container fade-in">
        <div class="controls-bar">
          <h3>Forecast Data</h3>
          <div class="filter-group">
            <label for="min-temp-filter">Min Temp (°C):</label>
            <input type="number" id="min-temp-filter" value="${UI.state.minTempFilter}" placeholder="e.g. 10">
          </div>
        </div>
        <table class="forecast-table">
          <thead>
            <tr>
              <th class="sortable" data-col="time">Time ${getSortIcon('time')}</th>
              <th class="sortable" data-col="temp">Temp (°C) ${getSortIcon('temp')}</th>
              <th class="sortable" data-col="feelsLike">Feels Like (°C) ${getSortIcon('feelsLike')}</th>
              <th class="sortable" data-col="precip">Precip. (mm) ${getSortIcon('precip')}</th>
              <th class="sortable" data-col="wind">Wind (km/h) ${getSortIcon('wind')}</th>
              <th class="sortable" data-col="windDir">Wind Dir (°) ${getSortIcon('windDir')}</th>
            </tr>
          </thead>
          <tbody>
    `;

    if (forecastData.length === 0) {
      tableHTML += `<tr><td colspan="6" class="text-center" style="padding: 2rem;">No data matches your filters.</td></tr>`;
    } else {
      forecastData.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item.timeStr}</td>
                <td>${item.temp}</td>
                <td>${item.feelsLike}</td>
                <td>${item.precip}</td>
                <td>${item.wind}</td>
                <td>${item.windDir}</td>
            </tr>
        `;
      });
    }

    tableHTML += `
          </tbody>
        </table>
      </div>
    `;

    displayElement.innerHTML = `<h2>Current Weather</h2>` + cardHTML + tableHTML;

    // Attach event listeners for sort and filter
    document.querySelectorAll('.sortable').forEach(th => {
      th.addEventListener('click', (e) => {
        UI.handleSort(e.target.dataset.col);
      });
    });

    const filterInput = document.getElementById('min-temp-filter');
    if (filterInput) {
      filterInput.addEventListener('input', UI.handleFilter);
    }
    
    const favBtn = document.getElementById('save-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        UI.toggleFavorite(location);
      });
    }

    // Technical Requirement: Observer API
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
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
