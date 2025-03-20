const locationElement = document.querySelector('#location');
const weatherElement = document.querySelector('#weather');
const temperatureElement = document.querySelector('#temperature');
const weatherIcon = document.querySelector('.guatape-weather-icon') || document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('.guatape-weather-desc') || document.querySelector('#weather-description');
const visitsElement = document.querySelector('.visits');

const lat = 6.23;
const lon = -75.16;

const apiKey = 'b3d2c4dace3b9aa57c38170417b7ae22';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function apiFetch() {
  try {
    console.log('Fetching data from:', url);
    const response = await fetch(url);
    console.log('Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('Data received:', data);
      displayResults(data);
    } else {
      throw Error(`API response error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);

    locationElement.textContent = "Guatape, Antioquia, Colombia";
    weatherElement.textContent = "Error loading weather data";
    if (temperatureElement) {
      temperatureElement.textContent = "N/A";
    }
  }
}

function displayResults(data) {
  if (locationElement) {
    locationElement.textContent = "Guatape, Antioquia, Colombia";
  }

  const temperature = Math.round(data.main.temp);
  if (temperatureElement) {
    temperatureElement.textContent = `${temperature}°F`;
  }

  let desc = data.weather[0].description;
  desc = capitalizeWords(desc);

  if (weatherElement) {
    weatherElement.textContent = desc;
  }

  if (weatherIcon) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
  }

  if (weatherDescription) {
    weatherDescription.textContent = desc;
  }
}

function capitalizeWords(str) {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

if (visitsElement) {
  let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

  if (numVisits !== 0) {
    visitsElement.textContent = numVisits;
  } else {
    visitsElement.textContent = `This is your first visit. 🥳 Welcome!`;
  }

  numVisits++;

  localStorage.setItem("numVisits-ls", numVisits);
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('Document loaded, calling apiFetch()');
  apiFetch();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already loaded, calling apiFetch() immediately');
  apiFetch();
}