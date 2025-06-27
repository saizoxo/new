document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  const letterContentMap = {
    1: { title: "open when you're overthinking", body: "i know your mind gets loud..." },
    2: { title: "open when you're feeling angry", body: "i know it feels like everything is pushing..." },
    3: { title: "open when you're sad for no reason", body: "some days just feel heavy and confusing..." },
    4: { title: "open when you're tired of everything", body: "rest is not weakness. pause and breathe..." },
    5: { title: "open when you feel like no one understands", body: "you don’t have to explain everything..." },
    6: { title: "open when you're missing me", body: "i’m still with you, even if you can’t see me..." },
    7: { title: "open when you can't sleep", body: "close your eyes, love. my voice is your lullaby..." },
    8: { title: "open when you're overthinking at night", body: "night makes everything louder, but you’re not alone..." },
    9: { title: "open when you're scared of the future", body: "the future can wait. come back to now..." },
    10: { title: "open when you're feeling numb", body: "even numbness is a feeling. and it too will pass..." },
    11: { title: "open when you feel alone even with people around", body: "i see you. fully. clearly. always..." },
    12: { title: "open when you're comparing yourself", body: "your journey isn’t supposed to match anyone’s..." },
    13: { title: "open when you're done pretending to be okay", body: "you don’t have to fake strength with me..." },
    14: { title: "open when you think you're not good enough", body: "you are. more than you realize..." },
    15: { title: "open when you're frustrated for no reason", body: "it’s okay to not know why. just feel..." },
    16: { title: "open when you feel like giving up", body: "not now. not yet. please, hold on..." },
    17: { title: "open when you think I don't care", body: "i care so deeply it aches..." },
    18: { title: "open when everything feels fake", body: "what’s real is right here. this love..." },
    19: { title: "open when you need someone but can't talk to anyone", body: "this letter is my voice hugging you..." },
    20: { title: "open when you just want peace", body: "shhh. breathe. let me be your stillness..." }
  };

  const envelopeStage = new Map();
  let currentlyOpenEnv = null;

  envelopes.forEach((env) => {
    const dataId = parseInt(env.getAttribute("data-id"));
    const content = letterContentMap[dataId];
    const placeholder = content?.title || "I'll write it";

    env.setAttribute("data-placeholder", placeholder);
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
        currentlyOpenEnv.setAttribute("data-placeholder", prevContent?.title || "I'll write it");
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
          <p>${content?.title || "a letter for you"}</p>
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
