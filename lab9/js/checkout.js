// checkout.js - полностью переработанная версия
let currentOrder = {};

// Инициализация страницы оформления заказа
function initializeCheckout() {
    try {
        console.log('Initializing checkout page...');
        currentOrder = getFullOrder();
        console.log('Current order:', currentOrder);
        
        renderOrderSummary();
        updateOrderTotals();
        setupFormValidation();
        setupDeliveryTime();
    } catch (error) {
        console.error('Ошибка инициализации страницы оформления:', error);
        showError('Произошла ошибка при загрузке заказа');
    }
}

// Отображение сводки заказа
function renderOrderSummary() {
    const orderSummary = document.getElementById('checkout-order-summary');
    if (!orderSummary) {
        console.error('Order summary element not found');
        return;
    }
    
    const emptyMessage = orderSummary.querySelector('.empty-order-message');
    const orderTotalCard = document.querySelector('.order-total-card');
    
    // Проверяем, есть ли заказ
    const hasOrder = currentOrder && Object.keys(currentOrder).length > 0 && 
                    Object.values(currentOrder).some(dish => dish !== null);
    
    console.log('Has order:', hasOrder, 'Current order:', currentOrder);
    
    if (!hasOrder) {
        if (emptyMessage) emptyMessage.style.display = 'flex';
        if (orderTotalCard) orderTotalCard.style.display = 'none';
        return;
    }
    
    if (emptyMessage) emptyMessage.style.display = 'none';
    if (orderTotalCard) orderTotalCard.style.display = 'block';
    
    // Очищаем существующие блюда
    const existingDishes = orderSummary.querySelectorAll('.order-dish-card');
    existingDishes.forEach(dish => dish.remove());
    
    // Создаем контейнер для блюд
    const dishesContainer = document.createElement('div');
    dishesContainer.className = 'order-dishes-container';
    
    // Добавляем текущие блюда
    Object.keys(currentOrder).forEach(category => {
        const dish = currentOrder[category];
        if (dish && dish.id) {
            const dishElement = createDishElement(dish, category);
            dishesContainer.appendChild(dishElement);
        }
    });
    
    // Вставляем блюда перед orderTotalCard
    if (orderTotalCard && orderTotalCard.parentNode === orderSummary) {
        orderSummary.insertBefore(dishesContainer, orderTotalCard);
    } else {
        // Если orderTotalCard не найден или не в правильном месте, добавляем в конец
        orderSummary.appendChild(dishesContainer);
    }
}

// Создание элемента блюда для отображения
function createDishElement(dish, category) {
    const div = document.createElement('div');
    div.className = 'order-dish-card';
    div.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" class="order-dish-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKEoiBpbWFnZSA8L3RleHQ+PC9zdmc+'>
        <div class="order-dish-info">
            <div class="order-dish-name">${dish.name}</div>
            <div class="order-dish-price">${dish.price} ₽</div>
        </div>
        <button type="button" class="remove-dish-btn" data-category="${category}">
            <i class="fas fa-trash"></i>
            Удалить
        </button>
    `;
    
    const removeBtn = div.querySelector('.remove-dish-btn');
    removeBtn.addEventListener('click', () => removeDishFromOrder(category));
    
    return div;
}

// Удаление блюда из заказа
function removeDishFromOrder(category) {
    if (currentOrder[category]) {
        delete currentOrder[category];
        saveOrderToStorage(currentOrder);
        renderOrderSummary();
        updateOrderTotals();
    }
}

// Обновление всех итоговых сумм
function updateOrderTotals() {
    const total = calculateOrderTotal(currentOrder);
    const count = countOrderItems(currentOrder);
    
    console.log('Updating totals - Total:', total, 'Count:', count);
    
    // Обновляем все элементы с итогами
    const totalElements = [
        document.getElementById('composition-total'),
        document.getElementById('mini-total')
    ];
    
    const countElements = [
        document.getElementById('composition-count')
    ];
    
    totalElements.forEach(el => {
        if (el) {
            el.textContent = `${total} ₽`;
            console.log('Updated total element:', el.id, el.textContent);
        }
    });
    
    countElements.forEach(el => {
        if (el) {
            el.textContent = `${count} ${getRussianPlural(count, ['блюдо', 'блюда', 'блюд'])}`;
            console.log('Updated count element:', el.id, el.textContent);
        }
    });
}

// Функция для правильного склонения
function getRussianPlural(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
}

// Настройка времени доставки
function setupDeliveryTime() {
    const asapRadio = document.getElementById('asap');
    const scheduledRadio = document.getElementById('scheduled');
    const timeInput = document.getElementById('delivery_time');
    
    if (!asapRadio || !scheduledRadio || !timeInput) {
        console.warn('Delivery time elements not found');
        return;
    }
    
    function toggleTimeInput() {
        timeInput.disabled = !scheduledRadio.checked;
        timeInput.required = scheduledRadio.checked;
    }
    
    asapRadio.addEventListener('change', toggleTimeInput);
    scheduledRadio.addEventListener('change', toggleTimeInput);
    toggleTimeInput();
}

// Настройка валидации формы
function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    if (!form) {
        console.error('Checkout form not found');
        return;
    }
    
    const submitBtn = form.querySelector('.submit-order-btn');
    if (!submitBtn) {
        console.error('Submit button not found');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!submitBtn.disabled) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Оформление...';
            
            try {
                await submitOrder();
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить заказ';
            }
        }
    });
}

// Отправка заказа на сервер
async function submitOrder() {
    const form = document.getElementById('checkout-form');
    if (!form) {
        showError('Форма не найдена');
        throw new Error('Form not found');
    }
    
    const formData = new FormData(form);
    
    // Проверка состава заказа
    const validation = validateLunch(currentOrder);
    if (!validation.valid) {
        showError(validation.message);
        throw new Error(validation.message);
    }

    // Подготовка данных для API
    const orderData = {
        full_name: formData.get('full_name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        delivery_address: formData.get('address') || '',
        delivery_type: formData.get('delivery_type') || 'now',
        comment: formData.get('comment') || '',
        subscribe: formData.get('subscribe') ? 1 : 0,
        soup_id: currentOrder.soup?.id || null,
        main_course_id: currentOrder.main?.id || null,
        salad_id: currentOrder.starter?.id || null,
        drink_id: currentOrder.drink?.id || null,
        dessert_id: currentOrder.dessert?.id || null
    };
    
    // Обработка времени доставки
    if (orderData.delivery_type === 'by_time') {
        const time = formData.get('delivery_time');
        if (time) {
            orderData.delivery_time = time.replace(':', '');
        } else {
            showError('Пожалуйста, укажите время доставки');
            throw new Error('Время доставки не указано');
        }
    }
    
    try {
        const result = await createOrder(orderData);
        
        // Очистка localStorage после успешной отправки
        clearOrderFromStorage();
        currentOrder = {};
        
        showSuccess(`Заказ успешно оформлен! Номер вашего заказа: ${result.id}`);
        
        // Перенаправление на главную страницу через 3 секунды
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
        
    } catch (error) {
        console.error('Ошибка отправки заказа:', error);
        showError('Ошибка при оформлении заказа: ' + (error.message || 'Неизвестная ошибка'));
        throw error;
    }
}

// Показать сообщение об ошибке
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>Ошибка</h3>
            <p>${message}</p>
            <button class="notification-ok">Ок</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    const okButton = notification.querySelector('.notification-ok');
    okButton.addEventListener('click', function() {
        notification.remove();
    });
    
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            notification.remove();
        }
    });
}

// Показать сообщение об успехе
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>Успех!</h3>
            <p>${message}</p>
            <button class="notification-ok">Ок</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    const okButton = notification.querySelector('.notification-ok');
    okButton.addEventListener('click', function() {
        notification.remove();
    });
    
    notification.addEventListener('click', function(e) {
        if (e.target === notification) {
            notification.remove();
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeCheckout);