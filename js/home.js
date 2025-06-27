document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  const letterContentMap = {
    1: {
      title: "open when you're overthinking",
      body: `i know your mind gets loud and heavy and messy sometimes like a hundred voices pulling you in different directions and i know how exhausting it is to keep pretending everything is okay while your thoughts keep crashing into each other but please stay here with me stay grounded stay breathing you are not a burden you are not broken you are just feeling too much in a world that understands too little and that’s okay i’m not going anywhere i’m staying right here and i’m holding you through all of it and i believe in your calm i believe in your light even if right now all you feel is the dark`
    },
    2: {
      title: "open when you're feeling angry",
      body: `i know it feels like everything is pushing your limits and your chest is burning and your head is heavy and you want to explode or disappear or cry and scream at the same time but breathe with me okay stay with me because your anger doesn’t make you bad your emotions don’t make you wrong you’re just overwhelmed and that’s not your fault you are still loved you are still understood even when you don’t know how to explain the fire inside`
    },
    // 💌 Add more letters 3–20 below...
  };

  const envelopeStage = new Map();
  let currentlyOpenEnv = null;

  envelopes.forEach((env) => {
    const dataId = parseInt(env.getAttribute("data-id"));
    const content = letterContentMap[dataId];

    if (content && content.title) {
      env.setAttribute("data-placeholder", content.title);
    }

    env.textContent = "";
    envelopeStage.set(env, 0);

    env.addEventListener("click", () => {
      const currentStage = envelopeStage.get(env);

      // 🧹 Close previously open envelope
      if (currentlyOpenEnv && currentlyOpenEnv !== env) {
        const prevPaper = currentlyOpenEnv.parentNode.querySelector(".paper");
        if (prevPaper) prevPaper.remove();

        currentlyOpenEnv.classList.remove("flipped", "opened");
        currentlyOpenEnv.textContent = "";
        const prevId = parseInt(currentlyOpenEnv.getAttribute("data-id"));
        const prevContent = letterContentMap[prevId];
        currentlyOpenEnv.setAttribute("data-placeholder", prevContent?.title || "");
        envelopeStage.set(currentlyOpenEnv, 0);
      }

      // Stage 0 → Flip envelope
      if (currentStage === 0) {
        env.classList.add("flipped");
        env.textContent = "Letter from me 💌";
        env.setAttribute("data-placeholder", "");
        envelopeStage.set(env, 1);
        currentlyOpenEnv = env;
        return;
      }

      // Stage 1 → Open and show paper
      if (currentStage === 1) {
        env.classList.add("opened");
        env.textContent = "";

        const paper = document.createElement("div");
        paper.className = "paper";
        paper.innerHTML = `
          <p>${content?.body || "this is just a little piece of my heart for you"}</p>
        `;
        env.parentNode.insertBefore(paper, env.nextSibling);
        setTimeout(() => paper.classList.add("show"), 100);
        envelopeStage.set(env, 2);
        currentlyOpenEnv = env;

        // Zoom In/Out toggle
        paper.addEventListener("click", () => {
          const stage = envelopeStage.get(env);
          if (stage === 2) {
            paper.style.transform = "scale(1.15)";
            paper.style.zIndex = "10";
            envelopeStage.set(env, 3);
          } else if (stage === 3) {
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
