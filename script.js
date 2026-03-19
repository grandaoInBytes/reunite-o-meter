document.addEventListener('DOMContentLoaded', function () {
  // --- DATA: Store all countdowns here ---
  // Add new countdowns to the top of this list.
  const allCountdowns = [
    {
      title: '✨ Ano novo no Brasil ✨',
      startDate: new Date('September 27, 2025 00:00:00'),
      reunionDate: new Date('December 26, 2025 18:00:00'),
    },
    {
      title: '💘 Vacanza in Italia 💘',
      startDate: new Date('May 13, 2025 16:00:00'),
      reunionDate: new Date('July 31, 2025 16:00:00'),
    },
    // Add more past or future events here as objects
  ];

  // --- DOM Elements ---
  const countdownTitle = document.getElementById('countdown-title');
  const daysSpan = document.getElementById('days');
  const hoursSpan = document.getElementById('hours');
  const minutesSpan = document.getElementById('minutes');
  const secondsSpan = document.getElementById('seconds');
  const progressBar = document.getElementById('progress-bar');
  const message = document.querySelector('.message');
  const historyBtn = document.getElementById('history-btn');
  const modal = document.getElementById('history-modal');
  const closeBtn = document.querySelector('.close-btn');
  const historyList = document.getElementById('history-list');

  let countdownInterval; // To store the interval ID

  // --- LOGIC: Find current and past countdowns ---
  function setupCountdowns() {
    const now = new Date();
    const futureCountdowns = allCountdowns
      .filter((cd) => cd.reunionDate > now)
      .sort((a, b) => a.reunionDate - b.reunionDate); // Sort to find the soonest

    const pastCountdowns = allCountdowns
      .filter((cd) => cd.reunionDate <= now)
      .sort((a, b) => b.reunionDate - a.reunionDate); // Sort to show most recent first

    // Populate history modal
    populateHistory(pastCountdowns);

    // Set up the main countdown
    if (futureCountdowns.length > 0) {
      initializeCountdown(futureCountdowns[0]);
    } else {
      // If no future events, show a message and the last completed event
      countdownTitle.textContent = '💖 Waiting for our next plan! 💖';
      document.getElementById('countdown').innerHTML = '<h2>See you soon!</h2>';
      message.textContent = 'Check out our past adventures! 🥰';
      progressBar.style.width = '100%';
    }
  }

  // --- FUNCTION: Initialize a specific countdown ---
  function initializeCountdown(current) {
    const startDate = current.startDate.getTime();
    const reunionDate = current.reunionDate.getTime();
    const totalDuration = reunionDate - startDate;

    countdownTitle.textContent = current.title;

    function update() {
      const now = new Date().getTime();
      const distance = reunionDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        setupCountdowns(); // Re-evaluate which countdown is next
        return;
      }

      // Update timer
      daysSpan.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
      hoursSpan.textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      minutesSpan.textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      secondsSpan.textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');

      // Update progress bar
      if (totalDuration > 0) {
        const progress = ((now - startDate) / totalDuration) * 100;
        progressBar.style.width = Math.min(100, progress) + '%';
      } else {
        progressBar.style.width = '0%';
      }
    }

    if (countdownInterval) clearInterval(countdownInterval); // Clear any existing timer
    countdownInterval = setInterval(update, 1000);
    update(); // Run once immediately
  }

  // --- FUNCTION: Populate the history modal ---
  function populateHistory(past) {
    historyList.innerHTML = ''; // Clear previous items
    if (past.length === 0) {
      historyList.innerHTML = '<li>No past adventures yet. Here’s to making many!</li>';
      return;
    }

    past.forEach((cd) => {
      const li = document.createElement('li');
      const formattedDate = cd.reunionDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      li.innerHTML = `<strong>${cd.title}</strong><em>Met on ${formattedDate}</em>`;
      historyList.appendChild(li);
    });
  }

  // --- EVENT LISTENERS for Modal ---
  historyBtn.onclick = () => (modal.style.display = 'flex');
  closeBtn.onclick = () => (modal.style.display = 'none');
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Set the total number of images you have in your folder
  const totalImages = 32; 
  // This creates the array ['images/image1.jpg', 'images/image2.jpg', ...] automatically
  const backgroundImages = Array.from({ length: totalImages }, (_, i) => `images/image${i + 1}.jpg`);
  
  const backgroundContainer = document.querySelector('.background');
  const switchInterval = 4000;
  let previousIndex = -1;
  const blurredBg = document.createElement('div');
  blurredBg.style.cssText = `position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -2; background-size: cover; background-position: center; filter: blur(25px); transition: background-image 1s ease-in-out;`;
  backgroundContainer.appendChild(blurredBg);
  const fgImage = document.createElement('img');
  fgImage.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: opacity 1s ease-in-out; z-index: -1; opacity: 0;`;
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
        blurredBg.style.backgroundImage = `url(${newImageSrc})`;
        fgImage.src = newImageSrc;
        fgImage.style.width = tempImg.naturalWidth / 2 + 'px';
        fgImage.style.height = 'auto';
        fgImage.style.opacity = 1;
      }, 500);
    };
  }
  switchBackgroundImage();
  setInterval(switchBackgroundImage, switchInterval);

  // --- KICK EVERYTHING OFF ---
  setupCountdowns();
});