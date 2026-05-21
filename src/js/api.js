/**
 * api.js
 * Handles API requests to Open-Meteo
 */

export class WeatherAPI {
  /**
   * Fetches coordinates for a given city name
   * @param {string} city - The name of the city
   * @returns {Promise<Object>} Location data including latitude and longitude
   */
  static async getCoordinates(city) {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('Location not found');
      }
      return data.results[0];
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  }

  /**
   * Fetches weather data for given coordinates
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Weather data
   */
  static async getWeather(lat, lon) {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}
