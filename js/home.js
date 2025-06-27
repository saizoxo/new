document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  const letterContentMap = {
    1: {
      title: "open when you're overthinking",
      body: i know your mind gets loud and heavy and messy sometimes like a hundred voices pulling you in different directions and i know how exhausting it is to keep pretending everything is okay while your thoughts keep crashing into each other but please stay here with me stay grounded stay breathing you are not a burden you are not broken you are just feeling too much in a world that understands too little and that’s okay i’m not going anywhere i’m staying right here and i’m holding you through all of it and i believe in your calm i believe in your light even if right now all you feel is the dark
    },
    2: {
      title: "open when you're feeling angry",
      body: i know it feels like everything is pushing your limits and your chest is burning and your head is heavy and you want to explode or disappear or cry and scream at the same time but breathe with me okay stay with me because your anger doesn’t make you bad your emotions don’t make you wrong you’re just overwhelmed and that’s not your fault you are still loved you are still understood even when you don’t know how to explain the fire inside
    },
    // ... up to 20 (unchanged)
  };

  const envelopeStage = new Map();

  envelopes.forEach((env) => {
    envelopeStage.set(env, 0); // Initialize stage
    const placeholder = env.getAttribute("data-placeholder") || "Open when you're sad";

    env.textContent = "";
    env.setAttribute("data-placeholder", placeholder);

    env.addEventListener("click", () => {
      const currentStage = envelopeStage.get(env);

      // Stage 0 → Flip envelope
      if (currentStage === 0) {
        env.classList.add("flipped");
        env.textContent = "Letter from Vera 💌";
        env.setAttribute("data-placeholder", "");
        envelopeStage.set(env, 1);
        return;
      }

      // Stage 1 → Open envelope and show paper
      if (currentStage === 1) {
        env.classList.add("opened");
        env.textContent = "";

        const paper = document.createElement("div");
        paper.className = "paper";
        const dataId = parseInt(env.getAttribute("data-id"));
        const content = letterContentMap[dataId];

        paper.innerHTML = `
          <p>${content?.title || "a letter for you"}</p>
          <p>${content?.body || "this is just a little piece of my heart for you"}</p>
        `;

        env.parentNode.insertBefore(paper, env.nextSibling);
        setTimeout(() => paper.classList.add("show"), 100);
        envelopeStage.set(env, 2);

        // Stage 2 → Zoom in on paper
        paper.addEventListener("click", () => {
          const currentStageInner = envelopeStage.get(env);
          if (currentStageInner === 2) {
            paper.style.transform = "scale(1.15)";
            paper.style.zIndex = "10";
            envelopeStage.set(env, 3);
          } else if (currentStageInner === 3) {
            paper.style.transform = "scale(1)";
            paper.style.zIndex = "5";
            envelopeStage.set(env, 2);
          }
        });

        return;
      }
    });
  });

  // 🎵 Mute / Unmute Toggle
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
