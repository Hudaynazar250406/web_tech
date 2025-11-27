// displayDishes.js - отображение блюд с фильтрами и восстановлением из localStorage

function displayDishes() {
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

    // После отображения всех блюд восстанавливаем визуальное состояние из localStorage
    restoreSelectedDishesVisuals();
}

// Восстановить визуальное состояние выбранных блюд
function restoreSelectedDishesVisuals() {
    const stored = localStorage.getItem('selectedDishes');
    if (!stored) return;

    try {
        const selectedDishes = JSON.parse(stored);

        Object.values(selectedDishes).forEach(dish => {
            if (dish && dish.keyword) {
                const dishElement = document.querySelector(`[data-dish="${dish.keyword}"]`);
                if (dishElement) {
                    dishElement.classList.add('selected');
                }
            }
        });
    } catch (err) {
        console.error('Ошибка при восстановлении визуального состояния:', err);
    }
}

function displayCategoryWithFilters(sectionClass, categoryDishes, title, filters) {
    const section = document.querySelector(`.${sectionClass}`);
    if (!section) {
        console.error(`Секция с классом ${sectionClass} не найдена`);
        return;
    }

    let filtersHTML = filters
        .map(filter => `<button class="filter-btn" data-filter="${filter.kind}">${filter.name}</button>`)
        .join('');

    section.innerHTML = `
    <h2>${title}</h2>
    <div class="filters">${filtersHTML}</div>
    <div class="dishes-grid" data-category="${sectionClass}"></div>
  `;

    const grid = section.querySelector('.dishes-grid');
    if (categoryDishes.length === 0) {
        grid.innerHTML = '<div class="no-dishes">Блюда не найдены</div>';
        return;
    }

    // Изначально показываем все блюда
    categoryDishes.forEach(dish => {
        const dishElement = createDishElement(dish);
        grid.appendChild(dishElement);
    });

    // Обработчики фильтров
    const filterButtons = section.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterKind = this.getAttribute('data-filter');
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const dishesToShow = filterKind === 'all' ?
                categoryDishes :
                categoryDishes.filter(dish => dish.kind === filterKind);

            grid.innerHTML = '';
            if (dishesToShow.length === 0) {
                grid.innerHTML = '<div class="no-dishes">Блюда не найдены</div>';
                return;
            }

            dishesToShow.forEach(dish => {
                const dishElement = createDishElement(dish);
                grid.appendChild(dishElement);
            });
        });
    });
}

function createDishElement(dish) {
    const dishDiv = document.createElement('div');
    dishDiv.className = 'dish';
    dishDiv.setAttribute('data-dish', dish.keyword);

    // Проверяем, выбрано ли это блюдо
    const stored = localStorage.getItem('selectedDishes');
    let isSelected = false;

    if (stored) {
        try {
            const selectedDishes = JSON.parse(stored);
            const categoryDish = selectedDishes[dish.category];
            isSelected = categoryDish && categoryDish.keyword === dish.keyword;
        } catch (err) {
            console.error('Ошибка при проверке выбора блюда:', err);
        }
    }

    if (isSelected) {
        dishDiv.classList.add('selected');
    }

    dishDiv.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <div class="price">${dish.price} руб.</div>
    <div class="name">${dish.name}</div>
    <div class="weight">${dish.count}</div>
    <button type="button" class="add-to-order">Выбрать</button>
  `;

    return dishDiv;
}

// Загрузка блюд и инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', async() => {
    await loadDishes();
    displayDishes();
    initializeOrderLogic(); // Инициализация логики заказа после загрузки блюд
});