document.addEventListener('DOMContentLoaded', function () {
  // --- Countdown and Progress Bar Logic ---
  const reunionDate = new Date('July 31, 2025 16:00:00').getTime();

  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');
  const progressBar = document.getElementById('progress-bar');
  const message = document.querySelector('.message');

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
      return;
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

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- Single Centered Background Image with Blurred Background ---
  const backgroundImages = [
    'images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg',
    'images/image4.jpg', 'images/image5.jpg', 'images/image6.jpg',
    'images/image7.jpg', 'images/image8.jpg', 'images/image9.jpg',
    'images/image10.jpg', 'images/image11.jpg', 'images/image12.jpg',
    'images/image13.jpg',
  ];

  const backgroundContainer = document.querySelector('.background');
  const switchInterval = 4000; // 10 seconds
  let previousIndex = -1;

  // Create blurred full-screen background
  const blurredBg = document.createElement('div');
  blurredBg.style.position = 'absolute';
  blurredBg.style.top = 0;
  blurredBg.style.left = 0;
  blurredBg.style.width = '100vw';
  blurredBg.style.height = '100vh';
  blurredBg.style.zIndex = '-2';
  blurredBg.style.backgroundSize = 'cover';
  blurredBg.style.backgroundPosition = 'center';
  blurredBg.style.filter = 'blur(25px)';
  blurredBg.style.transition = 'background-image 1s ease-in-out';
  backgroundContainer.appendChild(blurredBg);

  // Create image element in center
  const fgImage = document.createElement('img');
  fgImage.style.position = 'absolute';
  fgImage.style.top = '50%';
  fgImage.style.left = '50%';
  fgImage.style.transform = 'translate(-50%, -50%)';
  fgImage.style.transition = 'opacity 1s ease-in-out';
  fgImage.style.zIndex = '-1';
  fgImage.style.opacity = 0;
  backgroundContainer.appendChild(fgImage);

  function switchBackgroundImage() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * backgroundImages.length);
    } while (newIndex === previousIndex);
    previousIndex = newIndex;

    const newImageSrc = backgroundImages[newIndex];

    const tempImg = new Image();
    tempImg.src = newImageSrc;
    tempImg.onload = () => {
      fgImage.style.opacity = 0;

      setTimeout(() => {
        // Update blurred background
        blurredBg.style.backgroundImage = `url(${newImageSrc})`;

        // Update centered foreground image
        fgImage.src = newImageSrc;
        fgImage.style.width = tempImg.naturalWidth / 2 + 'px'; // Adjust size if needed
        fgImage.style.height = 'auto';

        fgImage.style.opacity = 1;
      }, 500);
    };
  }

  switchBackgroundImage();
  setInterval(switchBackgroundImage, switchInterval);
});
