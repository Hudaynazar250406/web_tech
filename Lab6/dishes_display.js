// dishes_display.js - скрипт отображения блюд на странице

// Функция создания карточки блюда
function createDishCard(dish) {
    let card = document.createElement("div");
    card.className = "product";
    card.setAttribute("data-dish", dish.keyword);
    card.setAttribute("data-category", dish.category);
    
    let img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;
    
    let price = document.createElement("p");
    price.className = "price";
    price.textContent = dish.price + " ₽";
    
    let name = document.createElement("p");
    name.className = "prod_name";
    name.textContent = dish.name;
    
    let count = document.createElement("p");
    count.className = "weight";
    count.textContent = dish.count;
    
    let button = document.createElement("button");
    button.className = "btn";
    button.textContent = "Добавить";
    button.addEventListener("click", function(event) {
        event.stopPropagation();
        addDishToOrder(dish);
    });
    
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(name);
    card.appendChild(count);
    card.appendChild(button);
    
    return card;
}

// Функция отображения всех блюд по категориям
function displayDishes() {
    let soups = document.getElementById("soups");
    let mains = document.getElementById("main-courses");
    let salads = document.getElementById("salads");
    let starters = document.getElementById("starters");
    let drinks = document.getElementById("drinks");
    let desserts = document.getElementById("desserts");
    
    dishesList.forEach(dish => {
        let card = createDishCard(dish);
        
        switch(dish.category) {
            case "soup":
                soups.appendChild(card);
                break;
            case "main":
                mains.appendChild(card);
                break;
            case "salad":
                salads.appendChild(card);
                break;
            case "starter":
                starters.appendChild(card);
                break;
            case "drink":
                drinks.appendChild(card);
                break;
            case "dessert":
                desserts.appendChild(card);
                break;
        }
    });
}

// Объект для хранения текущего заказа
let currentOrder = {
    soup: null,
    main: null,
    salad: null,
    starter: null,
    drink: null,
    dessert: null
};

// Функция добавления блюда в заказ
function addDishToOrder(dish) {
    let category = dish.category;
    
    // Убираем выделение с предыдущего блюда этой категории
    if (currentOrder[category]) {
        let prevCard = document.querySelector(`[data-dish="${currentOrder[category].keyword}"]`);
        if (prevCard) {
            prevCard.classList.remove("product_clicked");
        }
    }
    
    // Добавляем новое блюдо
    currentOrder[category] = dish;
    
    // Выделяем карточку
    let card = document.querySelector(`[data-dish="${dish.keyword}"]`);
    card.classList.add("product_clicked");
    
    // Обновляем отображение заказа
    updateOrderDisplay();
}

// Функция обновления отображения заказа
function updateOrderDisplay() {
    let categories = ["soup", "main", "salad", "starter", "drink", "dessert"];
    let categoryNames = {
        "soup": "Суп",
        "main": "Главное блюдо",
        "salad": "Салат",
        "starter": "Стартер",
        "drink": "Напиток",
        "dessert": "Десерт"
    };
    
    let totalPrice = 0;
    
    categories.forEach(category => {
        let orderItem = document.getElementById(`order-${category}`);
        
        if (currentOrder[category]) {
            let dish = currentOrder[category];
            orderItem.innerHTML = `
                <p class="order-label"><strong>${categoryNames[category]}:</strong> ${dish.name} (${dish.price} ₽)</p>
            `;
            orderItem.classList.add("selected");
            totalPrice += dish.price;
        } else {
            orderItem.innerHTML = `
                <p class="order-label">${categoryNames[category]} не выбран${category === 'main' || category === 'dessert' || category === 'starter' ? 'о' : ''}</p>
            `;
            orderItem.classList.remove("selected");
        }
    });
    
    document.getElementById("total-sum").textContent = totalPrice;
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    displayDishes();
});