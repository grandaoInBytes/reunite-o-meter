# Reunite-o-meter

A beautiful and animated countdown page for a special event, featuring a live timer, a progress bar, and a mesmerizing floating image background.
-----

## ✨ Features

  * **Live Countdown:** Counts down in days, hours, minutes, and seconds.
  * **Progress Bar:** Visually shows the percentage of time passed.
  * **Dynamic Background:** JavaScript creates a continuous, non-repetitive animation of floating images.
  * **Responsive Design:** Looks great on desktop and mobile devices.
  * **Easy to Customize:** No frameworks, just vanilla HTML, CSS, and JavaScript.

-----

## 🚀 How to Customize

Personalizing this page is easy. Follow these steps:

### 1\. Set Your Dates

  * In `script.js`, change `reunionDate` to your event's end date and `startDate` to its start date.
    ```javascript
    // Set your target and start dates
    const reunionDate = new Date('July 31, 2025 16:00:00').getTime();
    const startDate = new Date('May 13, 2025 16:00:00').getTime();
    ```

### 2\. Change the Images

1.  Add your own photos to the `images/` folder.
2.  In `script.js`, update the `backgroundImages` array with your new file paths.
    ```javascript
    const backgroundImages = [
        'images/my-photo1.jpg',
        'images/my-photo2.png',
        // ... add all your image paths here
    ];
    ```

### 3\. Edit the Text

  * Change the main title directly in `index.html`.
    ```html
    <h1>💘 Vacanza in Italia 💘</h1>
    ```

### 4\. (Optional) Tweak the Colors

  * All colors are defined as variables in `style.css` under the `:root` section for easy editing.
    ```css
    :root {
      --primary-color: #9370DB; /* MediumPurple */
      /* ... change any color you want here ... */
    }
    ```

-----

## 💻 Running Locally

1.  Clone this repository: `git clone https://github.com/your-github-username/your-repo-name.git`
2.  Open the `index.html` file in your browser.
