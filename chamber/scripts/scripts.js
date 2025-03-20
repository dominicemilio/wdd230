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

function shouldShowBanner() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 3;
}

function updateBannerVisibility() {
  const banner = document.getElementById('event-banner');
  if (shouldShowBanner()) {
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}

document.getElementById('close-banner').addEventListener('click', function () {
  document.getElementById('event-banner').style.display = 'none';
});

window.addEventListener('load', updateBannerVisibility);

document.addEventListener('DOMContentLoaded', function () {
  const formFields = {
    'first-name': document.getElementById('first-name'),
    'last-name': document.getElementById('last-name'),
    'title': document.getElementById('title'),
    'email': document.getElementById('email'),
    'phone': document.getElementById('phone'),
    'business': document.getElementById('business'),
    'membership': document.getElementById('membership'),
    'description': document.getElementById('description')
  };

  const darkModeToggle = document.getElementById('dark-mode-toggle');

  const validators = {
    'first-name': (value) => value.length > 0,
    'last-name': (value) => value.length > 0,
    'title': (value) => value.length >= 7,
    'email': (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'phone': (value) => value.length > 0,
    'business': (value) => value.length >= 7,
    'membership': () => true,
    'description': () => true
  };

  const LIGHT_MODE_DEFAULT = '#FFFFFF';
  const LIGHT_MODE_VALID = '#E8F0FE';
  const DARK_MODE_DEFAULT = '#333333';
  const DARK_MODE_VALID = '#E8F0FE';

  function updateFieldBackground(fieldId) {
    const field = formFields[fieldId];
    if (!field) return;

    const isValid = validators[fieldId](field.value);
    const isDarkMode = darkModeToggle.checked || document.body.classList.contains('dark-mode');

    console.log(`Field: ${fieldId}, Value: ${field.value}, Valid: ${isValid}, Dark Mode: ${isDarkMode}`);

    if (isValid && (field.value.length > 0 || fieldId === 'membership')) {
      field.style.backgroundColor = LIGHT_MODE_VALID;
      console.log(`Setting ${fieldId} to valid color: ${LIGHT_MODE_VALID}`);
    } else {
      field.style.backgroundColor = isDarkMode ? DARK_MODE_DEFAULT : LIGHT_MODE_DEFAULT;
      console.log(`Setting ${fieldId} to default color: ${isDarkMode ? DARK_MODE_DEFAULT : LIGHT_MODE_DEFAULT}`);
    }
  }

  function updateMembershipField() {
    const membershipField = formFields['membership'];
    if (membershipField) {
      membershipField.style.backgroundColor = LIGHT_MODE_VALID;
      console.log('Setting membership to valid color');
    }
  }

  function updateAllFields() {
    Object.keys(formFields).forEach(fieldId => {
      if (fieldId === 'membership') {
        updateMembershipField();
      } else {
        updateFieldBackground(fieldId);
      }
    });
  }

  Object.keys(formFields).forEach(fieldId => {
    const field = formFields[fieldId];
    if (field) {
      field.addEventListener('input', () => {
        if (fieldId === 'membership') {
          updateMembershipField();
        } else {
          updateFieldBackground(fieldId);
        }
      });

      if (fieldId === 'membership') {
        updateMembershipField();
      } else {
        updateFieldBackground(fieldId);
      }
    }
  });

  const membershipSelect = formFields['membership'];
  if (membershipSelect) {
    membershipSelect.addEventListener('change', updateMembershipField);
    updateMembershipField();
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      console.log('Dark mode changed');
      updateAllFields();
    });
  }

  window.addEventListener('load', updateAllFields);

  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', function () {
      const timestamp = document.getElementById('timestamp');
      if (timestamp) {
        timestamp.value = new Date().toISOString();
      }
    });
  }
});
