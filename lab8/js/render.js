// render.js - исправленная версия (без отображения порций)
const categories = {
    soup: document.getElementById("soups"),
    main: document.getElementById("mains"),
    starter: document.getElementById("starters"),
    drink: document.getElementById("drinks"),
    dessert: document.getElementById("desserts")
};

const orderPanel = document.getElementById('order-panel');
const panelTotal = document.getElementById('panel-total');
const panelCount = document.getElementById('panel-count');
const checkoutLink = document.getElementById('checkout-link');

const selected = {
    soup: null,
    main: null, 
    starter: null,
    drink: null,
    dessert: null
};
const activeFilters = {
    soup: null,
    main: null,
    starter: null,
    drink: null,
    dessert: null
};

let dishes = [];

// Загрузка заказа из localStorage при инициализации
async function initialize() {
    try {
        console.log('Initializing page...');
        
        // Проверяем наличие API ключа
        const apiKey = getApiKey();
        if (!apiKey) {
            showError('API ключ не найден. Пожалуйста, настройте API ключ.');
            return;
        }

        dishes = await loadDishes();
        
        if (!dishes || dishes.length === 0) {
            showError('Не удалось загрузить меню или меню пустое. Пожалуйста, проверьте ваш API ключ.');
            return;
        }
        
        console.log('Successfully loaded', dishes.length, 'dishes');
        
        // Загрузка сохраненного заказа
        await loadSavedOrder();
        
        renderDishes();
        updateOrderPanel();
        setupFilters();
    } catch (error) {
        console.error('Ошибка инициализации:', error);
        showError(`Ошибка загрузки меню: ${error.message}`);
    }
}

// Загрузка сохраненного заказа из localStorage
async function loadSavedOrder() {
    try {
        const storedOrder = await getFullOrder();
        Object.keys(storedOrder).forEach(category => {
            if (storedOrder[category]) {
                selected[category] = storedOrder[category];
            }
        });
        console.log('Loaded saved order:', storedOrder);
    } catch (error) {
        console.error('Error loading saved order:', error);
    }
}

// Функция для генерации карточек (без отображения порций)
function renderDishes() {
    Object.keys(categories).forEach(cat => {
        if (!categories[cat]) {
            console.warn(`Category element not found: ${cat}`);
            return;
        }
        
        let catDishes = dishes.filter(d => d.category === cat).sort((a,b) => a.name.localeCompare(b.name));
        
        // Применяем фильтр, если есть
        if (activeFilters[cat]) {
            catDishes = catDishes.filter(d => d.kind === activeFilters[cat]);
        }
        
        categories[cat].innerHTML = "";
        
        if (catDishes.length === 0) {
            categories[cat].innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: #666;">Нет доступных блюд в этой категории</p>';
            return;
        }
        
        catDishes.forEach(dish => {
            const div = document.createElement("div");
            div.className = "dish";
            div.dataset.dish = dish.keyword;
            
            // Проверяем, выбрано ли это блюдо
            const isSelected = selected[cat] && selected[cat].id === dish.id;
            
            div.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKEoiBpbWFnZSA8L3RleHQ+PC9zdmc+'>
                <p class="price">${dish.price} ₽</p>
                <p class="name">${dish.name}</p>
                <button type="button" class="add-btn ${isSelected ? 'selected' : ''}">${isSelected ? '✓ Выбрано' : 'Добавить'}</button>
            `;
            
            const btn = div.querySelector(".add-btn");
            btn.addEventListener("click", () => selectDish(cat, dish, div));
            
            // Если это блюдо выбрано, выделяем его
            if (isSelected) {
                div.style.borderColor = "tomato";
                btn.textContent = '✓ Выбрано';
                btn.classList.add('selected');
            }
            
            categories[cat].appendChild(div);
        });
    });
}

// Выбор блюда
function selectDish(cat, dish, div){
    // Если блюдо уже выбрано, снимаем выбор
    if (selected[cat] && selected[cat].id === dish.id) {
        selected[cat] = null;
        div.style.borderColor = "transparent";
        const btn = div.querySelector(".add-btn");
        btn.textContent = 'Добавить';
        btn.classList.remove('selected');
    } else {
        // Выбираем новое блюдо
        selected[cat] = dish;
        // Снимаем рамки со всех карточек в категории
        categories[cat].querySelectorAll(".dish").forEach(d => {
            d.style.borderColor = "transparent";
            const btn = d.querySelector(".add-btn");
            btn.textContent = 'Добавить';
            btn.classList.remove('selected');
        });
        // Выделяем выбранное
        div.style.borderColor = "tomato";
        const btn = div.querySelector(".add-btn");
        btn.textContent = '✓ Выбрано';
        btn.classList.add('selected');
    }
    
    // Сохраняем в localStorage
    saveOrderToStorage(selected);
    updateOrderPanel();
}

// Обновление sticky панели
function updateOrderPanel() {
    if (!orderPanel || !panelTotal || !panelCount || !checkoutLink) return;
    
    const total = calculateOrderTotal(selected);
    const count = countOrderItems(selected);
    
    panelTotal.textContent = total;
    panelCount.textContent = count;
    
    if (count > 0) {
        orderPanel.style.display = 'block';
        checkoutLink.classList.remove('disabled');
        checkoutLink.href = "checkout.html";
    } else {
        orderPanel.style.display = 'none';
        checkoutLink.classList.add('disabled');
        checkoutLink.href = "#";
    }
}

// Функция для фильтрации блюд
function setupFilters() {
    Object.keys(categories).forEach(cat => {
        const filterContainer = document.getElementById(`${cat}-filters`);
        if (!filterContainer) return;
        
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const kind = this.dataset.kind;
                
                // Если кликнули по активному фильтру, снимаем его
                if (activeFilters[cat] === kind) {
                    activeFilters[cat] = null;
                    this.classList.remove('active');
                } else {
                    // Снимаем активность с других кнопок в этой категории
                    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    // Устанавливаем новый фильтр
                    activeFilters[cat] = kind;
                    this.classList.add('active');
                }
                
                // Перерисовываем блюда
                renderDishes();
            });
        });
    });
}

function showError(message) {
    // Создаем уведомление об ошибке
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

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', initialize);