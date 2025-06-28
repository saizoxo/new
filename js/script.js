// ===== CONFIGURATION =====
const CORRECT_PASSWORD = "iloveyou";
const MAX_ATTEMPTS = 3;

// ===== STATE VARIABLES =====
let attemptsLeft = MAX_ATTEMPTS;

// ===== DOM ELEMENTS =====
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlock-btn");
const errorMsg = document.getElementById("error-msg");
const muteBtn = document.getElementById("mute-btn");
const bgMusic = document.getElementById("bg-music");
const container = document.querySelector(".container");
const loginBox = document.querySelector(".login-box");

// ====== EVENT BINDING ======
// Event listeners for the unlock button and global music toggle
unlockBtn?.addEventListener("click", validatePassword);
muteBtn?.addEventListener("click", toggleMusic);

// Handle autoplay of music on window load
window.addEventListener("load", handleAutoplay);

// Event listeners for the login box tilt effect (mouse and touch)
if (loginBox) {
  // Mouse events
  loginBox.addEventListener("mousemove", handleTilt);
  loginBox.addEventListener("mouseleave", resetTilt);
  loginBox.addEventListener("mouseenter", applyScale);

  // Touch events
  loginBox.addEventListener("touchmove", handleTiltTouch);
  loginBox.addEventListener("touchend", resetTilt);
  loginBox.addEventListener("touchstart", applyScale);

  // Console log to confirm listeners are attached (for debugging)
  console.log("Login box event listeners attached.");
} else {
  console.error("Login box element not found!");
}


// ====== FUNCTIONS ======

/**
 * Validates the entered password.
 * If correct, proceeds to the home page.
 * If incorrect, shows an error and tracks attempts.
 */
function validatePassword() {
  const entered = passwordInput.value.trim();
  if (entered === CORRECT_PASSWORD) {
    onLoginSuccess();
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      // Redirect to 404 page if attempts run out
      window.location.href = "404.html";
    } else {
      // Show error message with remaining attempts
      showError(`Incorrect password. ${attemptsLeft} attempt(s) left.`);
    }
  }
}

/**
 * Handles actions upon successful login.
 * Fades out the current container and redirects to home.html.
 */
function onLoginSuccess() {
  showError(""); // Clear any existing error messages
  fadeOut(() => {
    window.location.href = "home.html"; // Redirect after fade out
  });
}

/**
 * Fades out the main container element.
 * @param {Function} callback - Function to execute after fade out completes.
 */
function fadeOut(callback) {
  if (!container) {
    console.warn("Container element not found for fadeOut.");
    return callback(); // If container not found, just execute callback
  }
  container.style.transition = "opacity 1.2s ease"; // Set transition for smooth fade
  container.style.opacity = 0; // Start fade out
  setTimeout(callback, 1200); // Execute callback after transition duration
}

/**
 * Toggles the background music play/pause state and updates the mute button text.
 */
function toggleMusic() {
  if (!bgMusic) {
    console.warn("Background music element not found.");
    return;
  }
  if (bgMusic.paused) {
    bgMusic.play().catch(error => {
      console.warn("Autoplay blocked or audio play failed:", error);
    });
    muteBtn.textContent = "mute";
  } else {
    bgMusic.pause();
    muteBtn.textContent = "unmute";
  }
}

/**
 * Displays an error message with a fade-in/fade-out animation.
 * @param {string} message - The message to display.
 */
function showError(message) {
  if (!errorMsg) {
    console.warn("Error message element not found.");
    return;
  }
  errorMsg.textContent = message;
  errorMsg.classList.add("show"); // Add 'show' class to make it visible
  // Remove 'show' class after a short delay if message is empty
  setTimeout(() => {
    if (!message) errorMsg.classList.remove("show");
  }, 300);
}

/**
 * Attempts to autoplay background music on page load.
 * Catches and logs any autoplay errors.
 */
function handleAutoplay() {
  if (!bgMusic) {
    console.warn("Background music element not found for autoplay.");
    return;
  }
  try {
    bgMusic.play().catch(error => {
      console.warn("Autoplay blocked or audio play failed:", error);
    });
  } catch (err) {
    console.error("Audio failed to load:", err);
  }
}

/**
 * Computes the rotation angles for the tilt effect based on cursor/touch position.
 * @param {number} x - X coordinate relative to the element.
 * @param {number} y - Y coordinate relative to the element.
 * @param {number} width - Width of the element.
 * @param {number} height - Height of the element.
 * @returns {{rotateX: number, rotateY: number}} - Object containing X and Y rotation angles.
 */
function computeTilt(x, y, width, height) {
  // Calculate rotation based on mouse/touch position relative to the element's center
  // The values -20 and 20 control the intensity of the tilt
  const rotateX = ((y / height) - 0.5) * -20; // Invert X-axis rotation for natural feel
  const rotateY = ((x / width) - 0.5) * 20;
  return { rotateX, rotateY };
}

/**
 * Handles the tilt effect for mouse movement over the login box.
 * @param {MouseEvent} e - The mouse event object.
 */
function handleTilt(e) {
  if (!loginBox) return;

  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = e.clientX - left; // Mouse X relative to element
  const y = e.clientY - top;   // Mouse Y relative to element
  const { rotateX, rotateY } = computeTilt(x, y, width, height);

  // Apply the transform. Scale is applied here to ensure it's always present during tilt.
  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
}

/**
 * Handles the tilt effect for touch movement over the login box.
 * @param {TouchEvent} e - The touch event object.
 */
function handleTiltTouch(e) {
  // Crucial for preventing default scroll/zoom behavior on touch devices
  e.preventDefault();
  console.log("handleTiltTouch fired!"); // Debugging log

  if (!loginBox || !e.touches[0]) {
    console.warn("handleTiltTouch: loginBox or touch point not found.");
    return;
  }

  const touch = e.touches[0];
  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = touch.clientX - left; // Touch X relative to element
  const y = touch.clientY - top;   // Touch Y relative to element
  const { rotateX, rotateY } = computeTilt(x, y, width, height);

  // Apply the transform. Scale is applied here to ensure it's always present during tilt.
  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  console.log(`Touch Transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`); // Detailed debug log
}

/**
 * Applies an initial scale to the login box on mouse enter or touch start.
 */
function applyScale() {
  if (loginBox) {
    loginBox.style.transform = `scale(1.03)`;
    console.log("applyScale fired!"); // Debugging log
  }
}

/**
 * Resets the tilt and scale of the login box on mouse leave or touch end.
 */
function resetTilt() {
  if (loginBox) {
    // Reset the transform to its original state (no rotation, no scale)
    loginBox.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    console.log("resetTilt fired!"); // Debugging log
  }
}
