// ===== SECURITY & CORE FUNCTIONALITY =====
const CORRECT_PASSWORD = "iloveyou";
const MAX_ATTEMPTS = 3;
let attemptsLeft = MAX_ATTEMPTS;
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlock-btn");
const errorMsg = document.getElementById("error-msg");
const muteBtn = document.getElementById("mute-btn");
const bgMusic = document.getElementById("bg-music");
const container = document.querySelector(".container");

// === PASSWORD VALIDATION ===
function validatePassword() {
  const entered = passwordInput.value.trim();
  if (entered === CORRECT_PASSWORD) {
    errorMsg.textContent = "";
    fadeOut(() => {
      window.location.href = "home.html";
    });
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      window.location.href = "404.html";
    } else {
      showError(`Incorrect password. ${attemptsLeft} attempt(s) left.`);
    }
  }
}

// === MUSIC CONTROL ===
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    muteBtn.textContent = "mute";
  } else {
    bgMusic.pause();
    muteBtn.textContent = "unmute";
  }
}

// === ERROR MESSAGES ===
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add("show");
  setTimeout(() => {
    if (!message) errorMsg.classList.remove("show");
  }, 300);
}

// === TOUCH TILT SYSTEM ===
const loginBox = document.querySelector(".login-box");
if (loginBox) {
  // Force enable hardware acceleration
  loginBox.style.transformStyle = "preserve-3d";
  loginBox.style.willChange = "transform";
  loginBox.style.backfaceVisibility = "hidden"; // Prevent flickering

  // Touch Event Logic
  let initialTouch = null;

  loginBox.addEventListener("touchstart", (e) => {
    e.preventDefault();
    initialTouch = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      rect: loginBox.getBoundingClientRect()
    };
    loginBox.style.transition = "transform 0.1s";
    loginBox.style.transform = "scale(1.03)";
  }, { passive: false });

  loginBox.addEventListener("touchmove", (e) => {
    if (!initialTouch) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - initialTouch.x;
    const deltaY = touch.clientY - initialTouch.y;
    const width = initialTouch.rect.width;
    const height = initialTouch.rect.height;
    
    // Calculate tilt angles (15 = max tilt in degrees)
    const rotateY = (deltaX / width) * 15;
    const rotateX = (deltaY / height) * -15;
    
    loginBox.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  }, { passive: false });

  loginBox.addEventListener("touchend", () => {
    loginBox.style.transition = "transform 0.3s ease-out";
    loginBox.style.transform = "rotateX(0) rotateY(0) scale(1)";
    initialTouch = null;
  });
}

// === INITIAL SETUP ===
unlockBtn?.addEventListener("click", validatePassword);
muteBtn?.addEventListener("click", toggleMusic);
window.addEventListener("load", () => {
  try {
    bgMusic.play().catch(() => {});
  } catch (err) {
    console.error("Audio error:", err);
  }
});

function fadeOut(callback) {
  if (!container) return callback();
  container.style.transition = "opacity 1.2s ease";
  container.style.opacity = 0;
  setTimeout(callback, 1200);
}

