// Импорт библиотеки Notify для отображения уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Получаем доступ к необходимым элементам.
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

// Добавляем слушателя на событие "submit" 
form.addEventListener("submit", onFormSubmit);

// Создаем кол-бек функцию на событие
function onFormSubmit(event) {
  event.preventDefault();
  const data = {
    amount: parseInt(amount.value),
    step: parseInt(step.value),
    delay: parseInt(delay.value),
  };
  callPromiseCreation(data);
}


function callPromiseCreation({ amount, step, delay }) {
  let calculatedDelay = delay;
  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, calculatedDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    calculatedDelay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
