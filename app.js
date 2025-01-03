// Initialize the top-loading bar
const loadingBar = TopLoadingBar({
  color: "#F1F1F1",
  height: "3px",
  speed: 300,
});

// Navigation Event Listeners
document.getElementById("add-items-page").addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default behavior
  loadingBar.reset(); // Reset and start the loading bar
  loadingBar.start(); // Reset and start the loading bar
  loadingBar.progress(50); // Set progress to 50%
  AddItem(content); // Your custom function to add items
  loadingBar.finish(); // Complete the loading bar animation
});


document.getElementById("view-page").addEventListener("click", (e) => {
  e.preventDefault();
  loadingBar.reset(); // Reset and start the loading bar
  loadingBar.start(); // Reset and start the loading bar
  loadingBar.progress(50); // Set progress to 50%
  ListItems(content);
  loadingBar.finish(); // Complete the loading bar animation
});

document.getElementById("summary-page").addEventListener("click", (e) => {
  e.preventDefault();
  loadingBar.reset(); // Reset and start the loading bar
  loadingBar.start(); // Reset and start the loading bar
  loadingBar.progress(50); // Set progress to 50%
  Summary(content);
  loadingBar.finish(); // Complete the loading bar animation
});

document.getElementById("settings-page").addEventListener("click", (e) => {
  e.preventDefault();
  loadingBar.reset(); // Reset and start the loading bar
  loadingBar.start(); // Reset and start the loading bar
  loadingBar.progress(50); // Set progress to 50%
  Settings(content);
  loadingBar.finish(); // Complete the loading bar animation
});

// Initial Page Load
const initializeApp = () => {
  const data = getData(); // Get data from localStorage
  if (data.length === 0) {
    // If no data, load the Add Items page
    AddItem(content);
  } else {
    // If data exists, load the View page
    ListItems(content);
  }
};

loadingBar.start(); // Start the loading bar
loadingBar.progress(30); // Set progress to 50%
window.onload = () => {
  loadingBar.progress(80); // Set progress to 50%
  loadingBar.finish(); // Complete and hide the loading bar
};

// Call the initialize function on page load
initializeApp();
Navigation("nav");
