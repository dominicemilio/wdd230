// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Trier, Germany coordinates
const lat = 49.75;
const lon = 6.64;

// API key
const apiKey = 'b3d2c4dace3b9aa57c38170417b7ae22';

// Create the API URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Function to fetch the weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to display the results in the HTML
function displayResults(data) {
  // Format temperature to zero decimal places
  currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  // Get weather description and capitalize each word
  let desc = data.weather[0].description;
  desc = capitalizeWords(desc);

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

// Function to capitalize each word in a string
function capitalizeWords(str) {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

// Call the apiFetch function after the page loads
apiFetch();