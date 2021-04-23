const secondHand = document.querySelector(`.second-hand`);
const minuteHand = document.querySelector(`.minute-hand`);
const hourHand = document.querySelector(`.hour-hand`);
const audioEl = document.querySelector("audio");
const speakBtn = document.querySelector("button");

var hour, minute, second, ampm;

let isHrSaid,
  isOSaid,
  isMinLess20Said,
  isminAbove20tenthSaid,
  isminAbove20OnceSaid,
  isFinishedSpeaking,
  isEvenAdded;

function setFlags() {
  isHrSaid = false;
  isOSaid = false;
  isFinishedSpeaking = false;
  isEvenAdded = false;
  isMinLess20Said = false;
  isminAbove20tenthSaid = false;
  isminAbove20OnceSaid = false;
}

function updateTime() {
  const now = new Date();
  hour = now.getHours();
  minute = now.getMinutes();
  second = now.getSeconds();
  ampm = hour < 12 || hour === 24 ? "AM" : "PM";

  hour = hour % 12; //changing to 12 hour clock
  if (hour == 0) hour = 12;
  const hourHandDegree = (360 / 12) * hour;
  hourHand.style.transform = `rotate(${hourHandDegree - 90}deg)`;

  const minuteHandDegree = (360 / 60) * minute;
  minuteHand.style.transform = `rotate(${minuteHandDegree - 90}deg)`;

  const secondHandDegree = (360 / 60) * second;
  secondHand.style.transform = `rotate(${secondHandDegree - 90}deg)`;
}

const addSrc = (num) => {
  audioEl.src = `./numbers/${num}.mp3`;
  const isPlayed = audioEl.play();
  audioEl.playbackRate = 1.2;
};

/** will be called when audio is playing finished so that we can play another audio */
const audioEnd = () => {
  if (isFinishedSpeaking) {
    return;
  }
  /** hr will always be b/w 1 - 12 so its already pre recorded */
  if (!isHrSaid) {
    addSrc(hour);
    isHrSaid = true;
    return;
  }
  if (minute === 0) {
    addSrc(ampm);
    isFinishedSpeaking = true;
    return;
  }
  /** Speak 'O' if min < 10 and is not said*/
  if (minute < 10 && !isOSaid) {
    addSrc("o");
    isOSaid = true;
    return;
  }
  /** if minute is b/w 1 - 20 say it directly no complications */
  if (minute <= 20 && !isMinLess20Said) {
    addSrc(minute);
    isMinLess20Said = true;
    return;
  }
  if (minute > 20 && !isminAbove20tenthSaid) {
    addSrc(parseInt(minute / 10) * 10);
    isminAbove20tenthSaid = true;
    return;
  }
  /** dont run if minute is 30 40 50 */
  if (minute % 10 != 0 && !isminAbove20OnceSaid && !isMinLess20Said) {
    addSrc(minute % 10);
    isminAbove20OnceSaid = true;
    return;
  }
  /** Play its sound first */
  addSrc(ampm);
  isFinishedSpeaking = true;
};

function speakTime() {
  addSrc("its");
  if (!isEvenAdded) {
    audioEl.addEventListener("ended", audioEnd);
    isEvenAdded = true;
  }
}

setInterval(updateTime, 1000);

speakBtn.addEventListener("click", () => {
  setFlags();
  speakTime();
});

/** Preload audios */
const audioList = [
  "1.mp3",
  "10.mp3",
  "11.mp3",
  "12.mp3",
  "13.mp3",
  "14.mp3",
  "15.mp3",
  "16.mp3",
  "17.mp3",
  "18.mp3",
  "19.mp3",
  "2.mp3",
  "20.mp3",
  "3.mp3",
  "30.mp3",
  "4.mp3",
  "40.mp3",
  "5.mp3",
  "50.mp3",
  "6.mp3",
  "7.mp3",
  "8.mp3",
  "9.mp3",
  "am.mp3",
  "its.mp3",
  "o.mp3",
  "pm.mp3",
];
