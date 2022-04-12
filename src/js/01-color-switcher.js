// Для генерации случайного цвета используем функцию getRandomHexColor.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Получаем доступ к кнопкам Start и Stop через data-атрибуты.
const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");

// console.log(buttonStart);
// console.log(buttonStop);

// Получаем доступ к тегу body.
const body = document.querySelector('body');

// Создаем глобальную переменную timerId
let timerId = null;

// Добавляем слушателя на событие "клик" при нажатии на кнопки Start и Stop
buttonStart.addEventListener("click", onButtonStartClick);
buttonStop.addEventListener("click", onButtonStopClick);

// Создаем колбек функцию на событие Start
function onButtonStartClick (event) {
    //   console.log("Button was clicked");
        
    // Устанавливаем "блокировку" кнопки Start через атрибут тега disabled
    buttonStart.setAttribute('disabled', 'disabled');

    // Убираем "блокировку" кнопки Stop через атрибут тега disabled
    buttonStop.removeAttribute('disabled', 'disabled');

    // Вызываем функцию, которая рандомно меняет цвет фона с определенным интервалом
    timerId = setInterval(StartChangeBackgroundColor, 1000);
}
    
function StartChangeBackgroundColor () {
    body.style.backgroundColor = getRandomHexColor();
}


// Создаем колбек функцию на событие Stop   
function onButtonStopClick (event) {
    //   console.log("Button was clicked");
    
    // Устанавливаем "блокировку" кнопки Stop через атрибут тега disabled
    buttonStop.setAttribute('disabled', 'disabled');

    // Убираем "блокировку" кнопки Start через атрибут тега disabled
    buttonStart.removeAttribute('disabled', 'disabled');

    // Вызываем функцию, которая останавливает изменение цвета
    StopChangeBackgroundColor();
}

function StopChangeBackgroundColor () {
    clearInterval(timerId);
}