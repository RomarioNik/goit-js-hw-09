import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  clearBtn: document.querySelector('[data-clear]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timeId = null;

Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  timeout: 3000,
  clickToClose: true,
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  warning: {
    background: '#EE3232',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.4)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedData = selectedDates[0].getTime();

    if (selectedData <= Date.now()) {
      disabledBtn(['stopBtn']);
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }

    updateData(convertTime(selectedData));
    enabledBtn(['startBtn', 'clearBtn']);
  },
};

const fp = flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener('click', handleClickStartBtn);
refs.stopBtn.addEventListener('click', handleClickStopBtn);
refs.clearBtn.addEventListener('click', handlesClearBtn);

function disabledBtn(btn) {
  btn.map(el => refs[el].setAttribute('disabled', ''));
}

function enabledBtn(btn) {
  btn.map(el => refs[el].removeAttribute('disabled'));
}

function convertTime(timeStamp) {
  const time = timeStamp - Date.now();

  const days = Math.floor(time / 1000 / 60 / 60 / 24);
  const hours = Math.floor((time / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const data = {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };

  return data;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateData({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function handleClickStartBtn() {
  disabledBtn(['startBtn', 'clearBtn']);
  enabledBtn(['stopBtn']);

  timeId = setInterval(() => {
    const newdata = fp.selectedDates[0].getTime();

    if (newdata <= Date.now()) {
      stopTimer();
      return;
    }

    updateData(convertTime(newdata));
  }, 1000);
}

function handleClickStopBtn() {
  enabledBtn(['startBtn', 'clearBtn']);
  disabledBtn(['stopBtn']);
  stopTimer();
}

function handlesClearBtn() {
  refs.inputEl.value = '';

  const data = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  disabledBtn(['startBtn', 'stopBtn', 'clearBtn']);
  updateData(data);
}

function stopTimer() {
  clearInterval(timeId);
}
