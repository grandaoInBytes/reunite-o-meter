document.addEventListener('DOMContentLoaded', function () {
  // --- Countdown and Progress Bar Logic ---
  const reunionDate = new Date('July 31, 2025 16:00:00').getTime();

  // Countdown elements
  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');
  const progressBar = document.getElementById('progress-bar');
  const message = document.querySelector('.message');

  // To update progress bar
  const startDate = new Date('May 13, 2025 16:00:00').getTime();
  const totalDuration = reunionDate - startDate;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = reunionDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdown').innerHTML = "<h2>🥳 It's Time! 🥳</h2>";
      message.textContent = 'Welcome to Italy!🥰';
      progressBar.style.width = '100%';
      progressBar.style.boxShadow = '0 0 20px #aaffaa, 0 0 30px #aaffaa';
      return; // Stop the function here
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');

    if (totalDuration > 0) {
      const progress = ((now - startDate) / totalDuration) * 100;
      progressBar.style.width = Math.min(100, progress) + '%';
    } else {
      progressBar.style.width = '0%';
    }
  }

  // loop to update the countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // Dynamic Background Image Animation Logic ---
  const backgroundImages = [
    'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg',
    'images/image4.jpg', 'images/image5.jpg', 'images/image6.jpg',
    'images/image7.jpg', 'images/image8.jpg', 'images/image9.jpg',
    'images/image10.jpg', 'images/image11.jpg', 'images/image12.jpg',
    'images/image13.jpg',
  ];

  const backgroundContainer = document.querySelector('.background');
  const numImagesToShow = 5;

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  // All images will now move towards the same general quadrant of the screen.
  // Reload the page to get a new direction.
  const xDirection = Math.random() < 0.5 ? -1 : 1; // -1 for left, 1 for right
  const yDirection = Math.random() < 0.5 ? -1 : 1; // -1 for up, 1 for down

  function createImageElement() {
    const img = document.createElement('img');
    const randomImagePath = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    
    // Set initial styles for the image
    img.src = randomImagePath;
    img.alt = 'Background image';
    img.style.position = 'absolute'; // Important for positioning
    //img.style.filter = 'blur(2.5px)';
    img.style.left = getRandom(-20, 100) + 'vw';
    img.style.top = getRandom(-20, 100) + 'vh';
    img.style.width = getRandom(600, 1000) + 'px';
    img.style.height = img.style.width;
    img.style.opacity = 0; // Start with opacity 0

    // Define the keyframes for this specific image's animation
    const endX = xDirection * getRandom(100, 250) + 'vw'; // Translate more: Increased range
    const endY = yDirection * getRandom(100, 250) + 'vh'; // Translate more: Increased range

    // Not all should rotate: 60% chance to rotate to a random degree
    const rotation = Math.random() > 0.4 ? `rotate(${getRandom(-270, 270)}deg)` : 'rotate(0deg)';

    const keyframes = [
      { transform: 'scale(0.8) rotate(0deg)', opacity: 0 },
      { opacity: 0.6, offset: 0.1 },
      { opacity: 0.6, offset: 0.9 },
      { transform: `translate(${endX}, ${endY}) scale(1.2) ${rotation}`, opacity: 0 }
    ];

    // Define the options for the animation
    const options = {
      duration: getRandom(20000, 35000), // Animate over 20 to 35 seconds
      easing: 'linear',
      fill: 'forwards' // Ensures it stays at its final state (invisible)
    };

    // Run the animation
    const animation = img.animate(keyframes, options);

    // When the animation finishes, remove the element and create a new one
    animation.onfinish = () => {
      img.remove();
      createImageElement();
    };

    backgroundContainer.appendChild(img);
  }

  // Create initial set of images
  for (let i = 0; i < numImagesToShow; i++) {
    setTimeout(createImageElement, i * (5000 / numImagesToShow));
  }
});
