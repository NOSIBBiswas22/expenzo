// Function to populate categories in the dropdown
 const renderCategories = (options = {}) => {
  const categories = getCategories();
  const { defaultOption = null } = options;
  const categorySelect = document.getElementById("filter-category");

  // Clear existing options
  categorySelect.innerHTML = "";

  if (defaultOption) {
    // Add a default "All Catagories" option
    const defaultInput = document.createElement("option");
    defaultInput.textContent = defaultOption.text;
    defaultInput.value = defaultOption.value;
    categorySelect.appendChild(defaultInput);
  }

  // Loop through categories and add them to the select dropdown
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
};
