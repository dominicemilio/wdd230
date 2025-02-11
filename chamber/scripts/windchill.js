document.addEventListener('DOMContentLoaded', () => {
  const getElementValue = id => parseFloat(document.getElementById(id).textContent);

  const temperature = getElementValue('temp');
  const windSpeed = getElementValue('windSpeed');
  const windChillElement = document.getElementById('windChill');

  console.log(`Temperature: ${temperature}°F`);
  console.log(`Wind Speed: ${windSpeed} mph`);

  const windChill = (temp, speed) =>
    (temp <= 50 && speed > 3)
      ? `${(35.74 + 0.6215 * temp - 35.75 * speed ** 0.16 + 0.4275 * temp * speed ** 0.16).toFixed(1)} °F`
      : "N/A";

  windChillElement.textContent = windChill(temperature, windSpeed);
  console.log(`Wind Chill: ${windChillElement.textContent}`);
});