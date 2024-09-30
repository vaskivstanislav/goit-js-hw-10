import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    validateDate();
  },
};

flatpickr("#datetime-picker", options);

const startBtn = document.querySelector('[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');
const dateTimepicker = document.querySelector("#datetime-picker");

let userSelectedDate = null;

function validateDate() {
  if (userSelectedDate < Date.now()) {
    iziToast.show({
      title: "Hey dear",
      message: "Please choose a date in the future",
      position: "topCenter",
      closeOnEscape: true,
      closeOnClick: true,
    });
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

let countInterval = null;

function startCount() {
  countInterval = setInterval(() => {
    const timeRemain = userSelectedDate - Date.now();

    if (timeRemain <= 0) {
      clearInterval(countInterval);
      updateTimerFace({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      startBtn.disabled = true;
      dateTimepicker.disabled = false;
      return;
    }

    const time = convertMs(timeRemain);
    updateTimerFace(time);
  }, 1000);
}


startBtn.addEventListener("click",  () => {
  if (!userSelectedDate) return;

  if (countInterval) {
    clearInterval(countInterval);
  }

  dateTimepicker.disabled = true; 
  startBtn.disabled = true; 

  startCount(); 
});