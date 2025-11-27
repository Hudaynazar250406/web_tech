// storage.js - исправленная версия
const STORAGE_KEY = 'lunchOrder';

// Сохранение заказа в localStorage
function saveOrderToStorage(order) {
    try {
        const orderToSave = {};
        Object.keys(order).forEach(category => {
            if (order[category]) {
                orderToSave[category] = {
                    id: order[category].id,
                    keyword: order[category].keyword,
                    name: order[category].name,
                    price: order[category].price,
                    count: order[category].count,
                    image: order[category].image
                };
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orderToSave));
        console.log('Order saved to storage:', orderToSave);
        return true;
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
        return false;
    }
}

// Загрузка заказа из localStorage
function loadOrderFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return {};
        
        const parsed = JSON.parse(stored);
        console.log('Order loaded from storage:', parsed);
        return parsed;
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        return {};
    }
}

// Очистка заказа из localStorage
function clearOrderFromStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Order cleared from storage');
        return true;
    } catch (error) {
        console.error('Ошибка очистки localStorage:', error);
        return false;
    }
}

// Получение полного заказа
function getFullOrder() {
    return loadOrderFromStorage();
}

// Подсчет общей стоимости заказа
function calculateOrderTotal(order) {
    if (!order || Object.keys(order).length === 0) return 0;
    
    const total = Object.values(order).reduce((total, dish) => {
        return total + (dish && dish.price ? dish.price : 0);
    }, 0);
    
    console.log('Calculated order total:', total);
    return total;
}

// Подсчет количества блюд в заказе
function countOrderItems(order) {
    if (!order || Object.keys(order).length === 0) return 0;
    
    const count = Object.values(order).filter(dish => dish !== null && dish !== undefined).length;
    console.log('Counted order items:', count);
    return count;
}