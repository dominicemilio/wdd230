function updateLastModified() {
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});

document.addEventListener('DOMContentLoaded', () => {
  updateLastModified();
});

document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const elementsToDarken = document.querySelectorAll('body, header, nav a, .card, .cta-button, footer, .email, .location-link, blockquote, #nav-menu, .social-icon, .slider');

  function toggleDarkMode(isDark) {
    elementsToDarken.forEach(element => {
      if (isDark) {
        element.classList.add("dark-mode");
      } else {
        element.classList.remove("dark-mode");
      }
    });
  }

  const isDarkMode = localStorage.getItem("darkMode") === "true";
  toggleDarkMode(isDarkMode);

  darkModeToggle.addEventListener("change", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleDarkMode(isDark);
    localStorage.setItem("darkMode", isDark);
  });
});