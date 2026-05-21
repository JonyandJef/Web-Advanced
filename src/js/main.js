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
