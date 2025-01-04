const content = document.getElementById("content");

 const currentMonth = new Date().toLocaleString("default", {
  month: "long",
}); // Get current month name

// Delete Entry Functionality
 const deleteEntry = (index, item) => {
  openModal(
    "fa-regular fa-trash-can", // Icon class
    "#c9302c", // Icon color
    "450px", // Modal size
    `Are you sure you want to delete ${item}?`, // Modal message
    "Delete Confirmation", // Header
    "center", // Header alignment
    50, // Icon size
    "100%", // Button width option
    "Yes", // Yes button text
    "No", // No button text
    "#0056b3", // Yes button color
    "#dc3545", // No button color
    "horizontal", // Layout (horizontal/vertical)
    () => {
      // Yes callback
      try {
        const data = getData();
        data.splice(index, 1); // Remove the entry at the specified index
        saveData(data); // Save the updated data

        // Show a success toast notification
        showToast.success({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Deleted successfully!",
        });

        // Re-render the entries after deletion
        renderEntries();
      } catch (e) {

        // Show an error toast notification
        showToast.error({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Failed to delete the entry!",
        });
      }
    },
    () => {
      return false; // No callback
    }
  );
};

// Function to clear all items from localStorage and re-render the entries
 const clearAllItems = () => {
  openModal(
    "fa-regular fa-trash-can", // Icon class
    "#c9302c", // Icon color
    "450px", // Modal size
    `Are you sure you want clear all data?`, // Modal message
    "Delete Confirmation", // Header
    "center", // Header alignment
    50, // Icon size
    "100%", // Button width option
    "Yes", // Yes button text
    "No", // No button text
    "#0056b3", // Yes button color
    "#dc3545", // No button color
    "horizontal", // Layout (horizontal/vertical)
    () => {
      // Yes callback
      try {
        localStorage.removeItem("expenzo_list_data"); // Clear all stored data
        localStorage.removeItem("expenzo_status"); // Clear all stored data

        // Provide success feedback using a toast notification
        showToast.success({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Cleared successfully!",
        });

        // Re-render the entries to reflect the cleared data
        renderEntries();
      } catch (e) {
        // Provide error feedback using a toast notification
        showToast.error({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Failed to clear!",
        });
      }
    },
    () => {
      return false; // No callback
    }
  );
};

// Function to save the list as a PDF
const { jsPDF } = window.jspdf;

 const saveAsPDF = () => {
  const table = document.getElementById("entry-table");
  const doc = new jsPDF(); // Create a new jsPDF instance

  // Prepare table data from the HTML table
  const rows = [];
  const header = ["No.", "Item", "Quantity", "Category", "Amount", "Date"];

  // Get table rows (excluding the actions column)
  const tableRows = Array.from(table.querySelectorAll("tbody tr"));
  tableRows.forEach((row) => {
    const columns = Array.from(row.querySelectorAll("td"));
    const rowData = columns.slice(0, 6).map((column) => column.innerText); // Extract data from the first 5 columns
    rows.push(rowData);
  });
  console.log(rows);
  

  // Use autoTable to generate a more beautiful and structured table in the PDF
  doc.autoTable({
    head: [header], // Table header
    body: rows, // Table rows
    startY: 20, // Start the table at Y position 20
    theme: "grid", // Apply a grid theme (with borders)
    headStyles: {
      fillColor: [41, 128, 185], // Header background color
      textColor: [255, 255, 255], // Header text color (white)
      fontStyle: "bold", // Bold text in the header
      halign: "center", // Center align header text
    },
    bodyStyles: {
      textColor: [0, 0, 0], // Table cell text color (black)
      halign: "center", // Horizontal alignment of table cells
      valign: "middle", // Vertical alignment
    },
    columnStyles: {
      0: { cellWidth: 10 }, // Column width for Item
      1: { cellWidth: 40 }, // Column width for Item
      2: { cellWidth: 30 }, // Column width for Quantity
      3: { cellWidth: 40 }, // Column width for Category
      4: { cellWidth: 30 }, // Column width for Amount (Taka symbol)
      5: { cellWidth: 40 }, // Column width for Date
    },
    margin: { right: 5 }, // Margin from the top
  });

  try {
    // Save the generated PDF
    doc.save("Daily-Expenses.pdf");

    // Provide success feedback using a toast notification
    showToast.success({
      theme: T_theme,
      position: T_position,
      transition: T_transition,
      autoClose: T_autoClose,
      hideProgressBar: T_hideProgressBar,
      pauseOnHover: T_pauseOnHover,
      closeAble: T_closeAble,
      closeOnClick: T_closeOnClick,
      message: "PDF saved successfully!",
    });
  } catch (e) {
    // Provide error feedback using a toast notification
    showToast.error({
      theme: T_theme,
      position: T_position,
      transition: T_transition,
      autoClose: T_autoClose,
      hideProgressBar: T_hideProgressBar,
      pauseOnHover: T_pauseOnHover,
      closeAble: T_closeAble,
      closeOnClick: T_closeOnClick,
      message: "Failed to save the PDF!",
    });
  }
};

