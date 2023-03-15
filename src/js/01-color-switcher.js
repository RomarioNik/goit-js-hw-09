const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', handleClickBtnStart);
refs.stopBtn.addEventListener('click', handleClickBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function handleClickBtnStart() {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    addBackgroundColorToBody(color);
    refs.startBtn.setAttribute('disabled', '');
  }, 1000);
}

function handleClickBtnStop() {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled');
}

function addBackgroundColorToBody(color) {
  document.body.style.backgroundColor = color;
}
