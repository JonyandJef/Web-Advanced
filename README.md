# Weather Dashboard - Advanced Web App

A beautiful, interactive, and responsive Weather Dashboard built with Vanilla JavaScript, Vite, and the Open-Meteo API.

## Functionaliteiten
- **Zoeken**: Zoek actueel weer en de 24-uur weersverwachting per stad.
- **Filteren & Sorteren**: Filter weersvoorspellingen op minimum temperatuur en sorteer interactief op elke kolom (tijd, temperatuur, wind, etc.).
- **Personalisatie**: Sla je favoriete steden op via het sterretje, en wissel tussen Dark & Light mode. Beide voorkeuren worden onthouden via LocalStorage.
- **Animaties**: Vloeiende `fade-in` animaties voor opkomende content via IntersectionObserver, en dynamische hover animaties op de weerkaarten en knoppen.

## Installatiehandleiding
1. Zorg dat je [Node.js](https://nodejs.org/) geïnstalleerd hebt.
2. Run `npm install` in de map van dit project om alle afhankelijkheden te installeren.
3. Run `npm run dev` om de lokale server te starten.
4. Klik op de localhost link (bijv. `http://localhost:5173/`) in je terminal om de website te bekijken.

## Technische Requirements Check
- **DOM manipulation (Selecting elements)**: `src/js/ui.js` line 9 (`getElementById`)
- **DOM manipulation (Manipulating elements)**: `src/js/ui.js` line 37 (`setAttribute`)
- **DOM manipulation (Events aan elementen koppelen)**: `src/js/ui.js` line 62 (`addEventListener`)
- **Event Delegation**: `src/js/ui.js` line 68 (`addEventListener` op parent lijst)
- **Conditional (ternary) operator**: `src/js/ui.js` line 52
- **Template Literals**: `src/js/ui.js` line 170
- **Array iteration & iteration of data**: `src/js/ui.js` line 192 (`Array.from`) en line 256 (`forEach`)
- **Observer API**: `src/js/ui.js` line 298 (`IntersectionObserver`)
- **LocalStorage**: `src/js/storage.js` line 25
- **Modern JS (Arrow functions)**: `src/js/storage.js` line 14, `src/js/ui.js` line 59
- **Error Handling (Try/Catch)**: `src/js/main.js` line 23-25, `src/js/api.js` line 13

## Gebruikte Bronnen & AI-Chatlog
- **Weer API**: [Open-Meteo Weather API](https://open-meteo.com/en/docs)
- **Geocoding API**: [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- **AI-Chatlog**: [Plaats hier je link naar de AI chatlog]

## Screenshots
*(Plaats je screenshots in de map en wijzig de bestandsnamen hieronder of vervang deze image tags door echte bestanden via GitHub interface)*

![Dashboard Overzicht](./screenshot-dashboard.png)
![Dashboard Dark Mode](./screenshot-darkmode.png)

Used AI: https://gemini.google.com/share/776295b43639 