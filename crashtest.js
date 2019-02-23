let editMode = false; // whether we're editing or adding a new dog
let editIndex = null; // we also want to keep track of which index we're editing!
let dogs = []; // the list of all our dogs


// The "Dog" class (data type) we will create instances from
class Dog {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}

// A utility function which re-draws the table on each change
// The point is to have a single source of truth - in other words
// the array is always right, while what happens in the HTML document
// is simply a visual representation of the array.
// React operates on that exact principle.
function drawTable() {
  let tbody = document.querySelector('tbody');
  tbody.innerHTML = ""; // Reset the contents of the tbody when drawing

  // Iterate through every available dog
  dogs.forEach(function(dog, i) {
    // Create all out TDs and TRs:
    let tr = document.createElement('tr');
    let nameTd = document.createElement('td');
    let colorTd = document.createElement('td');
    let buttonTd = document.createElement('td');

    // Set the text to each column
    nameTd.innerText = dog.name;
    colorTd.innerText = dog.color;

    // Append all columns to the row
    tr.appendChild(nameTd);
    tr.appendChild(colorTd);
    tr.appendChild(buttonTd);

    // From the homework: add a delete button
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";

    // Handle the edit button
    let editButton = document.createElement('button');
    editButton.innerText = "Edit";

    // Append the buttons
    buttonTd.appendChild(deleteButton);
    buttonTd.appendChild(editButton);

    // Handle the edit button
    editButton.addEventListener('click', function() {
      // If we click edit, we set editMode to true and we keep the index we're trying to edit
      editMode = true;
      editIndex = i;

      // We set the inputs to the appropriate name and color
      let nameInput = document.querySelector('#name');
      let colorInput = document.querySelector('#color');

      nameInput.value = dog.name;
      colorInput.value = dog.color;
    });

    // Handle the delete button
    deleteButton.addEventListener('click', function() {
      let indexToDelete = i; //

      // Remove one element - the dog we want to delete
      dogs.splice(i, 1);

      // And redraw the table again
      // Aside: a function can call itself in JS ;)
      // mind=blown, right? :D
      drawTable();
    });    

    // Finally, append the new row to the tbody
    tbody.appendChild(tr);
  });
}

// The event listener for the button
function handleAdd() {
  let nameInput = document.querySelector('#name');
  let colorInput = document.querySelector('#color');

  if (editMode) {
    // If it's an existing dog, we look for the index
    // and change the properties of that dog instance;
    // we don't need a new one, since we're editing.
    dogs[editIndex].name = nameInput.value;
    dogs[editIndex].color = colorInput.value;

    // IMPORTANT: we need to reset both editMode and editIndex after we're done here!
    // Otherwise, it will always remain in edit mode and we won't be able to add
    // new dogs.
    editMode = false;
    editIndex = null;
  } else {
    let dog = new Dog(nameInput.value, colorInput.value);
    dogs.push(dog);
  }

  // Always redraw the table, to avoid differences between the array and the table in the DOM
  drawTable();

  // Finally, reset both inputs
  nameInput.value = "";
  colorInput.value = "";
}

// And at last, attach the event listener
document.querySelector('#add').addEventListener('click', handleAdd);