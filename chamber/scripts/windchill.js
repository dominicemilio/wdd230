document.addEventListener('DOMContentLoaded', () => {
  // Select the temperature and wind speed elements
  const tempElement = document.getElementById('temp');
  const windSpeedElement = document.getElementById('windSpeed');
  const windChillElement = document.getElementById('windChill');

  // Extract the numeric values
  const temperature = parseFloat(tempElement.textContent);
  const windSpeed = parseFloat(windSpeedElement.textContent);

  console.log(`Temperature: ${temperature}°F`);
  console.log(`Wind Speed: ${windSpeed} mph`);

  // Wind Chill Calculation Function
  function calculateWindChill(temp, speed) {
    // Check if values meet the criteria
    if (temp <= 50 && speed > 3.0) {
      const windChill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16));
      return `${windChill.toFixed(1)} °F`;
    } else {
      return "N/A";
    }
  }

  // Calculate and display wind chill
  const windChillResult = calculateWindChill(temperature, windSpeed);
  console.log(`Wind Chill: ${windChillResult}`);
  windChillElement.textContent = windChillResult;
});