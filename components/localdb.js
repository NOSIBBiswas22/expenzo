
// Local Storage Utilities
 const getData = () => {
  try {
    const data = localStorage.getItem("expenzo_list_data");
    return data ? JSON.parse(data) : [];
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
      message: "Error! Unable to get data.",
    });
    return []; // Return an empty array if there's an error
  }
};

 const saveData = (data) => {
  try {
    localStorage.setItem("expenzo_list_data", JSON.stringify(data));
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
      message: "Error! Unable to save data.",
    });
  }
};


// Get categories from localStorage or initialize as an empty array
 const getCategories = () => {
  try {
    const categories = JSON.parse(localStorage.getItem("expenzo_categories"));
    if (!categories) {
      // If no categories exist, set default categories
      const defaultCategories = ["Grocery", "Vegetables", "Medicine", "Others"];
      localStorage.setItem("expenzo_categories", JSON.stringify(defaultCategories));
      return defaultCategories;
    }
    return categories || []; // Return empty array if no categories are found
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
      message: "Error! Unable to save data.",
    });
    return []; // Return empty array in case of an error
  }
};

// Save categories to localStorage
 const saveCategories = (categories) => {
  try {
    localStorage.setItem("expenzo_categories", JSON.stringify(categories));
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
      message: "Error! Unable to save data.",
    });
  }
};
