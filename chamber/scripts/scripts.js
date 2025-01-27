// Update the last modified date in the footer
function updateLastModified() {
  const lastModifiedElement = document.getElementById('last-modified');
  if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
  }
}

// Toggle the mobile navigation menu
function setupMenuToggle() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      // Menu visibility switched on click
      if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'block';
      }
    });
  }
}

// Initialize all scripts when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateLastModified();
  setupMenuToggle();
});