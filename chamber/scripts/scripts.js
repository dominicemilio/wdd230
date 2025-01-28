// Update the last modified date in the footer
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

// Initialize all scripts when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateLastModified();
  setupMenuToggle();
});