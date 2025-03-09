// Select HTML elements in the document
const locationElement = document.querySelector('#location');
const weatherElement = document.querySelector('#weather');
const temperatureElement = document.querySelector('#temperature');
const weatherIcon = document.querySelector('.guatape-weather-icon') || document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('.guatape-weather-desc') || document.querySelector('#weather-description');
const visitsElement = document.querySelector('.visits');

// Guatape, Antioquia, Colombia coordinates
const lat = 6.23;
const lon = -75.16;

// API key
const apiKey = 'b3d2c4dace3b9aa57c38170417b7ae22';

// Create the API URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Function to fetch the weather data
async function apiFetch() {
  try {
    console.log('Fetching data from:', url); // Log the URL being fetched
    const response = await fetch(url);
    console.log('Response status:', response.status); // Log the response status

    if (response.ok) {
      const data = await response.json();
      console.log('Data received:', data); // Log the full data
      displayResults(data);
    } else {
      throw Error(`API response error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Set fallback information even if the API fails
    locationElement.textContent = "Guatape, Antioquia, Colombia";
    weatherElement.textContent = "Error loading weather data";
    if (temperatureElement) {
      temperatureElement.textContent = "N/A";
    }
  }
}

// Function to display the results in the HTML
function displayResults(data) {
  // Make sure we have the elements before trying to update them
  if (locationElement) {
    locationElement.textContent = "Guatape, Antioquia, Colombia";
  }

  // Format temperature to zero decimal places
  const temperature = Math.round(data.main.temp);
  if (temperatureElement) {
    temperatureElement.textContent = `${temperature}°F`;
  }

  // Get weather description and capitalize each word
  let desc = data.weather[0].description;
  desc = capitalizeWords(desc);

  // Set weather text
  if (weatherElement) {
    weatherElement.textContent = desc;
  }

  // Set weather icon only if the element exists
  if (weatherIcon) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
  }

  // Set weather description only if the element exists
  if (weatherDescription) {
    weatherDescription.textContent = desc;
  }
}

// Function to capitalize each word in a string
function capitalizeWords(str) {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// Handle visit counter - keeping the existing functionality
if (visitsElement) {
  // Get stored value from localStorage if it exists
  let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

  // Determine if this is the first visit or display the number of visits
  if (numVisits !== 0) {
    visitsElement.textContent = numVisits;
  } else {
    visitsElement.textContent = `This is your first visit. 🥳 Welcome!`;
  }

  // Increment the number of visits by one.
  numVisits++;

  // Store the new visit total into localStorage, key=numVisits-ls
  localStorage.setItem("numVisits-ls", numVisits);
}

// Call the apiFetch function when the page loads
document.addEventListener('DOMContentLoaded', function () {
  console.log('Document loaded, calling apiFetch()');
  apiFetch();
});

// Also call it immediately in case the DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, calling apiFetch() immediately');
  apiFetch();
}