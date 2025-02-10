document.addEventListener('DOMContentLoaded', () => {
  const temperature = parseFloat(document.getElementById('temp').textContent);
  const windSpeed = parseFloat(document.getElementById('windSpeed').textContent);
  const windChillDisplay = document.getElementById('windChill');

  function calculateWindChill(temp, speed) {
    if (temp <= 50 && speed > 3.0) {
      let windChill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16));
      return windChill.toFixed(1) + " °F";
    }
    else if (temp > 50 && speed > 3.0) {
      return "N/A (Temperature too high)";
    }
    else if (temp <= 50 && speed <= 3.0) {
      return "N/A (Wind speed too low)";
    }
    else {
      return "N/A (Conditions not met)";
    }
  }

  windChillDisplay.textContent = calculateWindChill(temperature, windSpeed);
});