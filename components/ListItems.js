 const ListItems = (content) => {
  content.innerHTML = `
   <div class="section">
   <h2>Daily Expences</h2>
   <h3>Current Month: ${currentMonth}</h3> <!-- Display current month -->
   
   <div class="filter-container">
    <div class="form-group filter-input">
      <label for="filter-item">Filter by Item</label>
      <input type="text" id="filter-item" placeholder="Filter by item name" />
    </div>
    <div class="form-group filter-input">
      <label for="filter-category">Filter by Category</label>
      <select class="catagory" id="filter-category">
          <!-- Categories will be populated here -->
      </select>
    </div>
   </div>
   <div class="list-table">
    <table id="entry-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Entries will be populated here dynamically -->
      </tbody>
    </table>
   </div>
   <div class="actions">
    <button id="clear-all" class="btn btn-clear"><i class="fa-solid fa-broom"></i> Clear All</button> <!-- Button to clear all items -->
    <button id="save-pdf" class="btn btn-save"><i class="fa-regular fa-file-pdf"></i> Save as PDF</button> <!-- Button to save as PDF -->
   </div>
   </div>
   `;

  renderEntries(); // Render entries without filters initially

// Pass an object with a default option
renderCategories({
  defaultOption: {
    value: "",
    text: "All Catagories"
  }
});
  
  // Event listeners for filtering
  document
    .getElementById("filter-item")
    .addEventListener("input", renderEntries);
  document
    .getElementById("filter-category")
    .addEventListener("change", renderEntries);

  // Clear all items event listener
  document.getElementById("clear-all").addEventListener("click", clearAllItems);

  // Save as PDF event listener
  document.getElementById("save-pdf").addEventListener("click", saveAsPDF);
};
