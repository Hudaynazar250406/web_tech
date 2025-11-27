// Выбранные блюда
let selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

// Возможные комбо
const validCombos = [
    ['soup', 'main', 'salad', 'drink'],
    ['soup', 'main', 'drink'],
    ['soup', 'salad', 'drink'],
    ['main', 'salad', 'drink'],
    ['main', 'drink']
];

// Обработчик выбора блюда
document.querySelectorAll('.dish-card').forEach(card => {
    card.addEventListener('click', function() {
        const type = this.dataset.type;
        const name = this.dataset.name;

        // Снять выделение с других карточек того же типа
        document.querySelectorAll(`.dish-card[data-type="${type}"]`).forEach(c => {
            c.classList.remove('selected');
        });

        // Выделить текущую карточку
        this.classList.add('selected');

        // Сохранить выбор
        selectedDishes[type] = name;

        // Обновить заголовок формы
        updateFormTitle();
    });
});

// Обновление заголовка формы
function updateFormTitle() {
    const formTitle = document.querySelector('.form-section h2');
    const selected = Object.values(selectedDishes).filter(v => v !== null).length;

    if (selected === 0) {
        formTitle.textContent = 'Ничего не выбрано';
        formTitle.style.color = '#ff6b35';
    } else {
        formTitle.textContent = `Выбрано блюд: ${selected}`;
        formTitle.style.color = '#333';
    }
}

// Проверка комбо
function validateCombo() {
    // Получить выбранные типы блюд (не включая десерт)
    const selectedTypes = Object.keys(selectedDishes)
        .filter(type => type !== 'dessert' && selectedDishes[type] !== null);

    // Проверить, соответствует ли выбор одному из комбо
    for (let combo of validCombos) {
        if (arraysEqual(selectedTypes.sort(), combo.sort())) {
            return { valid: true };
        }
    }

    // Определить, какие блюда отсутствуют
    return { valid: false, missing: getMissingDishes(selectedTypes) };
}

// Сравнение массивов
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Определение отсутствующих блюд
function getMissingDishes(selectedTypes) {
    if (selectedTypes.length === 0) {
        return 'nothing';
    }

    const hasMain = selectedTypes.includes('main');
    const hasSoup = selectedTypes.includes('soup');
    const hasSalad = selectedTypes.includes('salad');
    const hasDrink = selectedTypes.includes('drink');

    // Выбраны все необходимые блюда, кроме напитка
    if (!hasDrink && (selectedTypes.length >= 1)) {
        return 'drink';
    }

    // Выбран суп, но не выбраны главное блюдо/салат/стартер
    if (hasSoup && !hasMain && !hasSalad && hasDrink) {
        return 'main-or-salad';
    }

    // Выбран салат/стартер, но не выбраны суп/главное блюдо
    if (hasSalad && !hasSoup && !hasMain && hasDrink) {
        return 'soup-or-main';
    }

    // Выбран напиток/десерт
    if (hasDrink && !hasMain && !hasSoup && !hasSalad) {
        return 'main';
    }

    return 'unknown';
}

// Показать уведомление
function showNotification(type) {
    const messages = {
        'nothing': 'Ничего не выбрано. Выберите блюда для заказа',
        'drink': 'Выберите напиток',
        'main-or-salad': 'Выберите главное блюдо/салат/стартер',
        'soup-or-main': 'Выберите суп или главное блюдо',
        'main': 'Выберите главное блюдо',
        'unknown': 'Выберите корректную комбинацию блюд'
    };

    const message = messages[type] || messages['unknown'];

    // Создать overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // Создать уведомление
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <h3>${message}</h3>
        <button class="notification-btn">Окей 👌</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(notification);

    // Обработчик закрытия
    const closeNotification = () => {
        overlay.remove();
        notification.remove();
    };

    notification.querySelector('.notification-btn').addEventListener('click', closeNotification);
    overlay.addEventListener('click', closeNotification);
}

// Обработчик отправки формы
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const validation = validateCombo();

    if (!validation.valid) {
        showNotification(validation.missing);
        return;
    }

    // Если всё ок, отправить форму
    alert('Заказ успешно оформлен! 🎉');

    // Сброс формы и выбора
    this.reset();
    document.querySelectorAll('.dish-card').forEach(card => {
        card.classList.remove('selected');
    });
    selectedDishes = {
        soup: null,
        main: null,
        salad: null,
        drink: null,
        dessert: null
    };
    updateFormTitle();
});
ы