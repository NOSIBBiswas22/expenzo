function loadResource(type, attributes) {
    const element = document.createElement(type);
    Object.keys(attributes).forEach((key) => {
      element[key] = attributes[key];
    });
    document.head.appendChild(element);
  }
  
  // Load all resources
  const resources = [
    // Stylesheets
    {
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
      },
    },
    {
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
      },
    },
  
    // Scripts
    {
      type: "script",
      attributes: { src: "https://cdn.lordicon.com/lordicon.js" },
    },
    {
      type: "script",
      attributes: {
        src: "https://unpkg.com/boxicons@2.1.4/dist/boxicons.js",
      },
    },
  ];
  
  // Dynamically load each resource
  resources.forEach((resource) =>
    loadResource(resource.type, resource.attributes)
  );
  
  function addToastStyles() {
    if (!document.getElementById("toastStyles")) {
      const toastStyles = `  
          :root {
            --toast-bg-color: #fff;
            --toast-font-color: #666666;
            --progress-color: #4070f4; /* Default color */
            --icon-color: #4070f4; /* Default icon color */
          }
    
          .toast {
            display: flex;
            position: fixed;
            width: 39vh; /* Fixed width for better centering */
            height: auto;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            overflow: hidden;
            align-items: center;
            background-color: var(--toast-bg-color);
            color: var(--toast-font-color);
          }
    
          /* Active State */
          .toast.active {
            opacity: 1;
            pointer-events: auto;
          }
    
          /* Toast transitions */
  
          /* .toast.bounce-top {
            animation: bounce-top 0.5s forwards;
          }
    
          .toast.slide {
            transform: translateY(-40px);
            animation: slide 0.6s forwards;
          }
    
          .toast.zoom {
            transform: scale(0);
            animation: zoom 0.3s forwards;
          }
    
          .toast.flip {
            transform: rotateY(90deg);
            animation: flip 0.5s forwards;
          }
    
          @keyframes bounce-top {
            0% {
              transform: translateY(-30px);
            }
            50% {
              transform: translateY(25px);
            }
            100% {
              transform: translateY(0);
            }
          }
    
          @keyframes slide {
            0% {
              transform: translateX(-40px);
            }
            50% {
              transform: translateX(15px);
            }
            100% {
              transform: translateX(0);
            }
          }
    
          @keyframes zoom {
            0% {
              transform: scale(0);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
    
          @keyframes flip {
            0% {
              transform: rotateX(90deg);
            }
            100% {
              transform: rotateX(0);
            }
          } */
    
          .toast .toast-content {
            display: flex;
            align-items: center;
            margin-right: 10px;
          }
    
          .toast-content .toast-icon {
            font-size: 20px;
            margin-right: 10px;
            color: var(--icon-color);
          }
    
          .toast-content .toast-message {
            font-size: 16px;
            font-weight: 400;
          }
    
          .toast .toast-close {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 17px;
            padding: 5px;
            cursor: pointer;
            opacity: 0.5;
          }
    
          .toast .toast-close:hover {
            opacity: 1;
          }
    
          .toast .toast-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            width: 100%;
            background: #ddd;
            overflow: hidden;
          }
    
          .toast .toast-progress:before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            height: 100%;
            width: 100%;
            border-radius: 5px;
            background-color: var(--progress-color);
            transition: width linear;
          }
    
          .toast.active .toast-progress:before {
            transition: width linear;
          }
    
          .toast.active ~ button {
            pointer-events: none;
          }
    
          /* Positioning styles */
          .top-left {
            top: 20px;
            left: 20px;
            right: auto;
            bottom: auto;
          }
    
          .top-right {
            top: 20px;
            right: 20px;
            left: auto;
            bottom: auto;
          }
    
          .top-center {
            top: 20px;
            left: 50%;
            margin-left: -19.5vh; /* Half of the fixed width (39vh) */
          }
    
          .bottom-left {
            bottom: 20px;
            left: 20px;
            right: auto;
            top: auto;
          }
    
          .bottom-right {
            bottom: 20px;
            right: 20px;
            left: auto;
            top: auto;
          }
    
          .bottom-center {
            bottom: 20px;
            left: 50%;
            margin-left: -19.5vh; /* Half of the fixed width (39vh) */
          }
    
          /* Bounce Animations */
          @keyframes bounceInLeft {
            0% {
              transform: translateX(-100%) scale(0.8);
              opacity: 0;
            }
            60% {
              transform: translateX(20px) scale(1.1);
              opacity: 1;
            }
            100% {
              transform: translateX(0) scale(1);
            }
          }
    
          @keyframes bounceOutRight {
            0% {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateX(100%) scale(0.8);
              opacity: 0;
            }
          }
    
          @keyframes bounceInRight {
            0% {
              transform: translateX(100%) scale(0.8);
              opacity: 0;
            }
            60% {
              transform: translateX(-20px) scale(1.1);
              opacity: 1;
            }
            100% {
              transform: translateX(0) scale(1);
            }
          }
    
          @keyframes bounceOutLeft {
            0% {
              transform: translateX(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateX(-100%) scale(0.8);
              opacity: 0;
            }
          }
    
          /* Slide Animations */
          @keyframes slideInLeft {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
    
          @keyframes slideOutRight {
            0% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(100%);
              opacity: 0;
            }
          }
    
          @keyframes slideInRight {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
    
          @keyframes slideOutLeft {
            0% {
              transform: translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateX(-100%);
              opacity: 0;
            }
          }
    
          /* Bottom-Center and Top-Center Bounce Animations */
          @keyframes bounceInBottom {
            0% {
              transform: translateY(100%) scale(0.8);
              opacity: 0;
            }
            60% {
              transform: translateY(-10px) scale(1.1);
              opacity: 1;
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
    
          @keyframes bounceOutBottom {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(100%) scale(0.8);
              opacity: 0;
            }
          }
    
          @keyframes bounceInTop {
            0% {
              transform: translateY(-100%) scale(0.8);
              opacity: 0;
            }
            60% {
              transform: translateY(10px) scale(1.1);
              opacity: 1;
            }
            100% {
              transform: translateY(0) scale(1);
            }
          }
    
          @keyframes bounceOutTop {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-100%) scale(0.8);
              opacity: 0;
            }
          }
    
          /* Bottom-Center and Top-Center Slide Animations */
          @keyframes slideInBottom {
            0% {
              transform: translateY(100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
    
          @keyframes slideOutBottom {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(100%);
              opacity: 0;
            }
          }
    
          @keyframes slideInTop {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
    
          @keyframes slideOutTop {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-100%);
              opacity: 0;
            }
          }
    
          /* Zoom Animations */
          @keyframes zoomIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
    
          @keyframes zoomOut {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0.5);
              opacity: 0;
            }
          }
    
          /* Flip Animations */
          @keyframes flipIn {
            0% {
              transform: rotateX(90deg);
              opacity: 0;
            }
            100% {
              transform: rotateX(0);
              opacity: 1;
            }
          }
    
          @keyframes flipOut {
            0% {
              transform: rotateX(0);
              opacity: 1;
            }
            100% {
              transform: rotateX(90deg);
              opacity: 0;
            }
          }
    
          /* Applying Entry Animations */
          .bounce-left {
            animation: bounceInLeft 0.8s forwards;
          }
          .bounce-right {
            animation: bounceInRight 0.8s forwards;
          }
          .bounce-bottom {
            animation: bounceInBottom 0.8s forwards;
          }
          .bounce-top {
            animation: bounceInTop 0.8s forwards;
          }
          .slide-left {
            animation: slideInLeft 0.5s forwards;
          }
          .slide-right {
            animation: slideInRight 0.5s forwards;
          }
          .slide-bottom {
            animation: slideInBottom 0.5s forwards;
          }
          .slide-top {
            animation: slideInTop 0.5s forwards;
          }
          .zoom {
            animation: zoomIn 0.5s forwards;
          }
          .flip {
            animation: flipIn 0.5s forwards;
          }
    
          /* Applying Exit Animations */
          .bounce-left-close {
            animation: bounceOutLeft 0.8s forwards;
          }
          .bounce-right-close {
            animation: bounceOutRight 0.8s forwards;
          }
          .bounce-bottom-close {
            animation: bounceOutBottom 0.8s forwards;
          }
          .bounce-top-close {
            animation: bounceOutTop 0.8s forwards;
          }
          .slide-left-close {
            animation: slideOutLeft 0.5s forwards;
          }
          .slide-right-close {
            animation: slideOutRight 0.5s forwards;
          }
          .slide-bottom-close {
            animation: slideOutBottom 0.5s forwards;
          }
          .slide-top-close {
            animation: slideOutTop 0.5s forwards;
          }
          .zoom-close {
            animation: zoomOut 0.5s forwards;
          }
          .flip-close {
            animation: flipOut 0.5s forwards;
          }
       
        `;
      const toastStyleSheet = document.createElement("style");
      toastStyleSheet.type = "text/css";
      toastStyleSheet.id = "toastStyles"; // Add ID to prevent multiple injections
      toastStyleSheet.innerText = toastStyles;
      document.head.appendChild(toastStyleSheet);
    }
  }
  
  addToastStyles();
  
  function showToast({
    type = "none",
    position = "top-right",
    autoClose = 5000,
    hideProgressBar = false,
    transition,
    closeAble = true,
    closeOnClick = false,
    pauseOnHover = true,
    icon,
    color,
    message,
    theme = "light",
    progressPercent = 100,
    font
  }) {
    // ICON TYPES FOR DIFFERENT TOAST TYPES
    const iconTypes = {
      none: '<i class="fa-solid fa-circle-info"></i>',
      success: '<i class="fa-solid fa-circle-check"></i>',
      error: '<i class="fa-solid fa-circle-exclamation"></i>',
      info: '<i class="fa-solid fa-circle-info"></i>',
      warn: '<i class="fa-solid fa-triangle-exclamation"></i>',
      promise: '<i class="fa-solid fa-spinner fa-spin"></i>'
    };
  
    // DEFAULT MESSAGES FOR DIFFERENT TOAST TYPES
    const messageTypes = {
      none: "This is a Toast.",
      success: "Successfully completed!",
      error: "Something went wrong!",
      info: "Here is some information for you.",
      warn: "Please be cautious!",
      promise: "Loading..."
    };
  
    // SET DEFAULT ICON, COLOR, AND MESSAGE IF NOT PROVIDED
    if (!icon)
      icon = iconTypes[type];
    if (!color)
      color =
        type === "promise"
          ? "#555"
          : type === "success"
          ? "#07bc0c"
          : type === "error"
          ? "#f44"
          : type === "info"
          ? "#4070f4"
          : "#f90";
    if (!message) message = messageTypes[type];
  
    // FUNCTION TO GET ENTRY AND EXIT ANIMATION CLASSES
    function getAnimationClasses(transition, position) {
      // Animation mappings for entry and exit
      const animationMapping = {
        zoom: {
          entry: "zoom",
          exit: "zoom-close",
        },
        flip: {
          entry: "flip",
          exit: "flip-close",
        },
        slide: {
          "top-left": {
            entry: "slide-left",
            exit: "slide-left-close",
          },
          "top-right": {
            entry: "slide-right",
            exit: "slide-right-close",
          },
          "bottom-left": {
            entry: "slide-left",
            exit: "slide-left-close",
          },
          "bottom-right": {
            entry: "slide-right",
            exit: "slide-right-close",
          },
          "top-center": {
            entry: "slide-top",
            exit: "slide-top-close",
          },
          "bottom-center": {
            entry: "slide-bottom",
            exit: "slide-bottom-close",
          },
        },
        bounce: {
          "top-left": {
            entry: "bounce-left",
            exit: "bounce-left-close",
          },
          "top-right": {
            entry: "bounce-right",
            exit: "bounce-right-close",
          },
          "bottom-left": {
            entry: "bounce-left",
            exit: "bounce-left-close",
          },
          "bottom-right": {
            entry: "bounce-right",
            exit: "bounce-right-close",
          },
          "top-center": {
            entry: "bounce-top",
            exit: "bounce-top-close",
          },
          "bottom-center": {
            entry: "bounce-bottom",
            exit: "bounce-bottom-close",
          },
        },
      };
  
      // If transition is 'zoom' or 'flip', return it directly as it doesn't depend on position
      if (transition === "zoom" || transition === "flip") {
        return animationMapping[transition];
      }
  
      // Check if the transition type requires a specific position (slide or bounce)
      if (
        animationMapping[transition] &&
        animationMapping[transition][position]
      ) {
        return animationMapping[transition][position];
      }
  
      // Default to zoom if transition or position not found
      return {
        entry: "zoom",
        exit: "zoom-close",
      };
    }
  
    // Function to generate a unique 8-character ID
    function generateUniqueId() {
      return Math.random().toString(36).substring(2, 10); // Generates a random string of 8 characters
    }
  
    // CREATE THE TOAST ELEMENT
    const newToast = document.createElement("div");
    newToast.style.fontFamily = font;
    const { entry } = getAnimationClasses(transition, position);
  
    // Generate a unique ID for the toast
    const uniqueId = generateUniqueId();
    newToast.id = `toast-${uniqueId}`; // Set the ID with a prefix for clarity
  
    newToast.classList.add("toast", position, entry);
    newToast.innerHTML = `
              <div class="toast-content">
                <span class="toast-icon">${icon}</span>
                <span class="toast-message">${message}</span>
              </div>
              <i class="fa-solid fa-xmark toast-close"></i>
              <div class="toast-progress" id="toastProgress"></div>
            `;
  
    // ADD TOAST TO THE DOCUMENT BODY
    document.body.appendChild(newToast);
  
    // SELECT CLOSE ICON AND PROGRESS BAR ELEMENT
    const closeIcon = newToast.querySelector(".toast-close");
    const progressBar = newToast.querySelector(".toast-progress");
  
    // CHECK IF THE TOAST SHOULD BE CLOSABLE
    if (closeAble) {
      // SHOW CLOSE ICON
      closeIcon.style.display = "block";
      closeIcon.addEventListener("click", () => resetToast(newToast));
    } else {
      // HIDE CLOSE ICON IF NOT CLOSABLE
      closeIcon.style.display = "none";
    }
  
    // CLOSE TOAST ON CLICK IF closeOnClick AND closeAble ARE BOTH TRUE
    if (closeOnClick && closeAble) {
      newToast.addEventListener("click", () => resetToast(newToast));
    }
  
    // INITIALIZE WIDTH, START TIME, REMAINING TIME, AND INTERVAL VARIABLES
    let width = 100;
    let progressInterval;
    let autoCloseTimeout;
    let remainingTime = autoClose;
    let startTime = Date.now();
  
    let targetWidth = 100 - progressPercent; // SET TARGET WIDTH BASED ON INITIAL PERCENTAGE
    const step = targetWidth < width ? -1 : 1; // DETERMINE STEP DIRECTION
  
    // FUNCTION TO START AUTO-CLOSING TOAST AND PROGRESS BAR
    function startAutoClose() {
      startTime = Date.now(); // RESET START TIME
      if (width <= targetWidth || width <= 0) return;
      autoCloseTimeout = setTimeout(() => resetToast(newToast), remainingTime); // SET AUTO-CLOSE TIMEOUT
  
      // IF PROGRESS BAR IS ENABLED, SET UP INTERVAL TO UPDATE WIDTH
      if (!hideProgressBar) {
        if (width <= targetWidth || width <= 0) return;
        progressBar.style.transition = "width 0.1s ease";
        progressInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          width += step; // INCREMENT OR DECREMENT WIDTH BASED ON STEP
  
          progressBar.style.width = `${width}%`;
  
          // CHECK IF WIDTH REACHED TARGET WIDTH AND STOP INTERVAL
          if (width <= targetWidth || width <= 0) {
            clearInterval(progressInterval);
            clearTimeout(autoCloseTimeout);
            width = targetWidth; // SET EXACT TARGET WIDTH TO AVOID OVERFLOW
          }
  
          // IF WIDTH REACHES 0, STOP INTERVAL AND CLOSE TOAST
          if (width <= 0) {
            clearInterval(progressInterval);
            resetToast(newToast);
          }
        }, autoClose / 100);
      }
    }
  
    // FUNCTION TO STOP AUTO-CLOSE AND PAUSE PROGRESS BAR
    function stopAutoClose() {
      clearTimeout(autoCloseTimeout); // CLEAR AUTO-CLOSE TIMEOUT
      remainingTime -= Date.now() - startTime; // UPDATE REMAINING TIME BASED ON TIME PASSED
      clearInterval(progressInterval); // CLEAR PROGRESS INTERVAL
    }
  
    // HIDE PROGRESS BAR IF hideProgressBar IS TRUE
    if (hideProgressBar) {
      progressBar.style.display = "none";
    }
  
    // IF autoClose IS NOT 'none', START AUTO-CLOSE FUNCTION
    if (autoClose !== "none") {
      startAutoClose();
    }
  
    // PAUSE ON HOVER FEATURE
    if (pauseOnHover && autoClose !== "none") {
      newToast.addEventListener("mouseenter", stopAutoClose); // PAUSE ON MOUSE ENTER
      newToast.addEventListener("mouseleave", () => {
        startAutoClose(); // RESUME ON MOUSE LEAVE
      });
    }
  
    // APPLY THEME TO TOAST
    setToastTheme(newToast, theme, color);
  
    // MAKE TOAST ACTIVE TO TRIGGER ANIMATION
    newToast.classList.add("active");
  
    // FUNCTION TO RESET TOAST BY REMOVING IT FROM THE DOM
    function resetToast(toastElement) {
      const { exit } = getAnimationClasses(transition, position);
      toastElement.classList.replace(toastElement.classList.item(3), exit); // Replace entry with exit animation
      setTimeout(() => toastElement.remove(), 300); // REMOVE ELEMENT AFTER TRANSITION
      toastElement.classList.remove("active");
    }
  
    // FUNCTION TO APPLY SELECTED THEME TO THE TOAST
    function setToastTheme(toast, theme, color) {
      switch (theme) {
        case "dark":
          toast.style.setProperty("--toast-bg-color", "#333");
          toast.style.setProperty("--toast-font-color", "#fff");
          toast.style.setProperty("--icon-color", color);
          toast.style.setProperty("--progress-color", color);
          break;
        case "colored":
          toast.style.setProperty("--toast-bg-color", color);
          toast.style.setProperty("--toast-font-color", "#fff");
          toast.style.setProperty("--icon-color", "#fff");
          toast.style.setProperty("--progress-color", "#fff");
          break;
        default:
          toast.style.setProperty("--toast-bg-color", "#fff");
          toast.style.setProperty("--toast-font-color", "#666666");
          toast.style.setProperty("--icon-color", color);
          toast.style.setProperty("--progress-color", color);
          break;
      }
    }
  }
  
  ["none", "success", "error", "info", "warn", "promise"].forEach((type) => {
    showToast[type] = function ({
      position,
      autoClose,
      hideProgressBar,
      transition,
      closeAble,
      closeOnClick,
      pauseOnHover,
      icon,
      color,
      message,
      theme,
      progressPercent,
      font,
      promise,
    }) {
      showToast({
        type,
        position,
        autoClose,
        hideProgressBar,
        transition,
        closeAble,
        closeOnClick,
        pauseOnHover,
        icon,
        color,
        message,
        theme,
        progressPercent,
        font,
        promise,
      });
    };
  });