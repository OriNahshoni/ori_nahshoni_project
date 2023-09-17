let savedList = [];

window.addEventListener("load", () => {
  const listElement = document.getElementById("list");

  // Function to load the list from local storage
  const loadListFromLocalStorage = () => {
    savedList = JSON.parse(localStorage.getItem("groceryList")) || [];
    savedList.forEach((itemText) => {
      const newItem = createListItem(itemText);
      listElement.appendChild(newItem);
    });
  };

  // Function to save the list to local storage
  const saveListToLocalStorage = () => {
    localStorage.setItem("groceryList", JSON.stringify(savedList));
  };

  // Function to create a new list item with a remove button
  function createListItem(text) {
    const newElm = document.createElement("li");
    newElm.innerHTML = text;
    newElm.className = "list-group-item";

    // Create a button to remove the li element
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove btn btn-danger btn-sm float-right";

    // Add a click event listener to remove the li element
    removeButton.addEventListener("click", () => {
      newElm.remove();
      // Remove the item from the saved list and update local storage
      const index = savedList.indexOf(text);
      if (index !== -1) {
        savedList.splice(index, 1);
        saveListToLocalStorage();
      }
    });

    newElm.appendChild(removeButton); // Add the remove button to the li element

    return newElm;
  }

  // Load the saved list from local storage when the page loads
  loadListFromLocalStorage();

  document.getElementById("grocery").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document.getElementById("addBtn").addEventListener("click", () => {
    const inputValue = document.querySelector("#writeList").value;
    if (inputValue.trim() !== "") {
      const newElm = createListItem(inputValue);
      listElement.appendChild(newElm);
      savedList.push(inputValue);
      document.querySelector("#writeList").value = "";
    } else {
      alert("sorry, you can't leave it empty!🚫");
    }
  });

  // save to local storage by clicking the save button
  document.getElementById("saveBtn").addEventListener("click", () => {
    saveListToLocalStorage();
    alert("List saved to local storage! ✅");
  });

  // delete from local storage by clicking the delete button
  document.getElementById("deleteBtn").addEventListener("click", () => {
    localStorage.removeItem("groceryList");

    listElement.innerHTML = "";

    savedList = [];
    alert("List deleted from local storage!❌");
  });
});
