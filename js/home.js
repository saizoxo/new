document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  envelopes.forEach((env) => {
    const paper = env.querySelector(".paper");
    const placeholder = env.getAttribute("data-placeholder") || "open me";
    env.setAttribute("data-placeholder-original", placeholder);
    env.dataset.stage = "0";

    env.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close all others first
      envelopes.forEach((other) => {
        if (other !== env) {
          other.classList.remove("open");
          const otherPaper = other.querySelector(".paper");
          otherPaper?.classList.remove("show", "fullscreen");
          otherPaper?.style.setProperty("z-index", "5");
          other.setAttribute("data-placeholder", other.getAttribute("data-placeholder-original"));
          other.dataset.stage = "0";
        }
      });

      // Current stage
      let stage = parseInt(env.dataset.stage || "0");

      switch (stage) {
        case 0:
          // Step 1: Open flap
          env.classList.add("open");
          env.setAttribute("data-placeholder", "");
          env.dataset.stage = "1";
          break;

        case 1:
          // Step 2: Show paper
          paper.classList.add("show");
          env.dataset.stage = "2";
          break;

        case 2:
          // Step 3: Fullscreen
          paper.classList.add("fullscreen");
          env.dataset.stage = "3";
          break;

        case 3:
          // Reset all
          paper.classList.remove("fullscreen", "show");
          env.classList.remove("open");
          env.setAttribute("data-placeholder", env.getAttribute("data-placeholder-original"));
          env.dataset.stage = "0";
          break;
      }
    });
  });

  // Mute / Unmute toggle
  muteBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      muteBtn.textContent = "mute";
    } else {
      bgMusic.pause();
      muteBtn.textContent = "unmute";
    }
  });
});
