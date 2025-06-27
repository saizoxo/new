// Mute button toggle
const muteBtn = document.getElementById("mute-btn");
const music = document.getElementById("bgMusic");

muteBtn.onclick = () => {
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "unmute" : "mute";
};

// Handle letter interaction
document.querySelectorAll(".envelope").forEach((envelope) => {
  let hasTab = false;
  let hasPaper = false;
  let isFullscreen = false;

  // Step 1 → Tap envelope to reveal tab
  envelope.addEventListener("click", (e) => {
    if (!hasTab) {
      // Prevent triggering if clicked on tab or paper
      if (e.target.classList.contains("paper-tab") || e.target.closest(".paper")) return;

      // Create tab dynamically
      const tab = document.createElement("div");
      tab.className = "paper-tab step-1";
      tab.textContent = "open letter";
      envelope.appendChild(tab);
      hasTab = true;

      // Step 2 → Click tab to reveal paper
      tab.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent envelope click from re-triggering

        const paper = envelope.querySelector(".paper");
        if (!paper) return;

        paper.classList.add("show", "step-2");
        hasPaper = true;

        // Step 3 → Click paper to toggle fullscreen
        paper.addEventListener("click", () => {
          if (!isFullscreen) {
            paper.requestFullscreen?.() || paper.webkitRequestFullscreen?.();
            isFullscreen = true;
          } else {
            document.exitFullscreen?.() || document.webkitExitFullscreen?.();
            isFullscreen = false;
          }
        });
      });
    }
  });
});
