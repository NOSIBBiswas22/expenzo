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

const settingsIcon = document.getElementById("settings-icon");
let deg = 0; // Initialize rotation degree

document.getElementById("settings-page").addEventListener("click", (e) => {
  e.preventDefault();

  // Reset and start the loading bar
  loadingBar.reset();
  loadingBar.start();
  loadingBar.progress(50);

  // Increment rotation degree and apply it to the icon
  deg += 90;
  settingsIcon.style.transition = "transform 0.3s ease"; // Smooth transition
  settingsIcon.style.transform = `rotate(${deg}deg)`; // Rotate to the new degree

  // Call settings function
  Settings(content);

  // Complete the loading bar animation
  loadingBar.finish();
});

// Initial Page Load
const initializeApp = () => {
  const data = getData(); // Get data from localStorage
  if (data.length === 0) {
    // If no data, load the Add Items page
    document.getElementById("add-items-page").click();
    //AddItem(content);
  } else {
    // If data exists, load the View page
    document.getElementById("view-page").click();
    //ListItems(content);
  }
};

loadingBar.start(); // Start the loading bar
loadingBar.progress(30); // Set progress to 50%
window.onload = () => {
  loadingBar.progress(80); // Set progress to 50%
  loadingBar.finish(); // Complete and hide the loading bar
};

Navigation("nav");
// Call the initialize function on page load
initializeApp();
