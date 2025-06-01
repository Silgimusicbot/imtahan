const targetDate = new Date('2025-07-13T10:00:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const creditEl = document.getElementById('creditText');

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    clearInterval(timerInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
  seekBar.max = Math.floor(audio.duration);
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seekBar.value = Math.floor(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener('input', () => {
  audio.currentTime = seekBar.value;
});

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.innerHTML = audio.muted
    ? '<i class="fas fa-volume-mute"></i>'
    : '<i class="fas fa-volume-up"></i>';
});

// Animasiya funksiyası
function animateElements() {
  const elements = [
    document.querySelector('.credit'),
    document.querySelector('h1'),
    document.querySelector('.timer'),
    document.querySelector('.music-player')
  ];

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('fade-in');
    }, i * 300);
  });
}

function typeTextEffect(el, text, speed = 60) {
  let display = '';
  let index = 0;
  const interval = setInterval(() => {
    display = text.substring(0, index);
    el.textContent = display + getRandomLetters(text.length - index);
    index++;
    if (index > text.length) {
      clearInterval(interval);
      el.textContent = text;
    }
  }, speed);
}

function getRandomLetters(count) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < count; i++) {
    str += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return str;
}

updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

window.addEventListener('DOMContentLoaded', () => {
  typeTextEffect(creditEl, 'Hüseyn Məmmədov tərəfindən hazırlanıb');
  animateElements();
});
