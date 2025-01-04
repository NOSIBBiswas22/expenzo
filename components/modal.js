 const openModal = (
    modalIcon,
    modalIconColor,
    modalSize,
    modalData,
    header,
    headerAlignment,
    count,
    buttonWidthOption,
    yesText,
    noText,
    yesColor,
    noColor,
    layout,
    yesCallback,
    noCallback
  ) => {
    // Create the modal container
    const modalContainer = document.createElement("div");
    modalContainer.id = "custom-modal";
    modalContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    `;
  
    // Create the modal content
    const modalContent = document.createElement("div");
    modalContent.style.cssText = `
      background: #fff;
      border-radius: 10px;
      padding: 20px;
      width: ${modalSize || "400px"};
      text-align: ${headerAlignment || "center"};
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      position: relative;
    `;
  
    // Add modal icon
    if (modalIcon) {
      const icon = document.createElement("i");
      icon.className = modalIcon;
      icon.style.cssText = `
        font-size: ${count || 24}px;
        color: ${modalIconColor || "#000"};
        display: block;
        margin: 0 auto 10px;
      `;
      modalContent.appendChild(icon);
    }
  
    // Add modal header
    if (header) {
      const modalHeader = document.createElement("h2");
      modalHeader.textContent = header;
      modalHeader.style.marginBottom = "10px";
      modalContent.appendChild(modalHeader);
    }
  
    // Add modal data
    if (modalData) {
      const modalBody = document.createElement("p");
      modalBody.textContent = modalData;
      modalBody.style.marginBottom = "25px";
      modalBody.style.fontSize = "17px";
      modalContent.appendChild(modalBody);
    }
  
    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.cssText = `
      display: flex;
      flex-direction: ${layout === "vertical" ? "column" : "row"};
      justify-content: space-around;
      gap: 10px;
    `;
  
    // Create Yes button
    const yesButton = document.createElement("button");
    yesButton.textContent = yesText || "Yes";
    yesButton.style.cssText = `
      background: ${yesColor || "#28a745"};
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: ${buttonWidthOption || "auto"};
    `;
    yesButton.addEventListener("click", () => {
      yesCallback();
      closeModal(); // Close modal on Yes
    });
    buttonsContainer.appendChild(yesButton);
  
    // Create No button
    const noButton = document.createElement("button");
    noButton.textContent = noText || "No";
    noButton.style.cssText = `
      background: ${noColor || "#dc3545"};
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      width: ${buttonWidthOption || "auto"};
    `;
    noButton.addEventListener("click", () => {
      if (noCallback) noCallback();
      closeModal(); // Close modal on No
    });
    buttonsContainer.appendChild(noButton);
  
    // Append buttons to modal content
    modalContent.appendChild(buttonsContainer);
  
    // Append modal content to modal container
    modalContainer.appendChild(modalContent);
  
    // Append modal container to body
    document.body.appendChild(modalContainer);
  
    // Close modal function
    const closeModal = () => {
      if (modalContainer) {
        modalContainer.remove();
      }
    };
  };
  