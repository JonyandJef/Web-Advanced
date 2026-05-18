/**
 * main.js
 * Application entry point
 */

import { UI } from './ui.js';

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('App initialization started...');
  
  // Initialize UI components and state
  UI.initTheme();
  UI.bindEvents();
  
  console.log('App successfully initialized.');
});
