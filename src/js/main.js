/**
 * main.js
 * Application entry point
 */

import { UI } from './ui.js';
import { WeatherAPI } from './api.js';

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('App initialization started...');
  
  // Initialize UI components and state
  UI.initTheme();
  UI.bindEvents();
  
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchError = document.getElementById('search-error');
  
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const city = searchInput.value.trim();
      
      // Technical Requirement: Form Validation
      if (city.length < 2) {
        searchError.textContent = 'Please enter a valid city name (at least 2 characters).';
        return;
      }
      searchError.textContent = '';
      
      try {
        const location = await WeatherAPI.getCoordinates(city);
        const weatherData = await WeatherAPI.getWeather(location.latitude, location.longitude);
        UI.renderWeather(location, weatherData);
      } catch (error) {
        searchError.textContent = 'Could not fetch weather data. Please try again.';
      }
    });
  }
  
  // Load default city (Amsterdam) for Step 2 demonstration
  try {
    const location = await WeatherAPI.getCoordinates('Amsterdam');
    const weatherData = await WeatherAPI.getWeather(location.latitude, location.longitude);
    UI.renderWeather(location, weatherData);
  } catch (error) {
    UI.showError(error.message);
  }
  
  console.log('App successfully initialized.');
});
