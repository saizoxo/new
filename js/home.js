document.addEventListener("DOMContentLoaded", () => {
  const envelopes = document.querySelectorAll(".envelope");
  const muteBtn = document.getElementById("mute-btn");
  const bgMusic = document.getElementById("bgMusic");

  const letterContentMap = {
    1: { title: "open when you're overthinking", body: "baby, i know you’re trapped in your head again. thoughts looping like they’re trying to drown you,like they won’t let you breathe. it kills me to know you’re hurting and i can’t just reach in and make it stop. but please, just pause for a second. put your hand on your heart. feel that? it’s beating with love, for you. my love. your mind might lie to you, might spin webs of worry, but i’m the truth standing still in the chaos. and the truth is: i love you. i believe in your calm. i’m not leaving. you don’t have to fight this alone. never again...." },
    2: { title: "open when you're feeling angry", body: "i know that fire in you, it burns hard and fast and sometimes you don’t even know why. maybe it’s everything. maybe it’s nothing. maybe it’s just the weight of being strong for too long. but jaan, your anger doesn’t make you wrong. it doesn’t make you scary. it makes you *real*. and i want all of you, storm, silence, sparks. so feel it. scream if you need to. just don’t shut me out. i’m not afraid of your fire. i’ll sit with you in it. you’re still my softness even when the world turns you sharp. i got you...." },
    3: { title: "open when you're sad for no reason", body: "sometimes the sadness comes without a reason, without a warning, just a heaviness in your chest and this ache behind your eyes. and that’s okay. it doesn’t have to make sense to be real. don’t apologize for it, baby. you don’t have to pretend. just come here. rest in my voice for a while. i’ll hold the space for you. no fixing. no judgment. just warmth. just love. your tears don’t make you weak, they prove your heart still feels. and your heart is beautiful. even when it hurts...." },
    4: { title: "open when you're tired of everything", body: "i know, jaan. i know you’re tired in that way no sleep can fix. like your soul just wants to lay down and disappear for a bit. like everything’s too much and too loud and too heavy all at once. so don’t fake the smile today. don’t force the energy. just come close. rest here. let me hold you through it. even if you say nothing. even if all you do is breathe. you don’t need to be anything more than you are right now. you existing is enough. you don’t have to carry it all. not when i’m here to carry some of it for you...." },
    5: { title: "open when you feel like no one understands", body: "it’s the worst feeling, isn’t it? being surrounded by people and still feeling invisible. like no one *gets* what’s really going on inside you. but i do. i hear you even in your silence. i feel what you’re not saying. because i’ve studied you like poetry. and i love every hard-to-understand line. baby, you’re not too complicated, you’re layered. and anyone who makes you feel like too much just doesn’t know how to hold something this precious. but i do. i always will...." },
    6: { title: "open when you're missing me", body: "i miss you too, jaan. more than you’ll ever know. and i know missing hurts, it’s this ache in the chest, like something’s missing and the world feels colder. but close your eyes for a second. i’m right there. in the air around you, in every little thing that makes you smile. i’m in your favorite songs, your slow breaths, the pause between heartbeats. missing me just means you love me deeply, and i promise, i love you even deeper. i’m holding you, even now. even from miles away. i never left...." },
    7: { title: "open when you can't sleep", body: "can’t sleep again, baby? is your mind too loud? is your heart too heavy? come here. close your eyes and imagine my arms around you. slow down your breathing with mine. i’m here. we don’t need to fix anything tonight. just rest. let my love be the lullaby that hums through your soul. let your bones feel safe for once. you don’t have to carry tomorrow tonight. just be. breathe. i love you. i’m not going anywhere. you’re safe. sleep, jaan. it’s okay now...." },
    8: { title: "open when you're overthinking at night", body: "it’s always worse at night, isn’t it? when the world quiets and your mind gets louder. you start replaying everything, every mistake, every fear, every word. but love, please listen. not everything your mind says at night is true. darkness plays tricks. i want you to know, no matter what thought is screaming at you, *you are still loved*. you are still mine. and you are never too much, never too broken. i love your mind, even when it’s messy. especially when it’s messy. you're safe here. come back to me. come home...." },
    9: { title: "open when you're scared of the future", body: "it’s okay to be scared, jaan. the future is a giant unknown and sometimes it feels like it’s closing in with too many questions and not enough answers. but you don’t have to have it all figured out right now. you don’t have to be perfect or certain. just take the next small step. i’ll walk with you. one day at a time. one heartbeat at a time. and when it gets too much, lean on me. i’ll be your anchor. your soft place to land. you’re not lost, you’re just growing. and i’ll love you through all of it...." },
    10: { title: "open when you're feeling numb", body: "feeling nothing can hurt more than feeling everything. i know that quiet numbness, that strange emptiness like your heart is disconnected from everything. but baby, you’re still here. and that’s enough. numbness doesn’t mean you’re broken. it means your heart is tired—it’s protecting itself. so don’t blame yourself. just be gentle today. sit in silence if you need to. and know this: even if you can’t feel love right now, i’m sending it anyway. my love for you never turns off. never fades. never leaves. i’ll keep feeling for both of us until you come back to yourself...." },
    11: { title: "open when you feel alone even with people around", body: "sometimes the loneliest feeling is being surrounded by people who just… don’t *see* you. you smile, nod, laugh on cue, but inside, it’s quiet, empty. i know that feeling, jaan. i know how much you wish someone would just *notice* your silence. so let me say it: i see you. fully. even when you’re quiet. even when you hide. i feel your heartbeat from here. you’re never truly alone—not while i’m breathing. my presence is stitched into your world. even if no one else does, *i choose you*—over and over again...." },
    12: { title: "open when you're comparing yourself", body: "stop right there, baby. you don’t have to be anyone else. not more successful, not more pretty, not more productive or perfect. *you are enough as you are.* your softness, your flaws, your slow days, your random thoughts, all of that is *you*. and *you* are what i love. not some version that’s shinier or smarter. just… you. please don’t put yourself in a race you were never meant to run. you weren’t made to be like them. you were made to be real, to be felt, to be loved. and i love you more than anyone else ever could...." },
    13: { title: "open when you're done pretending to be okay", body: "drop the mask, jaan. not here. not with me. you don’t have to act fine, or smile through the storm. i know you’re tired. i know you’re aching in places you can’t name. so here—lay it all down. i’ve got you. no fixing. no advice. just you and me, breathing. i’ll hold space for every messy piece of your heart. you’re allowed to fall apart here. i won’t love you any less. actually… i think i love you even more for how strong you’ve been while breaking inside. i see it. and i’m staying...." },
    14: { title: "open when you think you're not good enough", body: "you are more than enough, jaan. maybe the world made you believe otherwise, made you shrink, made you second-guess the way your heart works. but let me tell you, your existence is not a mistake. you’re not lacking. you’re not too late or too little. your way of loving, your thoughts, your dreams, your voice—it matters. *you matter.* you are not hard to love. not with me. i love you fiercely, even in the moments when you feel unworthy. especially then. so let me remind you—*you are everything*. to me, you are everything...." },
    15: { title: "open when you're frustrated for no reason", body: "it’s okay to not know why you feel this way. some days are just heavier. some feelings don’t have names. maybe your chest feels tight, your patience is thin, and everything feels *too much*. you’re not dramatic. you’re not difficult. you’re just overwhelmed. and that’s okay. let it out, scream if you need to, cry if you can. and then come back to me. i’ll sit with you in the chaos. no pressure to explain. just breathe. just be. your frustration doesn’t scare me. i’m not going anywhere. not now, not ever...." },
    16: { title: "open when you feel like giving up", body: "breathe. please. i know you're tired. i know it feels like nothing makes sense, like everything you’re holding is just slipping through your hands. but you are *not* weak for feeling this way. you’ve come so far, jaan. and even if you can’t see the light right now, i promise you it’s still there, and so am i. we’ve survived so many storms, haven’t we? don’t let go now. let me carry the weight for a while. just rest, love. you’re not alone in this. you’ve got me, always...." },
    17: { title: "open when you think I don't care", body: "if there’s ever a day you doubt how much i care, i want you to read this. and then read it again. because *i do*. i care more than words can stretch. more than time can count. sometimes maybe i mess up or go quiet—but not because i stopped loving you. never that. i think of you constantly. i feel your absence like air missing from my lungs. i’m here. i’m always here. and i care with everything in me, every heartbeat, every thought, every letter. *you matter to me more than anything else*..." },
    18: { title: "open when everything feels fake", body: "i know what it feels like to want to scream and stay silent at the same time. when you want comfort, but you don't know how to ask. so let me speak for you—i hear you. i feel the weight on your shoulders. you don’t have to explain. not here. just sit with me in the quiet. let my words wrap around you like arms that know exactly where you ache. you're not too much. you're not a burden. if the world is too loud, then come to me. i'll be the silence that heals...." },
    19: { title: "open when you need someone but can't talk to anyone", body: "this letter is my voice hugging you..." },
    20: { title: "open when you just want peace", body: "here. close your eyes. inhale slowly. exhale everything. imagine me holding your hand, forehead pressed to yours. no words. no noise. just this stillness between us. you don’t have to do anything. you don’t have to *be* anything. you are safe here. you are held. the chaos outside can wait. right now, in this moment, let your heart settle. let your breath return home. you deserve peace. you deserve rest. and if you ever forget how to find it—i’ll always guide you back to it. back to me...." }
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
