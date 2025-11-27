// checkout.js - логика страницы оформления заказа

const STORAGE_KEY = 'selectedDishes';

// Загрузить и отобразить заказ при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadDishesData();
    displayCheckoutOrder();

    // Обработчик отправки формы
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateCheckoutForm()) {
                submitOrderFromCheckout();
            }
        });
    }

    // Обработчик закрытия уведомления
    const notificationOk = document.getElementById('notification-ok');
    if (notificationOk) {
        notificationOk.addEventListener('click', hideNotification);
    }
});

// Загрузить данные блюд (API)
async function loadDishesData() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        const fetchedDishes = await response.json();
        window.dishesData = fetchedDishes;
    } catch (err) {
        console.error('Ошибка при загрузке блюд:', err);
    }
}

// Отобразить заказ на странице оформления
function displayCheckoutOrder() {
    const stored = localStorage.getItem(STORAGE_KEY);
    let selectedDishes = {};

    if (stored) {
        try {
            selectedDishes = JSON.parse(stored);
        } catch (err) {
            console.error('Ошибка при парсинге localStorage:', err);
        }
    }

    const orderItemsContainer = document.getElementById('checkout-order-items');
    const totalElement = document.getElementById('checkout-total');

    let totalPrice = 0;
    let hasItems = false;
    let orderHTML = '';

    const categories = [
        { key: 'burger', name: 'Бургер' },
        { key: 'pizza', name: 'Пицца' },
        { key: 'starter', name: 'Стартер' },
        { key: 'drink', name: 'Напиток' },
        { key: 'dessert', name: 'Десерт' }
    ];

    categories.forEach(category => {
        const dish = selectedDishes[category.key];
        if (dish && dish.name && dish.price) {
            hasItems = true;
            const price = typeof dish.price === 'number' ? dish.price : parseInt(dish.price) || 0;
            totalPrice += price;

            orderHTML += `
        <div class="order-category">
          <span><strong>${category.name}:</strong></span>
          <span>${dish.name}</span>
          <span style="text-align: right; font-weight: bold;">${price} руб.</span>
        </div>
      `;
        }
    });

    if (!hasItems) {
        orderHTML = '<div class="no-selection">Ничего не выбрано. <a href="lunch.html">Перейти к выбору блюд</a></div>';
    }

    orderItemsContainer.innerHTML = orderHTML;
    totalElement.textContent = `Стоимость заказа: ${totalPrice} руб.`;
}

// Валидация формы
function validateCheckoutForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const deliveryTime = document.getElementById('delivery-time').value;

    // Проверка пустых полей
    if (!name || !email || !phone || !address || !deliveryTime) {
        showNotification('Пожалуйста, заполните все обязательные поля');
        return false;
    }

    // Проверка электронной почты (простая валидация)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Пожалуйста, введите корректный адрес электронной почты');
        return false;
    }

    // Проверка номера телефона (начинается с + или цифры, содержит только цифры и символы)
    const phoneRegex = /^[\d\-+()]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Пожалуйста, введите корректный номер телефона');
        return false;
    }

    // Проверка выбранных блюд
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        showNotification('Пожалуйста, выберите блюда в меню');
        return false;
    }

    const selectedDishes = JSON.parse(stored);
    const hasSelection = Object.values(selectedDishes).some(dish => dish !== null);

    if (!hasSelection) {
        showNotification('Пожалуйста, выберите хотя бы одно блюдо');
        return false;
    }

    return true;
}

// Отправить заказ на сервер
async function submitOrderFromCheckout() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const selectedDishes = JSON.parse(stored);

    // Получаем ID выбранных блюд
    const dishIds = Object.values(selectedDishes)
        .filter(dish => dish !== null)
        .map(dish => dish.id || dish.keyword);

    const formData = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        },
        delivery: {
            time: document.getElementById('delivery-time').value,
            paymentMethod: document.querySelector('input[name="payment"]:checked').value
        },
        dishes: dishIds,
        comments: document.getElementById('comments').value,
        timestamp: new Date().toISOString()
    };

    console.log('Отправляем заказ:', formData);

    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const result = await response.json();
        console.log('Заказ успешно отправлен:', result);

        // Очищаем localStorage после успешной отправки
        localStorage.removeItem(STORAGE_KEY);

        // Показываем успешное сообщение
        showNotification(
            `✓ Ваш заказ успешно отправлен!\n\nНомер заказа: ${result.id || 'N/A'}\n\nМы свяжемся с вами в ближайшее время.`
        );

        // Очищаем форму
        document.getElementById('order-form').reset();

        // Перенаправляем на главную через 3 секунды
        setTimeout(() => {
            window.location.href = 'lunch.html';
        }, 3000);

    } catch (error) {
        console.error('Ошибка при отправке заказа:', error);
        showNotification(`Ошибка при отправке заказа: ${error.message}\n\nПопробуйте снова позже.`);
    }
}

// Показать уведомление
function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');

    if (notification && messageElement) {
        messageElement.textContent = message;
        notification.style.display = 'flex';
    }
}

// Скрыть уведомление
function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.display = 'none';
    }
}