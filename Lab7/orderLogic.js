// orderLogic.js - логика выбора блюд с сохранением в localStorage

let selectedDishes = {
    burger: null,
    pizza: null,
    drink: null,
    starter: null,
    dessert: null
};

// Константа для ключа в localStorage
const STORAGE_KEY = 'selectedDishes';

// Загрузить выбранные блюда из localStorage
function loadSelectedDishesFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            selectedDishes = {...selectedDishes, ...parsed };
        } catch (err) {
            console.error('Ошибка при загрузке из localStorage:', err);
        }
    }
}

// Сохранить выбранные блюда в localStorage
function saveSelectedDishesToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDishes));
}

// Очистить localStorage
function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

function initializeOrderLogic() {
    // Загружаем сохраненные блюда после загрузки страницы
    loadSelectedDishesFromStorage();

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-order')) {
            const dishElement = e.target.closest('.dish');
            const dishKeyword = dishElement.getAttribute('data-dish');
            addDishToOrder(dishKeyword, dishElement);
        }
    });

    document.getElementById('reset-order').addEventListener('click', function() {
        resetOrder();
    });

    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (prepareFormData()) {
            submitOrder();
        }
    });

    document.getElementById('notification-ok').addEventListener('click', function() {
        hideNotification();
    });

    updateOrderSummary();

    document.querySelectorAll('.combo').forEach((combo, index) => {
        combo.addEventListener('click', () => {
            selectRandomCombo(index + 1);
        });
    });
}

function addDishToOrder(dishKeyword, dishElement) {
    const dish = dishes.find(d => d.keyword === dishKeyword);
    if (!dish) {
        console.error(`Блюдо с keyword ${dishKeyword} не найдено`);
        return;
    }

    const previousSelected = document.querySelector(`.dish.selected[data-dish*="${dish.category}"]`);
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }

    dishElement.classList.add('selected');
    selectedDishes[dish.category] = dish;

    // Сохраняем в localStorage после каждого выбора
    saveSelectedDishesToStorage();

    updateOrderSummary();
}

function updateOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const totalPriceElement = document.getElementById('total-price');
    const orderTotal = document.querySelector('.order-total');

    let totalPrice = 0;
    let hasSelectedDishes = false;
    let orderHTML = '';

    const categories = [
        { key: 'burger', name: 'Бургер', notSelectedText: 'Блюдо не выбрано' },
        { key: 'pizza', name: 'Пицца', notSelectedText: 'Блюдо не выбрано' },
        { key: 'starter', name: 'Стартер', notSelectedText: 'Стартер не выбран' },
        { key: 'drink', name: 'Напиток', notSelectedText: 'Напиток не выбран' },
        { key: 'dessert', name: 'Десерт', notSelectedText: 'Десерт не выбран' }
    ];

    hasSelectedDishes = Object.values(selectedDishes).some(dish => dish !== null);

    if (!hasSelectedDishes) {
        orderHTML = '<div class="no-selection">Ничего не выбрано</div>';
    } else {
        categories.forEach(category => {
                    const dish = selectedDishes[category.key];
                    const dishName = dish ? dish.name : category.notSelectedText;
                    const dishPrice = dish ? dish.price : 0;

                    orderHTML += `<div class="order-category">
        <span>${category.name}:</span>
        <span>${dishName}</span>
        ${dish ? `<span>${dishPrice} руб.</span>` : ''}
      </div>`;

      if (dish) {
        totalPrice += dish.price;
      }
    });
  }

  orderItems.innerHTML = orderHTML;
  totalPriceElement.textContent = totalPrice;
  
  if (orderTotal) {
    orderTotal.textContent = `Стоимость заказа: ${totalPrice} руб.`;
  }
}

function resetOrder() {
  selectedDishes = {
    burger: null,
    pizza: null,
    drink: null,
    starter: null,
    dessert: null
  };
  
  // Очищаем localStorage
  clearStorage();
  
  // Убираем класс selected со всех блюд
  document.querySelectorAll('.dish.selected').forEach(el => {
    el.classList.remove('selected');
  });
  
  updateOrderSummary();
}

function selectRandomCombo(comboNumber) {
  // Реализовать по необходимости
  console.log('Комбо ' + comboNumber + ' выбрано');
}

function prepareFormData() {
  const validation = validateCombo();
  if (!validation.isValid) {
    showNotification(validation.message);
    return false;
  }
  return true;
}

function submitOrder() {
  const formData = {
    dishes: selectedDishes,
    name: document.getElementById('name')?.value || '',
    email: document.getElementById('email')?.value || '',
    phone: document.getElementById('phone')?.value || '',
    address: document.getElementById('address')?.value || '',
    deliveryTime: document.getElementById('delivery-time')?.value || '',
    paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || 'cash',
    comments: document.getElementById('comments')?.value || ''
  };

  console.log('Отправляем заказ:', formData);

  // Отправляем данные на сервер
  fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Заказ успешно отправлен:', data);
    showNotification('Ваш заказ успешно отправлен! Номер заказа: ' + (data.id || ''));
    resetOrder();
    document.getElementById('order-form').reset();
  })
  .catch(error => {
    console.error('Ошибка при отправке заказа:', error);
    showNotification('Ошибка при отправке заказа. Попробуйте снова.');
  });
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