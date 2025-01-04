
 const Summary = () => {
  content.innerHTML = `
    <div class="section">
        <h2>Summary</h2>
        <div class="form-group filter-input">
          <label for="filter-month">Filter by Month</label>
          <select id="filter-month">
          <option value="">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Paid Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody id="summary-tbody">
                <!-- Entries will be populated here dynamically -->
            </tbody>
        </table>
        <h2>Pi Chart</h2>
        <canvas id="chart"></canvas>
        <div id="year-summary"></div>
    </div>
  `;
  const currentYear = new Date().getFullYear();
  // Set the current month as selected in the dropdown
  document.getElementById("filter-month").value = currentMonth;
  // Attach filter change event listener
  document.getElementById("filter-month").addEventListener("change", () => {
    renderSummary();
  });
  renderSummary();
  renderChart();
  renderYearSummary(currentYear);
};

// Render Summary Table with Status and Paid Date from Local Storage
const renderSummary = () => {
  try {
    const data = getData(); // Get data from localStorage

    const filterMonth = document.getElementById("filter-month").value;

    const summaryTbody = document.getElementById("summary-tbody");
    summaryTbody.innerHTML = ""; // Clear any existing content

    // Filter the data based on the selected month
    const filteredData = data.filter((entry) => {
      if (!filterMonth || filterMonth === "all") {
        return true; // If no filter is applied or "Current Year" is selected, include all data
      }
      const entryMonth = new Date(entry.date).toLocaleString("default", {
        month: "long",
      });
      return entryMonth === filterMonth;
    });

    if (filteredData.length === 0) {
      // Display "No data to display" message
      const row = document.createElement("tr");
      row.innerHTML = `
          <td colspan="4" style="text-align: center; font-style: italic;">No data to display!</td>
      `;
      summaryTbody.appendChild(row);
      return;
    }

    // Calculate totals for filtered data
    const totals = filteredData.reduce((acc, entry) => {
      acc[entry.category] =
        (acc[entry.category] || 0) + parseFloat(entry.amount);
      return acc;
    }, {});

    // Get the expenses status object from localStorage or initialize it as an empty object
    const expensesStatus =
      JSON.parse(localStorage.getItem("expenzo_status")) || {};

    // Populate the summary table with filtered category data
    Object.keys(totals).forEach((category) => {
      const row = document.createElement("tr");

      // Retrieve the saved status and paid date from expensesStatus object in localStorage
      const categoryStatus = expensesStatus[category] || {
        status: "Unpaid",
        paidDate: "-",
      };
      const { status, paidDate } = categoryStatus;

      row.innerHTML = `
          <td>${category}</td>
          <td class="status" style="color: ${
            status === "Paid" ? "green" : "red"
          };" data-status="${status}">
          ${status === "Paid" ? `Paid` : "Unpaid"}
          </td>
          <td>${paidDate}</td>
          <td>${totals[category]} ৳</td>
      `;

      // Add the row to the table
      summaryTbody.appendChild(row);

      // Add an event listener to toggle status when clicked
      row.querySelector(".status").addEventListener("click", (e) => {
        const statusCell = e.target;
        const paidDateCell = statusCell
          .closest("tr")
          .querySelector("td:nth-child(3)");
        const currentStatus = statusCell.getAttribute("data-status");
        const now = new Date().toLocaleDateString(); // Only use the date part (e.g., YYYY-MM-DD)

        if (currentStatus === "Unpaid") {
          // Change status to Paid and add the date
          statusCell.textContent = `Paid`;
          statusCell.style.color = "green";
          statusCell.setAttribute("data-status", "Paid");
          paidDateCell.textContent = now; // Show paid date in the Paid Date column

          // Update the expensesStatus object and save it to localStorage
          expensesStatus[category] = { status: "Paid", paidDate: now };
          localStorage.setItem(
            "expenzo_status",
            JSON.stringify(expensesStatus)
          );
        } else {
          // Change status back to Unpaid
          statusCell.textContent = "Unpaid";
          statusCell.style.color = "red";
          statusCell.setAttribute("data-status", "Unpaid");
          paidDateCell.textContent = "-"; // Reset Paid Date column

          // Update the expensesStatus object and save it to localStorage
          expensesStatus[category] = { status: "Unpaid", paidDate: "-" };
          localStorage.setItem(
            "expenzo_status",
            JSON.stringify(expensesStatus)
          );
        }
      });
    });

    // Add total row
    const totalRow = document.createElement("tr");
    totalRow.classList.add("total-row");
    totalRow.innerHTML = `
      <td colspan="3">TOTAL:</td>
      <td>${Object.values(totals).reduce(
        (sum, amount) => sum + amount,
        0
      )} ৳</td>
    `;
    summaryTbody.appendChild(totalRow);
  } catch (e) {
    showToast.error({
      theme: T_theme,
      position: T_position,
      transition: T_transition,
      autoClose: T_autoClose,
      hideProgressBar: T_hideProgressBar,
      pauseOnHover: T_pauseOnHover,
      closeAble: T_closeAble,
      closeOnClick: T_closeOnClick,
      message: "Failed to render summary!",
    });
  }
};

const renderYearSummary = (year) => {
  const data = getData(); // Get all data from localStorage

  // Group data by category and calculate monthly totals
  const categories = [...new Set(data.map((entry) => entry.category))]; // Get unique categories
  const categoryTotals = {};

  categories.forEach((category) => {
    const monthlyTotals = Array(12).fill(0); // Initialize an array for 12 months
    data.forEach((entry) => {
      const entryYear = new Date(entry.date).getFullYear();
      const month = new Date(entry.date).getMonth(); // Get month (0-11)

      if (entryYear === year && entry.category === category) {
        monthlyTotals[month] += parseFloat(entry.amount);
      }
    });
    categoryTotals[category] = monthlyTotals;
  });

  // Display summary
  const summaryDiv = document.getElementById("year-summary");
  summaryDiv.innerHTML = `
  <h2>Yearly Summary for ${year}</h2>
  <canvas id="line-chart"></canvas>
  `;

  // Prepare datasets for the chart
  const datasets = Object.keys(categoryTotals).map((category, index) => {
    const colors = [
      "#B71C1C", // Darker Red
      "#0D47A1", // Darker Blue
      "#E65100", // Darker Orange
      "#1B5E20", // Darker Green
      "#4A148C", // Darker Purple
      "#D32F2F", // More intense Red
      "#01579B", // Deeper Dark Blue
      "#FBC02D", // Deeper Yellow
      "#1B5E20", // Darker Green
      "#C2185B", // Deeper Pink
      "#0097A7", // Deeper Cyan
      "#F57C00", // Deeper Amber
      "#6A1B9A", // Deeper Purple
      "#388E3C", // Darker Green
      "#D84315", // Darker Deep Orange
    ];

    return {
      label: category,
      data: categoryTotals[category],
      borderColor: colors[index % colors.length],
      backgroundColor: `${colors[index % colors.length]}33`, // Transparent version
      tension: 0.4,
      fill: true,
    };
  });

  // Render line graph
  const ctx = document.getElementById("line-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    options: { indexAxis: "y" },
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Cost (৳)",
          },
        },
      },
    },
  });
};

// Render Chart for Summary Page
const renderChart = () => {
  const data = getData();
  const totals = data.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + parseFloat(entry.amount);
    return acc;
  }, {});

  // Define a fixed color mapping for categories
  const categoryColors = {
    Grocery: "#FF6384", // Soft Red
    Medicine: "#36A2EB", // Soft Blue
    Vegetables: "#FFCE56", // Soft Yellow
    Others: "#4BC0C0", // Soft Teal
    Utilities: "#9966FF", // Soft Purple
    Entertainment: "#FFA07A", // Light Salmon
    Transport: "#87CEEB", // Sky Blue
    Education: "#FFD700", // Soft Gold
    Clothing: "#90EE90", // Light Green
    Dining: "#FFB6C1", // Light Pink
    "Personal Care": "#AFEEEE", // Pale Turquoise
    Miscellaneous: "#FFE4B5", // Moccasin
  };

  // Assign colors based on category keys
  const labels = Object.keys(totals);
  const datasetColors = labels.map(
    (category) => categoryColors[category] || "#B0E0E6" // Default to Powder Blue if no color defined
  );

  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: Object.values(totals),
          backgroundColor: datasetColors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
};
