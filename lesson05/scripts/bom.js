// Select the input, button, and unordered list elements
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add click event listener to the button
button.addEventListener('click', () => {
  // Check if input is not empty
  if (input.value.trim() !== '') {
    // Create list item and delete button
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    // Set text content
    li.textContent = input.value;
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
    deleteButton.classList.add('delete');

    // Append delete button to list item
    li.append(deleteButton);
    // Append list item to list
    list.append(li);

    // Add event listener to delete button
    deleteButton.addEventListener('click', () => {
      list.removeChild(li);
      input.focus();
    });

    // Clear input and set focus
    input.value = '';
    input.focus();
  } else {
    alert('Please enter a book and chapter.');
    input.focus();
  }
});