import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  timeout: 3000,
  clickToClose: true,
  closeButton: false,
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },
  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.5;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;
  let totalAmount = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, totalAmount)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });

    totalAmount += Number(step.value);
  }
}
