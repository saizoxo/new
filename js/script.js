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
unlockBtn?.addEventListener("click", validatePassword);
muteBtn?.addEventListener("click", toggleMusic);
window.addEventListener("load", handleAutoplay);

if (loginBox) {
  loginBox.addEventListener("mousemove", handleTilt);
  loginBox.addEventListener("mouseleave", resetTilt);
  loginBox.addEventListener("mouseenter", applyScale); // Call applyScale on mouseenter

  loginBox.addEventListener("touchmove", handleTiltTouch);
  loginBox.addEventListener("touchend", resetTilt);
  loginBox.addEventListener("touchstart", applyScale); // Call applyScale on touchstart
}

// ====== FUNCTIONS ======

// 🔐 Validate Password
function validatePassword() {
  const entered = passwordInput.value.trim();
  if (entered === CORRECT_PASSWORD) {
    onLoginSuccess();
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      window.location.href = "404.html";
    } else {
      showError(`Incorrect password. ${attemptsLeft} attempt(s) left.`);
    }
  }
}

// ✅ On Login Success
function onLoginSuccess() {
  showError("");
  fadeOut(() => {
    window.location.href = "home.html";
  });
}

// 🌀 Fade Out Only the Login UI (not particles)
function fadeOut(callback) {
  if (!container) return callback();
  container.style.transition = "opacity 1.2s ease";
  container.style.opacity = 0;
  setTimeout(callback, 1200);
}

// 🎵 Toggle Music
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    muteBtn.textContent = "mute";
  } else {
    bgMusic.pause();
    muteBtn.textContent = "unmute";
  }
}

// 💬 Show Error Message with fade animation
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add("show");
  setTimeout(() => {
    if (!message) errorMsg.classList.remove("show");
  }, 300);
}

// 🎧 Handle Autoplay on Load
function handleAutoplay() {
  try {
    bgMusic.play().catch(() => {
      console.warn("Autoplay blocked.");
    });
  } catch (err) {
    console.error("Audio failed to load:", err);
  }
}

// 🎯 Tilt Logic
function computeTilt(x, y, width, height) {
  // Calculate rotation based on mouse/touch position relative to the element's center
  // The values -20 and 20 control the intensity of the tilt
  const rotateX = ((y / height) - 0.5) * -20; // Invert X-axis rotation for natural feel
  const rotateY = ((x / width) - 0.5) * 20;
  return { rotateX, rotateY };
}

// 🧠 Tilt Effect (Mouse)
function handleTilt(e) {
  // Ensure loginBox exists before trying to get its properties
  if (!loginBox) return;

  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = e.clientX - left; // Mouse X relative to element
  const y = e.clientY - top;   // Mouse Y relative to element
  const { rotateX, rotateY } = computeTilt(x, y, width, height);

  // Apply the transform. Scale is applied here to ensure it's always present during tilt.
  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
}

// 🧠 Tilt Effect (Touch)
function handleTiltTouch(e) {
  // Prevent scrolling while touching and moving on the element
  e.preventDefault();

  // Ensure loginBox exists and there's at least one touch point
  if (!loginBox || !e.touches[0]) return;

  const touch = e.touches[0];
  const { width, height, left, top } = loginBox.getBoundingClientRect();
  const x = touch.clientX - left; // Touch X relative to element
  const y = touch.clientY - top;   // Touch Y relative to element
  const { rotateX, rotateY } = computeTilt(x, y, width, height);

  // Apply the transform. Scale is applied here to ensure it's always present during tilt.
  loginBox.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
}

// ⚡ Apply Initial Scale on mouseenter/touchstart
function applyScale() {
  if (loginBox) {
    // Apply a slight scale when the mouse enters or touch starts
    // This makes the element pop out slightly before tilting
    loginBox.style.transform = `scale(1.03)`;
  }
}

// 🔄 Reset Tilt and Scale on mouseleave/touchend
function resetTilt() {
  if (loginBox) {
    // Reset the transform to its original state (no rotation, no scale)
    loginBox.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  }
}
