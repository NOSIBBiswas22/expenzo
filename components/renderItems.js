
 const renderEntries = () => {
  const data = getData(); // Get data from localStorage
  const filterItem = document.getElementById("filter-item").value.toLowerCase();
  const filterCategory = document.getElementById("filter-category").value;

  const tableBody = document
    .getElementById("entry-table")
    .querySelector("tbody");
  tableBody.innerHTML = ""; // Clear any existing content

  // Filter the data based on the input and selected category
  const filteredData = data
    .map((entry, index) => ({ ...entry, originalIndex: index })) // Add the original index to each entry
    .filter((entry) => {
      const itemNameMatch = entry.item.toLowerCase().includes(filterItem);
      const categoryMatch = filterCategory
        ? entry.category === filterCategory
        : true;
      return itemNameMatch && categoryMatch;
    })
    .reverse(); // Reverse the order so the latest item appears first

  if (filteredData.length === 0) {
    // Display "No data to display" message
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="7" style="margin: 4px; text-align: center; font-style: italic;">No data to display. Add some entries.</td>
    `;
    tableBody.appendChild(row);
    return;
  }

  filteredData.forEach((entry) => {

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.originalIndex + 1}</td>
      <td>${entry.item}</td>
      <td>${entry.quantity}</td>
      <td>${entry.category}</td>
      <td>${entry.amount} ৳</td>
      <td>${entry.date}</td>
      <td>
          <button class="editBtn btn" data-index="${entry.originalIndex}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="deleteBtn btn" style="background: #dc3545;" data-index="${entry.originalIndex}" data-item="${entry.item}"><i class="fa-regular fa-trash-can"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
    i++;
  });

  // Add event listeners programmatically after the DOM is updated
  const editButtons = document.querySelectorAll(".editBtn");
  const deleteButtons = document.querySelectorAll(".deleteBtn");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", (event) => {
      const index = event.target.closest("button").getAttribute("data-index");
      EditEntry(index, content);
    });
  });

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      const index = event.target.closest("button").getAttribute("data-index");
      const item = event.target.closest("button").getAttribute("data-item");
      deleteEntry(index, item);
    });
  });
};
