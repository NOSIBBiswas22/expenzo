// Edit Entry Functionality
 const EditEntry = (index, content) => {
  const data = getData();
  const entry = data[index];

  content.innerHTML = `
      <div class="section">
          <h2>Edit Entry</h2>
          <form id="edit-form">
              <div class="form-group">
                  <label for="edit-item">Item Name</label>
                  <input type="text" id="edit-item" value="${entry.item}" required />
              </div>
              <div class="form-group">
                  <label for="edit-quantity">Quantity</label>
                  <input type="number" id="edit-quantity" value="${entry.quantity}" min="1" required />
              </div>
              <div class="form-group">
                  <label for="edit-category">Category</label>
                  <select id="edit-category"></select>
              </div>
              <div class="form-group">
                  <label for="edit-amount">Estimated Amount</label>
                  <input type="number" id="edit-amount" value="${entry.amount}" min="0" required />
              </div>
              <button type="submit" class="btn">Update Entry</button>
              <button id="cancelBtn" class="btn">Cancel</button>
          </form>
      </div>
  `;

  // Render the edit category dropdown with categories
  const renderEditCategory = (entry) => {
    const categories = getCategories(); // Fetch categories from localStorage
    const categorySelect = document.getElementById("edit-category");

    // Clear any existing options
    categorySelect.innerHTML = "";

    // Loop through categories and create options
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;

      // Set the selected attribute if it matches entry.category
      if (entry.category === category) {
        option.selected = true;
      }

      categorySelect.appendChild(option);
    });
  };

  renderEditCategory(entry); // Call renderEditCategory and pass the entry

  // Form submission handler
  document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedEntry = {
      item: document.getElementById("edit-item").value,
      quantity: document.getElementById("edit-quantity").value,
      category: document.getElementById("edit-category").value,
      amount: document.getElementById("edit-amount").value,
      date: entry.date,
    };

    // Check if any data is actually changed
    const isDataChanged =
      entry.item !== updatedEntry.item ||
      entry.quantity !== updatedEntry.quantity ||
      entry.category !== updatedEntry.category ||
      entry.amount !== updatedEntry.amount;

    if (!isDataChanged) {
      // No changes made, skip update and show info toast
      showToast.info({
        theme: T_theme,
        position: T_position,
        transition: T_transition,
        autoClose: T_autoClose,
        hideProgressBar: T_hideProgressBar,
        pauseOnHover: T_pauseOnHover,
        closeAble: T_closeAble,
        closeOnClick: T_closeOnClick,
        message: "No changes made!",
      });
      return;
    }

    try {
      // Update the entry in the data array
      data[index] = updatedEntry;
      saveData(data);

      // Show success toast
      showToast.success({
        theme: T_theme,
        position: T_position,
        transition: T_transition,
        autoClose: T_autoClose,
        hideProgressBar: T_hideProgressBar,
        pauseOnHover: T_pauseOnHover,
        closeAble: T_closeAble,
        closeOnClick: T_closeOnClick,
        message: "Updated successfully!",
      });

      // Call ListItems to refresh the list
      ListItems(content);
    } catch (e) {
      // Show error toast if there's an issue
      showToast.error({
        theme: T_theme,
        position: T_position,
        transition: T_transition,
        autoClose: T_autoClose,
        hideProgressBar: T_hideProgressBar,
        pauseOnHover: T_pauseOnHover,
        closeAble: T_closeAble,
        closeOnClick: T_closeOnClick,
        message: "Failed to Update!",
      });
    }
  });

  // Cancel button click handler
  document.getElementById("cancelBtn").addEventListener("click", () => {
    ListItems(content); // Call the ListItems function and pass the content element
  });
};
