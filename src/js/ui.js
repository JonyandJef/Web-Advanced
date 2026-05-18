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
  }
};
