document.addEventListener('DOMContentLoaded', function () {
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }
});

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
