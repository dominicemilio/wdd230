document.getElementById('close-banner').addEventListener('click', function () {
  document.getElementById('event-banner').classList.remove('show');
});

const apiKey = 'b3d2c4dace3b9aa57c38170417b7ae22';
const lat = 6.2342;
const lon = -75.1574;

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = Math.round(data.wind.speed);

    const iconCode = data.weather[0].icon;
    const iconWrapper = document.getElementById('weather-icon-wrapper');
    iconWrapper.innerHTML = '';

    const iconImg = document.createElement('img');
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconImg.alt = data.weather[0].description;
    iconImg.className = 'weather-icon';
    iconWrapper.appendChild(iconImg);
  })
  .catch(error => {
    console.error('Error fetching current weather:', error);
    document.getElementById('temp').textContent = 'Error';
    document.getElementById('weather-desc').textContent = 'Unable to fetch weather data';
  });

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextDays = [];
    const processedDates = new Set();

    data.list.forEach(item => {
      const forecastDate = new Date(item.dt * 1000);
      forecastDate.setHours(0, 0, 0, 0);

      if (forecastDate > today && !processedDates.has(forecastDate.toDateString())) {
        processedDates.add(forecastDate.toDateString());
        nextDays.push(item);

        if (nextDays.length >= 3) {
          return;
        }
      }
    });

    nextDays.forEach(day => {
      const forecastDate = new Date(day.dt * 1000);
      const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });

      const forecastItem = document.createElement('div');
      forecastItem.className = 'forecast-item';

      const dayElem = document.createElement('p');
      dayElem.className = 'forecast-day';
      dayElem.textContent = dayName;
      forecastItem.appendChild(dayElem);

      const iconElem = document.createElement('img');
      iconElem.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
      iconElem.alt = day.weather[0].description;
      iconElem.className = 'forecast-icon';
      forecastItem.appendChild(iconElem);

      const tempElem = document.createElement('p');
      tempElem.textContent = `${Math.round(day.main.temp)}°F`;
      forecastItem.appendChild(tempElem);

      forecastContainer.appendChild(forecastItem);
    });
  })
  .catch(error => {
    console.error('Error fetching forecast:', error);
    document.getElementById('forecast-container').innerHTML = '<p>Unable to fetch forecast data</p>';
  });