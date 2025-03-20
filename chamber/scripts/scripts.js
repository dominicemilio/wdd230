function updateLastModified() {
  const lastModifiedElement = document.getElementById("last-modified");
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

  updateLastModified();

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const elementsToDarken = document.querySelectorAll(
    "body, header, nav a, .card, .cta-button, footer, .email, .location-link, blockquote, #nav-menu, .social-icon, .slider"
  );

  function applyDarkMode(isDark) {
    elementsToDarken.forEach((element) => {
      element.classList.toggle("dark-mode", isDark);
    });
    localStorage.setItem("darkMode", isDark);
    darkModeToggle.checked = isDark;
  }

  const isDarkMode = localStorage.getItem("darkMode") === "true";
  applyDarkMode(isDarkMode);

  darkModeToggle.addEventListener("change", () => {
    applyDarkMode(darkModeToggle.checked);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }
});

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("#nav-menu li a");

navLinks.forEach(link => {
  const linkHref = link.getAttribute("href");

  if (linkHref === currentPage) {
    link.classList.add("active");
  } else if (currentPage === "index.html" && linkHref === "./index.html") {
    link.classList.add("active");
  }
});
