// comboValidation.js - проверка комбо ланча
function validateCombo() {
    const { burger, pizza, starter, drink } = selectedDishes;
    
    // Определяем доступные комбо
    const combos = [
        { name: "Комбо 1", required: { pizza: true, burger: true, starter: true, drink: true } },
        { name: "Комбо 2", required: { pizza: true, burger: true, drink: true } },
        { name: "Комбо 3", required: { pizza: true, starter: true, drink: true } },
        { name: "Комбо 4", required: { burger: true, starter: true, drink: true } },
        { name: "Комбо 5", required: { burger: true, drink: true } }
    ];
    
    const validCombo = combos.some(combo => {
        return Object.keys(combo.required).every(category => 
            combo.required[category] ? selectedDishes[category] : true
        );
    });
    
    if (validCombo) {
        return { isValid: true };
    }
    
    let message = "";
    
    if (!burger && !pizza && !starter && !drink) {
        message = "Не выбрано ни одного блюда. Выберите блюда для заказа";
    } else if (!drink) {
        message = "Выберите напиток";
    } else if ((!burger && !starter) || (!pizza && !burger)) {
        message = "Выберите бургер/бургер + салат";
    } else if (starter && !pizza && !burger) {
        message = "Выберите пиццу/бургер";
    } else if (drink && starter && !burger) {
        message = "Выберите бургер!";
    } else {
        message = "Выберите блюда согласно одному из комбо";
    }
    
    return { isValid: false, message };
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    messageElement.textContent = message;
    notification.style.display = 'flex';
}

function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
}