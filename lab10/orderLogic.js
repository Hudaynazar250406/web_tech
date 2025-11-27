// Обновленный orderLogic.js - убрано отдельное DOMContentLoaded, т.к. теперь вызывается после loadDishes в displayDishes.js
// orderLogic.js - логика выбора блюд и подсчета стоимости
let selectedDishes = {
    burger: null,
    pizza: null,
    drink: null,
    starter: null,
    dessert: null
};

function initializeOrderLogic() {
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
        if (!prepareFormData()) {
            e.preventDefault();
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
        orderTotal.style.display = 'none';
    } else {
        categories.forEach(cat => {
            const dish = selectedDishes[cat.key];
            if (dish) {
                totalPrice += dish.price;
                orderHTML += `
                    <div class="order-category">
                        <strong>${cat.name}:</strong>
                        <span>${dish.name} - ${dish.price} руб.</span>
                    </div>
                `;
            } else {
                orderHTML += `
                    <div class="order-category">
                        <strong>${cat.name}:</strong>
                        <span class="not-selected">- ${cat.notSelectedText}</span>
                    </div>
                `;
            }
        });
        
        orderTotal.style.display = 'block';
        totalPriceElement.textContent = totalPrice;
    }
    
    orderItems.innerHTML = orderHTML;
}

function resetOrder() {
    document.querySelectorAll('.dish.selected').forEach(dish => {
        dish.classList.remove('selected');
    });
    
    selectedDishes = { burger: null, pizza: null, drink: null, starter: null, dessert: null };
    
    updateOrderSummary();
}

function prepareFormData() {
    const validation = validateCombo();
    
    if (!validation.isValid) {
        showNotification(validation.message);
        return false;
    }
    
    document.getElementById('selected-burger').value = selectedDishes.burger ? selectedDishes.burger.keyword : '';
    document.getElementById('selected-pizza').value = selectedDishes.pizza ? selectedDishes.pizza.keyword : '';
    document.getElementById('selected-starter').value = selectedDishes.starter ? selectedDishes.starter.keyword : '';
    document.getElementById('selected-drink').value = selectedDishes.drink ? selectedDishes.drink.keyword : '';
    document.getElementById('selected-dessert').value = selectedDishes.dessert ? selectedDishes.dessert.keyword : '';
    
    return true;
}

function selectRandomDish(category) {
    const categoryDishes = dishes.filter(d => d.category === category);
    if (categoryDishes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * categoryDishes.length);
    return categoryDishes[randomIndex];
}

function selectRandomCombo(comboNum) {
    // Сброс текущего заказа перед выбором нового комбо
    resetOrder();

    let requiredCategories = [];
    switch (comboNum) {
        case 1:
            requiredCategories = ['pizza', 'burger', 'starter', 'drink'];
            break;
        case 2:
            requiredCategories = ['pizza', 'burger', 'drink'];
            break;
        case 3:
            requiredCategories = ['pizza', 'starter', 'drink'];
            break;
        case 4:
            requiredCategories = ['burger', 'starter', 'drink'];
            break;
        case 5:
            requiredCategories = ['burger', 'drink'];
            break;
        default:
            return;
    }

    requiredCategories.forEach(category => {
        const dish = selectRandomDish(category);
        if (dish) {
            const dishElement = document.querySelector(`.dish[data-dish="${dish.keyword}"]`);
            if (dishElement) {
                addDishToOrder(dish.keyword, dishElement);
            } else {
                console.warn(`Элемент для блюда ${dish.keyword} не найден`);
            }
        }
    });
}