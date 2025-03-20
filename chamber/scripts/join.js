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

  function updateFieldBackground(fieldId) {
    const field = formFields[fieldId];
    if (!field) return;

    const isValid = validators[fieldId](field.value);

    console.log(`Field: ${fieldId}, Value: ${field.value}, Valid: ${isValid}`);

    if (isValid && (field.value.length > 0 || fieldId === 'membership')) {
      console.log(`Setting ${fieldId} to valid`);
    } else {
      // Use CSS variables. The default styles will apply.
      // field.style.backgroundColor = isDarkMode ? 'var(--dark-input-bg-default)' : 'var(--input-bg-default)';
      // console.log(`Setting ${fieldId} to default color`); // No longer needed
    }
  }

  function updateMembershipField() {
    const membershipField = formFields['membership'];
    if (membershipField) {
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
