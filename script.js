const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");
const clearAllButton = document.getElementById("clearAllButton");

// Function to add a new task
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please enter a task!");
  } else {
    const li = document.createElement("li");
    li.textContent = inputBox.value.trim();
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveAllData();
  updateClearAllButtonVisibility();
}

// Listen for the Enter key and add a task when pressed
inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Event listener for list item clicks and delete button clicks
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
  saveAllData();
  updateClearAllButtonVisibility();
});

// Function to save all data to local storage
function saveAllData() {
  try {
    localStorage.setItem("data", listContainer.innerHTML);
  } catch (error) {
    console.error("Error saving data to local storage:", error.message);
  }
}

// Function to show saved data from local storage
function showData() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
}

// Function to update the visibility of the "Clear All" button
function updateClearAllButtonVisibility() {
  const listItems = listContainer.getElementsByTagName("li");
  clearAllButton.style.display = listItems.length > 0 ? "block" : "none";
}

// Function to clear all tasks
function clearAll() {
  listContainer.innerHTML = "";
  saveAllData();
  updateClearAllButtonVisibility();
}

// Initial setup
showData();
updateClearAllButtonVisibility();
