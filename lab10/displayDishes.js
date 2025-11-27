// Обновленный displayDishes.js - теперь ждет загрузки блюд
// displayDishes.js - отображение блюд с фильтрами
function displayDishes() {
    // const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name)); // Убрано, т.к. сортировка в loadDishes
    
    displayCategoryWithFilters('burgers', dishes.filter(dish => dish.category === 'burger'), 'Бургеры', [
        { name: 'Рыбный', kind: 'fish' },
        { name: 'Мясной', kind: 'meat' },
        { name: 'Вегетарианский', kind: 'veg' }
    ]);
    
    displayCategoryWithFilters('pizzas', dishes.filter(dish => dish.category === 'pizza'), 'Пицца', [
        { name: 'Рыбное', kind: 'fish' },
        { name: 'Мясное', kind: 'meat' },
        { name: 'Вегетарианское', kind: 'veg' }
    ]);
    
    displayCategoryWithFilters('drinks', dishes.filter(dish => dish.category === 'drink'), 'Напитки', [
        { name: 'Холодный', kind: 'cold' },
        { name: 'Горячий', kind: 'hot' }
    ]);
    
    displayCategoryWithFilters('starters', dishes.filter(dish => dish.category === 'starter'), 'Салаты и стартеры', [
        { name: 'Рыбный', kind: 'fish' },
        { name: 'Мясной', kind: 'meat' },
        { name: 'Вегетарианский', kind: 'veg' }
    ]);
    
    displayCategoryWithFilters('desserts', dishes.filter(dish => dish.category === 'dessert'), 'Десерты', [
        { name: 'Маленькая порция', kind: 'small' },
        { name: 'Средняя порция', kind: 'medium' },
        { name: 'Большая порция', kind: 'large' }
    ]);
}

function displayCategoryWithFilters(sectionClass, dishes, title, filters) {
    const section = document.querySelector(`.${sectionClass}`);
    if (!section) {
        console.error(`Секция с классом ${sectionClass} не найдена`);
        return;
    }
    
    section.innerHTML = `
        <div class="container">
            <h2>${title}</h2>
            <div class="filters" id="${sectionClass}-filters">
                ${filters.map(filter => `
                    <button class="filter-btn" data-kind="${filter.kind}" data-category="${sectionClass}">
                        ${filter.name}
                    </button>
                `).join('')}
            </div>
            <div class="dishes-grid" id="${sectionClass}-grid"></div>
        </div>
    `;
    
    const grid = document.getElementById(`${sectionClass}-grid`);
    
    if (!grid) {
        console.error(`Grid с id ${sectionClass}-grid не найден`);
        return;
    }
    
    displayDishesInGrid(dishes, grid);
    
    const filterButtons = document.querySelectorAll(`#${sectionClass}-filters .filter-btn`);
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const kind = this.getAttribute('data-kind');
            const category = this.getAttribute('data-category');
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                displayDishesInGrid(dishes, grid);
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filteredDishes = dishes.filter(dish => dish.kind === kind);
                displayDishesInGrid(filteredDishes, grid);
            }
        });
    });
}

function displayDishesInGrid(dishesToShow, grid) {
    grid.innerHTML = '';
    
    if (dishesToShow.length === 0) {
        grid.innerHTML = '<p class="no-dishes">Блюда не найдены</p>';
        return;
    }
    
    dishesToShow.forEach(dish => {
        const dishElement = createDishElement(dish);
        grid.appendChild(dishElement);
    });
}

function createDishElement(dish) {
    const dishDiv = document.createElement('div');
    dishDiv.className = 'dish';
    dishDiv.setAttribute('data-dish', dish.keyword);
    
    const isSelected = selectedDishes[dish.category] && selectedDishes[dish.category].keyword === dish.keyword;
    if (isSelected) {
        dishDiv.classList.add('selected');
    }
    
    dishDiv.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" onerror="this.src='https://via.placeholder.com/400x300?text=Изображение+не+загружено'">
        <p class="price">${dish.price} руб.</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="add-to-order">Добавить</button>
    `;
    
    return dishDiv;
}

// Загрузка блюд и инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes();
    displayDishes();
    initializeOrderLogic();  // Инициализация логики заказа после загрузки блюд
});