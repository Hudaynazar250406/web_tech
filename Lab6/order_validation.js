// order_validation.js - скрипт валидации заказа

// Функция проверки валидности комбо
function validateOrder() {
    let hasSoup = currentOrder.soup !== null;
    let hasMain = currentOrder.main !== null;
    let hasSalad = currentOrder.salad !== null;
    let hasDrink = currentOrder.drink !== null;
    
    // Десерт и стартер не обязательны и не влияют на валидность комбо
    
    // Валидные комбинации:
    // 1. Суп + Главное + Салат + Напиток
    // 2. Суп + Главное + Напиток
    // 3. Суп + Салат + Напиток
    // 4. Главное + Салат + Напиток
    // 5. Главное + Напиток
    
    let validCombinations = [
        hasSoup && hasMain && hasSalad && hasDrink,  // комбо 1
        hasSoup && hasMain && !hasSalad && hasDrink, // комбо 2
        hasSoup && !hasMain && hasSalad && hasDrink, // комбо 3
        !hasSoup && hasMain && hasSalad && hasDrink, // комбо 4
        !hasSoup && hasMain && !hasSalad && hasDrink  // комбо 5
    ];
    
    return validCombinations.some(combo => combo === true);
}

// Функция определения ошибки заказа
function getOrderError() {
    let hasSoup = currentOrder.soup !== null;
    let hasMain = currentOrder.main !== null;
    let hasSalad = currentOrder.salad !== null;
    let hasDrink = currentOrder.drink !== null;
    
    // Ничего не выбрано
    if (!hasSoup && !hasMain && !hasSalad && !hasDrink) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }
    
    // Нет напитка (обязателен для всех комбо)
    if (!hasDrink) {
        return "Выберите напиток";
    }
    
    // Есть только суп и напиток (нужно главное или салат)
    if (hasSoup && !hasMain && !hasSalad && hasDrink) {
        return "Выберите главное блюдо/салат/стартер";
    }
    
    // Есть только салат и напиток (нужен суп или главное)
    if (!hasSoup && !hasMain && hasSalad && hasDrink) {
        return "Выберите суп или главное блюдо";
    }
    
    // Есть только напиток (нужно главное блюдо)
    if (!hasSoup && !hasMain && !hasSalad && hasDrink) {
        return "Выберите главное блюдо";
    }
    
    return "Комбинация выбранных блюд не соответствует ни одному комбо";
}

// Функция создания уведомления
function showNotification(message) {
    // Создаём overlay
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    
    // Создаём модальное окно
    let notification = document.createElement("div");
    notification.className = "notification";
    
    let text = document.createElement("p");
    text.textContent = message;
    
    let button = document.createElement("button");
    button.className = "btn";
    button.textContent = "Окей 👌";
    
    // При клике закрываем уведомление
    button.addEventListener("click", function() {
        document.body.removeChild(overlay);
        document.body.removeChild(notification);
    });
    
    notification.appendChild(text);
    notification.appendChild(button);
    
    document.body.appendChild(overlay);
    document.body.appendChild(notification);
}

// Обработчик отправки формы
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("order-form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем отправку формы
        
        // Проверяем валидность заказа
        if (validateOrder()) {
            // Заказ валиден - можно отправить
            alert("Заказ успешно оформлен! Спасибо за заказ.");
            
            // Здесь можно добавить код для отправки данных на сервер
            // form.submit();
        } else {
            // Заказ не валиден - показываем уведомление
            let errorMessage = getOrderError();
            showNotification(errorMessage);
        }
    });
});