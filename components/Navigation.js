 const Navigation = (navSelector) => {
  // Select all navigation links
  const navLinks = document.querySelectorAll(`${navSelector} a`);

  // Add click event listeners to each navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Remove 'active' class from all links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Add 'active' class to the clicked link
      link.classList.add("active");
    });
  });

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Select the element by class name (assuming there is only one footer-span or you're targeting the first one)
  const footerSpan = document.getElementsByClassName("footer-year")[0];

  // Set the content of the footer span to the current year
  if (footerSpan) {
    footerSpan.textContent = currentYear;
  }
};
