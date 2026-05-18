/**
 * storage.js
 * Handles reading from and writing to LocalStorage
 */

const THEME_KEY = 'weather_dashboard_theme';
const FAVORITES_KEY = 'weather_dashboard_favorites';

export const StorageManager = {
  /**
   * Get preferred theme from LocalStorage
   * @returns {string} 'light' or 'dark'
   */
  getTheme: () => {
    // Technical Requirement: Modern JS (Arrow functions)
    return localStorage.getItem(THEME_KEY) || 'light';
  },

  /**
   * Save preferred theme to LocalStorage
   * @param {string} theme 
   */
  saveTheme: (theme) => {
    // Technical Requirement: LocalStorage
    localStorage.setItem(THEME_KEY, theme);
  },

  /**
   * Get saved favorites
   * @returns {Array} Array of favorite locations
   */
  getFavorites: () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  /**
   * Save favorites array
   * @param {Array} favorites 
   */
  saveFavorites: (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};
