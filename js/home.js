document.addEventListener('DOMContentLoaded', () => {
  const envelopes = document.querySelectorAll('.envelope');
  const music = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('mute-btn');

  envelopes.forEach(envelope => {
    const paper = envelope.querySelector('.paper');
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
      paper.classList.toggle('show');
    });
  });

  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    muteBtn.textContent = music.muted ? 'unmute' : 'mute';
  });
});
