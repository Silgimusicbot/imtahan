// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBP2WHQAtSboDcKDUWqhRx3s_AVAf4YCF4",
  authDomain: "imtahan-taymeri.firebaseapp.com",
  databaseURL: "https://imtahan-taymeri-default-rtdb.firebaseio.com",
  projectId: "imtahan-taymeri",
  storageBucket: "imtahan-taymeri.appspot.com",
  messagingSenderId: "425403681235",
  appId: "1:425403681235:web:0ee4cdc852f6e12ad40726",
  measurementId: "G-RS9450CC6E"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Taymer
const targetDate = new Date('2025-06-01T09:30:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateTimer() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  daysEl.textContent = String(d).padStart(2, '0');
  hoursEl.textContent = String(h).padStart(2, '0');
  minutesEl.textContent = String(m).padStart(2, '0');
  secondsEl.textContent = String(s).padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// Baxış Sayı
const counterEl = document.getElementById('counter');
const counterRef = db.ref("views");

counterRef.transaction(current => {
  return (current || 0) + 1;
});

counterRef.on("value", snapshot => {
  counterEl.textContent = snapshot.val();
});

// Audio Player
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const seekBar = document.getElementById('seekBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

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
