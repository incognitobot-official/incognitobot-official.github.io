const beginButton = document.getElementById("beginButton");
const fullscreenToggle = document.getElementById("fullscreenToggle");
const hardModeToggle = document.getElementById("hardModeToggle");
const container = document.querySelector(".container");
const gameArea = document.getElementById("gameArea");
const timerDiv = document.getElementById("timer");
const timeSpan = document.getElementById("time");
const hardModeLabel = document.getElementById("hardModeLabel");
const classicButton = document.getElementById("classicButton");

let timerInterval;
let startTime;
let hardMode = false;
let redButton;
let teleportingEnabled = true;
let buttonClickedFlag = false;
let hardModeInterval;
let nothingHappenedFlag = false;
let isFullscreen = false;

// Create the red button dynamically
function createRedButton() {
  redButton = document.createElement("button");
  redButton.id = "redButton";
  redButton.textContent = "DON'T PRESS!";
  redButton.addEventListener("click", buttonClicked);
  redButton.addEventListener("mouseover", buttonHovered);
  return redButton;
}

// Create the restart button dynamically
function createRestartButton() {
  const restartButton = document.createElement("button");
  restartButton.id = "restartButton";
  restartButton.textContent = "Restart";
  restartButton.addEventListener("click", restartGame);
  return restartButton;
}

// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    timeSpan.textContent = elapsedTime;
  }, 10);
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Randomly teleport the button, avoiding the cursor's position
function randomTeleport(button) {
  const buttonRect = button.getBoundingClientRect();
  let x, y;

  do {
    x = Math.random() * (window.innerWidth - button.offsetWidth);
    y = Math.random() * (window.innerHeight - button.offsetHeight);
  } while (
    Math.abs(x - (window.innerWidth / 2)) < 100 || // Avoid teleporting near the center (cursor)
    Math.abs(y - (window.innerHeight / 2)) < 100
  );

  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

// Handle button hover with teleportation
function buttonHovered() {
  if (!buttonClickedFlag && teleportingEnabled) {
    randomTeleport(this);
  }
}

// Handle the red button click
function buttonClicked() {
  if (buttonClickedFlag) return; // Prevent further clicks after the first click
  buttonClickedFlag = true;
  stopTimer();
  this.classList.add("grey");
  teleportingEnabled = false; // Disable teleporting after the button is clicked

  // Stop the hard mode interval (to stop the button from moving)
  if (hardModeInterval) {
    clearInterval(hardModeInterval);
  }

  // Random events
  const actions = [
    () => {
      if (!nothingHappenedFlag) {
        displayMessage("Nothing happened...");
        nothingHappenedFlag = true;
      } else {
        displayMessage("You clicked me again!");
      }
    },
    () => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank"),
    () => clearGameElements(),
    () => scaleButtonSmoothly(),
    () => displayMessage("How dare you!"),
    () => displayMessage("STOP TOUCHING ME YOU CREEP"),
    () => displayMessage("Why would you do that...?"),
    () => displayMessage("Ouch!"),
    confettiBlast, // Using confetti blast
    blueScreenOfDeath, // Blue Screen of Death prank
  ];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  randomAction();

  // Add restart button
  const restartButton = createRestartButton();
  document.body.appendChild(restartButton);
}

// Display message in center of the screen
function displayMessage(message) {
  const messageElement = document.createElement("h1");
  messageElement.textContent = message;
  messageElement.style.position = "absolute";
  messageElement.style.top = "50%";
  messageElement.style.left = "50%";
  messageElement.style.transform = "translate(-50%, -50%)";
  messageElement.style.color = "#ff4500";
  document.body.appendChild(messageElement);
}

// Smoothly scale the button and eventually fill the entire screen
function scaleButtonSmoothly() {
  redButton.style.transition = "transform 5s ease-in-out"; // Smooth transition
  redButton.style.transform = "scale(20)"; // Button will scale to fill the screen
}

// Confetti blast using the confetti.js library
function confettiBlast() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Blue Screen of Death prank
function blueScreenOfDeath() {
  const screen = document.createElement("div");
  screen.style.position = "fixed";
  screen.style.top = "0";
  screen.style.left = "0";
  screen.style.width = "100vw";
  screen.style.height = "100vh";
  screen.style.background = "url('blue-screen-of-death.jpg') no-repeat center center";
  screen.style.backgroundSize = "cover";
  screen.style.zIndex = "9999"; // Ensure it's on top of everything else
  screen.style.display = "block";
  
  // Hide all other elements
  document.body.style.overflow = "hidden";
  document.body.appendChild(screen);
}

// Clear all game elements
function clearGameElements() {
  container.style.display = "none";
  gameArea.style.display = "none";
  timerDiv.style.display = "none";
}

// Toggle hard mode
function toggleHardMode() {
  hardMode = !hardMode;
  if (hardMode) {
    document.body.classList.add("hard-mode");
    hardModeLabel.style.display = "block";
    teleportingEnabled = true; // Keep teleporting enabled in hard mode
    // Continuously move the button away from the cursor in hard mode every 0.25s
    hardModeInterval = setInterval(() => {
      randomTeleport(redButton);
    }, 250); // Move every 0.25 seconds
  } else {
    document.body.classList.remove("hard-mode");
    hardModeLabel.style.display = "none";
    clearInterval(hardModeInterval); // Stop the button movement when hard mode is off
  }
}

// Start the game when the begin button is clicked
beginButton.addEventListener("click", () => {
  // Remove the main menu elements
  container.style.display = "none";
  gameArea.style.display = "block";
  timerDiv.style.display = "block";
  classicButton.classList.add("hidden");
  hideAchievementsButton;

  startTimer();
  gameArea.appendChild(createRedButton());
  beginButton.disabled = true; // Disable the begin button after it's clicked
});

// Toggle hard mode when the toggle button is clicked
hardModeToggle.addEventListener("click", toggleHardMode);

const achievementsButton = document.getElementById("achievementsButton");
const achievementsContainer = document.getElementById("achievementsContainer");
const backButton = document.getElementById("backButton");

achievementsButton.addEventListener("click", () => {
  achievementsContainer.style.display = "block";
  achievementsContainer.classList.remove("hidden");
  classicButton.classList.add("hidden");
  container.style.display = "none";
  gameArea.style.display = "none";
  timerDiv.style.display = "none";
});

backButton.addEventListener("click", restartGame);

// Hide the Achievements Button During the Game
function hideAchievementsButton() {
  achievementsButton.style.display = "none";
}

// Show the Achievements Button After Reset
function showAchievementsButton() {
  achievementsButton.style.display = "block";
}

// Show Achievements Button on Restart
function restartGame() {
  location.reload();
  showAchievementsButton();
}