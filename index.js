const display = document.querySelector('.display');
const alarmTime = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarm');
const clearAlarmBtn = document.getElementById('clearAlarm');
const alarmMsg = document.querySelector('.alarm-msg');

let alarmTimeout;
let alarmMsgTimeout;

function displayTime() {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  let amPM = 'AM';

  if (h >= 12) {
    amPM = 'PM';
  }

  if (h === 0) {
    h = 12;
  } else if (h > 12) {
    h -= 12;
  }

  if (h < 10) h = `0${h}`;
  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;

  display.textContent = `${h}:${m}:${s} ${amPM}`;
}

function setAlarm() {
  const alarmDate = new Date(alarmTime.value);
  const currentDate = new Date();

  const timeDiff = alarmDate.getTime() - currentDate.getTime();

  if (timeDiff > 0) {
    alarmTimeout = setTimeout(() => {
      display.style.color = 'red';
    }, timeDiff);
    displayAlarmMsg(3000, 'alarm set!');
  }
}

function clearAlarm() {
  if (alarmTimeout) {
    alarmTimeout = clearTimeout(alarmTimeout);
    display.style.color = 'black';
    displayAlarmMsg(3000, 'alarm cleared!');
  }
}

// displayTime in ms
function displayAlarmMsg(displayTime, msg) {
  alarmMsg.textContent = msg;
  clearTimeout(alarmMsgTimeout);
  alarmMsgTimeout = setTimeout(() => {
    alarmMsg.textContent = '';
  }, displayTime);
}

setInterval(displayTime);

setAlarmBtn.addEventListener('click', () => {
  if (alarmTime.value) {
    if (alarmTimeout) {
      displayAlarmMsg(6000, 'You must clear previous alarm first!');
    } else {
      setAlarm();
    }
  }
});

clearAlarmBtn.addEventListener('click', clearAlarm);
