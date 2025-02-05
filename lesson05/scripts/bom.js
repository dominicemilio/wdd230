// Select the input, buttons, and unordered list elements
const input = document.querySelector('#favchap');
const addButton = document.querySelector('button');
const list = document.querySelector('#list');

// Create and insert reset button
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset List';
resetButton.setAttribute('id', 'reset');
resetButton.style.margin = '0.5rem';
list.parentElement.appendChild(resetButton);

// Add event listener to the add button
addButton.addEventListener('click', () => {
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
    deleteButton.classList.add('delete');

    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', () => {
      list.removeChild(li);
      input.focus();
    });

    input.value = '';
    input.focus();
  } else {
    alert('Please enter a book and chapter.');
    input.focus();
  }
});

// Add event listener to reset button
resetButton.addEventListener('click', () => {
  list.innerHTML = ''; // Clears all list items
  input.focus();
});