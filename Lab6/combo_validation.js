// combo_validation.js - валидация комбо при отправке формы для Лабораторной работы 6

// Ждём загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    // Находим форму на странице
    let form = document.querySelector("form");

    if (form) {
        // Добавляем обработчик события submit
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            // Проверяем, какие блюда выбраны (используем глобальные переменные из form_script.js)
            let hasSoup = previousDishes.soup !== null;
            let hasMain = previousDishes.mainCourse !== null;
            let hasSalad = previousDishes.salad !== null;
            let hasStarter = previousDishes.starter !== null;
            let hasDrink = previousDishes.drink !== null;

            // Салат или стартер считаем как одно
            let hasSaladOrStarter = hasSalad || hasStarter;

            // Проверяем валидность комбо
            // Валидные комбинации:
            // 1. Суп + Главное блюдо + Салат/Стартер + Напиток
            // 2. Суп + Главное блюдо + Напиток
            // 3. Суп + Салат/Стартер + Напиток
            // 4. Главное блюдо + Салат/Стартер + Напиток
            // 5. Главное блюдо + Напиток

            let validCombos = [
                hasSoup && hasMain && hasSaladOrStarter && hasDrink, // Комбо 1
                hasSoup && hasMain && !hasSaladOrStarter && hasDrink, // Комбо 2
                hasSoup && !hasMain && hasSaladOrStarter && hasDrink, // Комбо 3
                !hasSoup && hasMain && hasSaladOrStarter && hasDrink, // Комбо 4
                !hasSoup && hasMain && !hasSaladOrStarter && hasDrink // Комбо 5
            ];

            // Проверяем, есть ли хотя бы одно валидное комбо
            let isValid = validCombos.some(combo => combo === true);

            if (isValid) {
                // Заказ валиден - можно отправить
                alert("Заказ успешно оформлен! Спасибо за заказ.");
                // Здесь можно добавить реальную отправку формы:
                // form.submit();
            } else {
                // Заказ не валиден - показываем уведомление с ошибкой
                let errorMessage = getErrorMessage(hasSoup, hasMain, hasSaladOrStarter, hasDrink);
                showNotification(errorMessage);
            }
        });
    }
});

// Функция определения сообщения об ошибке
function getErrorMessage(hasSoup, hasMain, hasSaladOrStarter, hasDrink) {
    // 1. Ничего не выбрано
    if (!hasSoup && !hasMain && !hasSaladOrStarter && !hasDrink) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }

    // 2. Нет напитка (обязателен для всех комбо)
    if (!hasDrink) {
        return "Выберите напиток";
    }

    // 3. Есть только суп и напиток (нужно главное блюдо или салат/стартер)
    if (hasSoup && !hasMain && !hasSaladOrStarter && hasDrink) {
        return "Выберите главное блюдо/салат/стартер";
    }

    // 4. Есть только салат/стартер и напиток (нужен суп или главное блюдо)
    if (!hasSoup && !hasMain && hasSaladOrStarter && hasDrink) {
        return "Выберите суп или главное блюдо";
    }

    // 5. Есть только напиток (нужно главное блюдо)
    if (!hasSoup && !hasMain && !hasSaladOrStarter && hasDrink) {
        return "Выберите главное блюдо";
    }

    // Общее сообщение
    return "Выберите главное блюдо";
}

// Функция создания и отображения модального уведомления
function showNotification(message) {
    // Создаём затемняющий overlay
    let overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    `;

    // Создаём модальное окно с уведомлением
    let notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        text-align: center;
        min-width: 400px;
    `;

    // Создаём текст сообщения
    let text = document.createElement("p");
    text.textContent = message;
    text.style.cssText = `
        margin: 0 0 30px 0;
        font-size: 1.3rem;
        color: #333;
    `;

    // Создаём кнопку "Окей"
    let button = document.createElement("button");
    button.textContent = "Окей 👌";
    button.style.cssText = `
        padding: 12px 40px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.2s ease;
    `;

    // Изменение цвета при наведении
    button.addEventListener("mouseover", function() {
        button.style.backgroundColor = "#333";
        button.style.color = "white";
    });

    button.addEventListener("mouseout", function() {
        button.style.backgroundColor = "#007bff";
        button.style.color = "white";
    });

    // Закрытие уведомления при клике на кнопку
    button.addEventListener("click", function() {
        document.body.removeChild(overlay);
        document.body.removeChild(notification);
    });

    // Собираем уведомление
    notification.appendChild(text);
    notification.appendChild(button);

    // Добавляем на страницу
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
}