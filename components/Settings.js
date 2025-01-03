const Settings = (content) => {
  content.innerHTML = `
      <div class="section">
        <h2>Settings</h2>
        <div class="section">
          <div class="category-page">
          <div class="category-form">
          <h3> and Import Data</h3>
              <!-- <button id="get-local-data-btn" class="btn">Get All Data as JSON</button> -->
              <button id="download-data-btn" class="btn"><i class="fa-solid fa-download icon"></i> Export Data</button>
              <input type="file" id="import-file" class="btn" style="display:none" />
              <button id="import-data-btn" class="btn"><i class="fa-solid fa-upload icon"></i> Import Data</button>
            </div>
          </div>
        </div>
        <div class="category-page">
          <div class="category-form">
            <h3>Add Category</h3>
            <input type="text" id="category-name" placeholder="Enter category name">
            <button id="add-category-btn" class="btn"><i class="fa-solid fa-plus"></i> Category</button>
          </div>
          <h3>Available Categories:</h3>
          <div class="category-container">
          <div class="form-group">
            <input type="text" id="filter-category" placeholder="Search by category..." />
          </div>
          <ul id="category-list">
            <!-- List of categories will be populated here -->
          </ul>
          </div>
        </div>
      </div>
    `;

  //  & IMPORT STARTS FORM HERE
  
  // Button to get all LocalStorage data as JSON
  // document.getElementById("get-local-data-btn").addEventListener("click", () => {
  //   try {
  //     const data = localStorage.getItem("expenzo_list_data"); // You can customize this for all data
  //     if (data) {
  //       showToast.success({
  //         message: JSON.stringify(JSON.parse(data), null, 2),
  //         theme: T_theme,
  //         position: T_position,
  //         transition: T_transition,
  //         autoClose: T_autoClose,
  //         hideProgressBar: T_hideProgressBar,
  //         pauseOnHover: T_pauseOnHover,
  //         closeAble: T_closeAble,
  //         closeOnClick: T_closeOnClick,
  //       });
  //     } else {
  //       showToast.error({
  //         message: "No data found in LocalStorage.",
  //         theme: T_theme,
  //         position: T_position,
  //         transition: T_transition,
  //         autoClose: T_autoClose,
  //         hideProgressBar: T_hideProgressBar,
  //         pauseOnHover: T_pauseOnHover,
  //         closeAble: T_closeAble,
  //         closeOnClick: T_closeOnClick,
  //       });
  //     }
  //   } catch (error) {
  //     showToast.error({
  //       message: "Error fetching data from LocalStorage.",
  //       theme: T_theme,
  //       position: T_position,
  //       transition: T_transition,
  //       autoClose: T_autoClose,
  //       hideProgressBar: T_hideProgressBar,
  //       pauseOnHover: T_pauseOnHover,
  //       closeAble: T_closeAble,
  //       closeOnClick: T_closeOnClick,
  //     });
  //   }
  // });

  // Button to download LocalStorage data as a JSON file
  document.getElementById("download-data-btn").addEventListener("click", () => {
    try {
      const data = localStorage.getItem("expenzo_list_data"); // You can customize this for all data
      if (data) {
        const blob = new Blob([data], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "localStorage-data.json";
        link.click();
      } else {
        showToast.error({
          message: "No data available to download.",
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
        });
      }
    } catch (e) {
      showToast.error({
        message: "Error downloading data.",
        theme: T_theme,
        position: T_position,
        transition: T_transition,
        autoClose: T_autoClose,
        hideProgressBar: T_hideProgressBar,
        pauseOnHover: T_pauseOnHover,
        closeAble: T_closeAble,
        closeOnClick: T_closeOnClick,
      });
    }
  });

  // Button to trigger import functionality
  document.getElementById("import-data-btn").addEventListener("click", () => {
    document.getElementById("import-file").click();
  });

  // Handle file import and updating LocalStorage
  document.getElementById("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const newData = JSON.parse(reader.result);
          const currentData = JSON.parse(localStorage.getItem("expenzo_list_data")) || [];

          // Merge the new data with the existing data (without overwriting existing entries)
          const updatedData = [...new Set([...currentData, ...newData])]; // Merge without duplicates
          localStorage.setItem("expenzo_list_data", JSON.stringify(updatedData));

          showToast.success({
            message: "Data imported successfully!",
            theme: T_theme,
            position: T_position,
            transition: T_transition,
            autoClose: T_autoClose,
            hideProgressBar: T_hideProgressBar,
            pauseOnHover: T_pauseOnHover,
            closeAble: T_closeAble,
            closeOnClick: T_closeOnClick,
          });
        } catch (e) {
          showToast.error({
            message: "Failed to import data!",
            theme: T_theme,
            position: T_position,
            transition: T_transition,
            autoClose: T_autoClose,
            hideProgressBar: T_hideProgressBar,
            pauseOnHover: T_pauseOnHover,
            closeAble: T_closeAble,
            closeOnClick: T_closeOnClick,
          });
        }
      };
      reader.readAsText(file);
    } else {
      showToast.error({
        message: "Please select a valid JSON file.",
        theme: T_theme,
        position: T_position,
        transition: T_transition,
        autoClose: T_autoClose,
        hideProgressBar: T_hideProgressBar,
        pauseOnHover: T_pauseOnHover,
        closeAble: T_closeAble,
        closeOnClick: T_closeOnClick,
      });
    }
  });

  // ADD CATAGORIS STARTS FORM HERE

  // Get category elements
  const categoryInput = document.getElementById("category-name");
  const addCategoryBtn = document.getElementById("add-category-btn");
  const categoryList = document.getElementById("category-list");

// Function to render categories with search/filter functionality
const renderCategories = (filterText = "") => {
  const categories = getCategories();
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = ""; // Clear the list before rendering

  if (categories.length === 0) {
    // Display "No categories available" message if no categories exist
    const noCategoriesMessage = document.createElement("li");
    noCategoriesMessage.textContent = "No categories available!";
    noCategoriesMessage.style.fontStyle = "italic";
    noCategoriesMessage.style.color = "#777"; // Style the message
    categoryList.appendChild(noCategoriesMessage);
  } else {
    // Filter categories based on search text
    const filteredCategories = categories.filter((category) =>
      category.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filteredCategories.length === 0) {
      // Display message if no categories match the search
      const noMatchMessage = document.createElement("li");
      noMatchMessage.textContent = "No categories found!";
      noMatchMessage.style.fontStyle = "italic";
      noMatchMessage.style.color = "#777"; // Style the message
      categoryList.appendChild(noMatchMessage);
    } else {
      // Render the filtered categories
      filteredCategories.forEach((category, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${category}`;

        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteBtn.classList.add("btn");
        deleteBtn.style.background = "#dc3545";

        // Delete category when button is clicked
        deleteBtn.addEventListener("click", () => {
          try {
            // Remove category from the list
            categories.splice(categories.indexOf(category), 1);

            // Save the updated categories
            saveCategories(categories);

            // Re-render the categories
            renderCategories(filterText); // Pass the filterText to keep the filter active

            // Show success toast message
            showToast.success({
              theme: T_theme,
              position: T_position,
              transition: T_transition,
              autoClose: T_autoClose,
              hideProgressBar: T_hideProgressBar,
              pauseOnHover: T_pauseOnHover,
              closeAble: T_closeAble,
              closeOnClick: T_closeOnClick,
              message: "Category deleted successfully!",
            });
          } catch (e) {
            // Handle any errors that occur during deletion
            showToast.error({
              theme: T_theme,
              position: T_position,
              transition: T_transition,
              autoClose: T_autoClose,
              hideProgressBar: T_hideProgressBar,
              pauseOnHover: T_pauseOnHover,
              closeAble: T_closeAble,
              closeOnClick: T_closeOnClick,
              message: "Failed to delete category!",
            });
          }
        });

        listItem.appendChild(deleteBtn);
        categoryList.appendChild(listItem);
      });
    }
  }
};

// Add event listener to the search input box
document.getElementById("filter-category").addEventListener("input", (e) => {
  const filterText = e.target.value.trim(); // Get the search text
  renderCategories(filterText); // Re-render categories with the filtered text
});

// Initial render (without filter)
renderCategories();


  // Handle adding a new category
  addCategoryBtn.addEventListener("click", () => {
    try {
      const newCategory = categoryInput.value.trim();

      if (newCategory) {
        // Get the current categories
        const categories = getCategories();

        // Add the new category to the array
        categories.push(newCategory);

        // Save the updated categories to localStorage
        saveCategories(categories);

        // Clear the input field and re-render the categories
        categoryInput.value = "";
        renderCategories();

        // Show success toast message
        // showToast("Category added successfully!", "success");
        showToast.success({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Category added successfully!",
        });
      } else {
        // Show error toast message if category name is empty
        // showToast("Please enter a valid category name.", "error");
        showToast.error({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Please enter a valid category.",
        });
      }
    } catch (e) {
      // Show error toast message
      showToast.error({
        theme: T_theme,
        position: T_position,
        transition: T_transition,
        autoClose: T_autoClose,
        hideProgressBar: T_hideProgressBar,
        pauseOnHover: T_pauseOnHover,
        closeAble: T_closeAble,
        closeOnClick: T_closeOnClick,
        message: "Failed to add category!",
      });
    }
  });

  // Initial rendering of categories
  renderCategories();
};
