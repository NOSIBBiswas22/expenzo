function AddItem(content) {
    content.innerHTML = `<div class="section">
          <h2>Add Entry</h2>
          <form id="entry-form">
              <div class="form-group">
                  <label for="item">Item Name</label>
                  <input type="text" id="item" required />
              </div>
              <div class="form-group">
                  <label for="quantity">Quantity</label>
                  <input type="number" id="quantity" min="1" required />
              </div>
              <div class="form-group">
                <label for="category">Category</label>
                <select class="catagory" id="filter-category">
                    <!-- Categories will be populated here -->
                </select>
              </div>
              <div class="form-group">
                  <label for="amount">Estimated Amount</label>
                  <input type="number" id="amount" min="0" required />
              </div>
              <button type="submit" class="btn"><i class="fa-solid fa-plus"></i>  Add Entry</button>
          </form>
      </div>
  `;
  
    // Populate categories when the page loads
    renderCategories();

    document.getElementById("entry-form").addEventListener("submit", (e) => {
      e.preventDefault();

      try {
        const item = document.getElementById("item").value;
        const quantity = document.getElementById("quantity").value;
        const category = document.getElementById("filter-category").value;
        const amount = document.getElementById("amount").value;
        const date = new Date().toISOString().split("T")[0];
    
        const data = getData();
        data.push({ item, quantity, category, amount, date });
        saveData(data);
    
      //   alert("Item added successfully!");
      showToast.success({
          theme: T_theme,
          position: T_position,
          transition: T_transition,
          autoClose: T_autoClose,
          hideProgressBar: T_hideProgressBar,
          pauseOnHover: T_pauseOnHover,
          closeAble: T_closeAble,
          closeOnClick: T_closeOnClick,
          message: "Added successfully!",
      });
        document.getElementById("entry-form").reset();
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
            message: "Faild to add! Try again.",
        });
      }

    });
  };