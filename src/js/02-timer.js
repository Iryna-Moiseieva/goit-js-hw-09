// Описан в документации
import flatpickr from "flatpickr";

// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

// Импорт библиотеки Notify для отображения уведомлений
import { Notify } from 'notiflix/build/notiflix-notify-aio';


// Дополнительный обьект параметров с ДЗ
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        chooseDate(selectedDates[0]);
    }
};

// Получаем доступ к необходимым элементам.
const buttonStart = document.querySelector("[data-start]");
const inputEl = document.querySelector("#datetime-picker");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// Устанавливаем "блокировку" кнопки Start через атрибут тега disabled
buttonStart.disabled = true;

// Создаем глобальную переменную timerId
let timerId = null; 

let chosenDate = Date.now();

// Инициализируем библиотеку flatpickr
const fp = flatpickr(inputEl, options); 

// Функция выбора даты
function chooseDate (date) {
    if (Date.now() > date) {
        Notify.failure('Please choose a date in the future');
    } else {
        buttonStart.disabled = false;
        chosenDate = date;
    }
}

// Добавляем слушателя на событие "клик" при нажатии на кнопки Start 
buttonStart.addEventListener("click", onButtonStartClick);

// Создаем колбек функцию на событие, которая начинает отсчет времени
function onButtonStartClick() {
    timerId = setInterval(() => {
    
    const newData = new Date(); 
    const finalData = new Date(inputEl.value);
    const deltaData= convertMs(finalData - newData);

        if (deltaData <= 0) {
            clearInterval(timerId);
        }
        
        // Добавляем разметку
        days.textContent = addLeadingZero(deltaData.days);
        hours.textContent = addLeadingZero(deltaData.hours);
        minutes.textContent = addLeadingZero(deltaData.minutes);
        seconds.textContent = addLeadingZero(deltaData.seconds);
    
        }, 1000);
    
    inputEl.disabled = true;
    buttonStart.disabled = true;
    
}


// Для подсчета значений используем готовую функцию convertMs,
// где ms - разница между конечной и текущей датой в миллисекундах.

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}