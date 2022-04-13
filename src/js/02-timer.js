// Описан в документации
import flatpickr from "flatpickr";

// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

// Импорт библиотеки Notify для отображения уведомлений
import Notiflix from 'notiflix';

// Дополнительный обьект параметров с ДЗ
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};

// Получаем доступ к необходимым элементам.
const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

// Инициализируем библиотеку flatpickr
const fp = flatpickr(refs.input, options);

// Устанавливаем "блокировку" кнопки Start через атрибут тега disabled
refs.startBtn.setAttribute("disabled", "disabled");

let chosenDate = Date.now();

// Функция выбора даты
function onClose(selectedDates) {    
    if (selectedDates[0] < options.defaultDate) {
        return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
        refs.startBtn.removeAttribute("disabled", "disabled");
        chosenDate = selectedDates[0];
    }
}

// Создаем глобальную переменную timerId
let timerId = null;

// Добавляем слушателя на событие "клик" при нажатии на кнопки Start 
refs.startBtn.addEventListener('click', onStartBtn);

// Создаем колбек функцию на событие, которая начинает отсчет времени
const onStartBtn = () => {
    refs.startBtn.setAttribute("disabled", "disabled");
    refs.input.setAttribute("disabled", "disabled");
    timerId = setInterval(() => {
        const resultTime = convertMs(chosenDate - Date.now());
        
        const deltaTime = chosenDate - Date.now();
        if (deltaTime <= 0 ) {
            clearInterval(timerId);
            return;
    }
        markupChange(resultTime); 
    }, 1000);
    
}

   // Добавляем разметку
    function markupChange({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

// Для подсчета значений используем готовую функцию convertMs,
// где ms - разница между конечной и текущей датой в миллисекундах.
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


// Функция, которая использует метод метод padStart() 
// и перед отрисовкой интефрейса форматируй значение.
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}