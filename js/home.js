document.querySelectorAll('.envelope').forEach((env) => {
  env.addEventListener('click', () => {
    const paper = env.querySelector('.paper');
    paper.classList.toggle('show');
  });

  env.querySelector('.paper').addEventListener('click', (e) => {
    e.stopPropagation();
    const paper = e.currentTarget;
    if (!document.fullscreenElement) {
      paper.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});

const muteBtn = document.getElementById("mute-btn");
muteBtn.onclick = () => {
  const music = document.getElementById("bgMusic");
  music.muted = !music.muted;
  muteBtn.textContent = music.muted ? "unmute" : "mute";
};
