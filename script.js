import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Firebase konfiqi
const firebaseConfig = {
  apiKey: "AIzaSyBP2WHQAtSboDcKDUWqhRx3s_AVAf4YCF4",
  authDomain: "imtahan-taymeri.firebaseapp.com",
  projectId: "imtahan-taymeri",
  storageBucket: "imtahan-taymeri.firebasestorage.app",
  messagingSenderId: "425403681235",
  appId: "1:425403681235:web:0ee4cdc852f6e12ad40726",
  measurementId: "G-RS9450CC6E"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const counterRef = doc(db, "sayac", "sayacDoc");

// Sayğacı artır və göstər
async function updateCounter() {
  try {
    await updateDoc(counterRef, { count: increment(1) });
  } catch {
    await setDoc(counterRef, { count: 1 });
  }
  const snap = await getDoc(counterRef);
  if (snap.exists()) {
    document.getElementById("counter").textContent = snap.data().count;
  }
}
updateCounter();

// Taymer
const targetDate = new Date('2025-06-01T09:30:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

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
updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

// Audio funksionallıq
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

function setAudioDuration() {
  if (audio.duration && !isNaN(audio.duration)) {
    seekBar.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  } else {
    setTimeout(setAudioDuration, 500);
  }
}

audio.addEventListener('loadedmetadata', setAudioDuration);

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
