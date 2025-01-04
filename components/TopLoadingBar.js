 const TopLoadingBar = ({ color = '#007bff', height = '4px', speed = 300 } = {}) => {
    let progressValue = 0;
    let interval;
  
    // Create loading bar element
    const bar = document.createElement('div');
    bar.classList.add('top-loading-bar');
    bar.style.backgroundColor = color;
    bar.style.height = height;
    bar.style.transition = `width ${speed}ms ease-out, opacity ${speed}ms ease-out`;
    document.body.appendChild(bar);
  
    // Start the loading process
    const start = () => {
      progressValue = 0;
      bar.style.width = '0';
      bar.style.opacity = '1';
  
      interval = setInterval(() => {
        if (progressValue < 90) {
          const increment = Math.random() * 2 + 1; // Smaller increments for smoother progress
          progressValue = Math.min(progressValue + increment, 90); // Cap at 90%
          bar.style.width = `${progressValue}%`;
        }
      }, speed);
    };
  
    // Set progress to a specific percentage
    const progress = (value) => {
      if (value > progressValue && value <= 100) {
        progressValue = value;
        bar.style.width = `${value}%`;
      }
    };
  
    // Complete and hide the loading bar
    const finish = () => {
      clearInterval(interval);
      progressValue = 100;
      bar.style.width = '100%';
  
      setTimeout(() => {
        bar.style.opacity = '0';
        setTimeout(() => {
          bar.style.width = '0'; // Reset width after fading out
        }, speed);
      }, speed);
    };
  
    // Reset the bar to its initial state
    const reset = () => {
      clearInterval(interval);
      progressValue = 0;
      bar.style.width = '0';
      bar.style.opacity = '0';
    };
  
    // Return the API
    return { start, progress, finish, reset };
  };
  