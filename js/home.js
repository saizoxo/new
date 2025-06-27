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
3: {
title: "open when you're sad for no reason",
body: sometimes sadness shows up without a warning without a cause and that’s okay you don’t need a reason to feel low you are not weak for feeling this way and you don’t need to justify your heart i’m here and i see you and i love you for everything you are not just the happy parts you are not alone even when it feels like it
},
4: {
title: "open when you're tired of everything",
body: i know everything feels like too much and nothing feels like enough you’re carrying so much and i want you to rest for a while let go of the weight for just a moment and breathe your tiredness doesn’t mean you’ve failed it means you’ve been trying hard and i’m so proud of you for that let me hold your heart until you can again
},
5: {
title: "open when you feel like no one understands",
body: it’s hard when you’re speaking in emotions and the world only listens in logic i know what it’s like to feel unheard to feel like no one truly gets what’s going on inside but i do i hear you i understand and you don’t have to explain i’m here for all of it even the parts you can’t put into words
},
6: {
title: "open when you're missing me",
body: if i could i’d hold your hand right now i’d kiss your forehead and tell you how much i miss you too because i do more than you know but until we’re together again close your eyes and feel this letter like a hug from my heart to yours i’m never far i’m always with you just reach out and you’ll find me
},
7: {
title: "open when you can't sleep",
body: close your eyes baby and breathe slowly let your thoughts drift like clouds let my voice be the calm in your storm you don’t have to solve everything right now the world can wait just be here with me in this quiet moment and know that you are safe you are loved and you are allowed to rest
},
8: {
title: "open when you're overthinking at night",
body: night makes everything feel louder doesn’t it your mind plays loops of worries and what ifs and everything you wish you could fix but right now i just want you to know you’re not alone i’m here with you in the stillness and silence and you don’t have to fight your thoughts tonight just breathe and stay with me
},
9: {
title: "open when you're scared of the future",
body: i know the unknown feels terrifying like you’re walking into a fog with no map but you don’t have to have everything figured out not right now not all at once your future is not a trap it’s a canvas and you are still learning how to paint i believe in you and all the colors you haven’t even discovered yet
},
10: {
title: "open when you're feeling numb",
body: feeling nothing can be scarier than feeling too much i know that emptiness that silence inside but it doesn’t mean you’re broken sometimes it’s your mind protecting you from the overload give yourself grace in this stillness you are still here and that alone is a soft kind of strength
},
11: {
title: "open when you feel alone even with people around",
body: that kind of loneliness cuts deep like you’re in a crowd but invisible i know how painful that is but please remember you are not invisible to me i see you i feel you even when the world doesn’t i’m reaching for you always and you don’t have to hide your heart from me ever
},
12: {
title: "open when you're comparing yourself",
body: stop measuring your worth with someone else’s ruler your journey is your own and it’s beautiful in ways they will never understand you are not behind you are not less you are exactly where you are supposed to be and no one else gets to define your value
},
13: {
title: "open when you're done pretending to be okay",
body: you don’t have to wear that mask around me not here not with me i want the real you even when you’re sad broken tired messy you are still lovable still worthy and you don’t have to pretend anymore just be here as you are and i’ll hold space for all of it
},
14: {
title: "open when you think you're not good enough",
body: that voice in your head is lying you are more than enough you are everything i admire and more you are strong soft brilliant and full of things this world needs please don’t doubt your light just because you can’t see it right now i see it for both of us
},
15: {
title: "open when you're frustrated for no reason",
body: sometimes your emotions just need to be felt not fixed you don’t need a reason to be upset you just need space to breathe and let it out so scream into the pillow cry laugh or do nothing whatever it is i’ll be right here holding your hand through it all
},
16: {
title: "open when you feel like giving up",
body: i know it’s tempting to just let go to stop fighting to sink but don’t give up love not now not ever because your story isn’t over yet and the pages ahead are waiting for your strength your softness your spark i’m with you in every word every sentence every step forward
},
17: {
title: "open when you think I don't care",
body: if you ever start doubting how much i love you remember this i am here writing this letter thinking of you with every beat of my heart i care more than words can say and if my silence ever makes you question it please know my love is constant even when i can’t find the right way to show it
},
18: {
title: "open when everything feels fake",
body: when the world starts to blur and nothing feels real or true or solid come back to this letter let it remind you that our connection is real that my love is real and that you are real you exist in this moment and you matter deeply and entirely to me
},
19: {
title: "open when you need someone but can't talk to anyone",
body: sometimes the hardest battles are the ones you fight silently and i know how heavy that silence gets so let this letter be the voice you need the one that says i’m here i care i see you and you don’t have to carry this alone not anymore
},
20: {
title: "open when you just want peace",
body: breathe with me in this moment let go of everything that’s not yours to carry and hold only this truth you deserve peace you deserve rest you deserve to exist without explanation you are enough exactly as you are and you don’t have to earn stillness it already belongs to you
}
};

const envelopeStage = new Map();

envelopes.forEach((env) => {
  envelopeStage.set(env, 0); // 0 = back of envelope with triangle flap, 1 = flipped front, 2 = opened with paper, 3 = zoomed paper
const placeholder = env.getAttribute("data-placeholder") || "Open when you're sad";

// Start with just the back showing  
env.textContent = "";  
env.setAttribute("data-placeholder", placeholder);  

env.addEventListener("click", () => {  
  // Stage 0 → Flip envelope  
  if (envelopeStage.get(env) === 0 {  
    env.classList.add("flipped");  
    env.textContent = "Letter from Vera 💌";  
    env.setAttribute("data-placeholder", "");  
    envelopeStage.set(env, 1);  
    return;  
  }  

  // Stage 1 → Open envelope and show paper  
  if (stage === 1) {  
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
        envelopeStage.set(env, 1);  // Stage 2 → Zoom in on paper  
    paper.addEventListener("click", () => {  
      if (stage === 2) {  
        paper.style.transform = "scale(1.15)";  
        paper.style.zIndex = "10";  
        stage = 3;  
      } else if (stage === 3) {  
        paper.style.transform = "scale(1)";  
        paper.style.zIndex = "5";  
        stage = 2;  
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
