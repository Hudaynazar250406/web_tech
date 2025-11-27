// api.js - полная версия с всеми функциями API
const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru';

// Функция для установки API ключа
function setApiKey(key) {
    localStorage.setItem('lunchProApiKey', key);
}

// Функция для получения API ключа
function getApiKey() {
    return localStorage.getItem('lunchProApiKey');
}

// Универсальная функция для API запросов
async function apiRequest(endpoint, options = {}) {
    const apiKey = getApiKey();
    
    if (!apiKey) {
        throw new Error('Для получения доступа к API необходимо пройти авторизацию. Для этого нужно передать в запросе персональный API Key.');
    }

    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${API_BASE_URL}${endpoint}${separator}api_key=${encodeURIComponent(apiKey)}`;

    const config = {
        ...options,
        headers: {
            ...(options.headers || {})
        }
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
        config.body = JSON.stringify(config.body);
        config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    }

    console.log('Making API request to:', url);
    console.log('Request method:', config.method || 'GET');

    const response = await fetch(url, config);

    if (!response.ok) {
        let errorMessage;
        try {
            const errorData = await response.json();
            errorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        } catch (e) {
            errorMessage = `HTTP error! status: ${response.status}`;
        }
        
        if (response.status === 401) {
            errorMessage = 'Неверный API ключ. Пожалуйста, проверьте ваш ключ.';
        }
        
        throw new Error(errorMessage);
    }

    try {
        return await response.json();
    } catch (e) {
        throw new Error('Invalid JSON response from server');
    }
}

// Загрузка всех блюд
async function loadDishes() {
    try {
        const dishesFromApi = await apiRequest('/labs/api/dishes');
        console.log('Received dishes:', dishesFromApi);
        
        const categoryMap = {
            'main-course': 'main',
            'salad': 'starter', 
            'drink': 'drink',
            'dessert': 'dessert',
            'soup': 'soup'
        };
        
        const transformedDishes = dishesFromApi.map(dish => ({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            count: dish.weight || dish.portion || '1 порция',
            image: dish.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKEoiBpbWFnZSA8L3RleHQ+PC9zdmc+',
            category: categoryMap[dish.category] || dish.category,
            kind: dish.type || 'default',
            keyword: dish.keyword || dish.name.toLowerCase().replace(/ /g, '-')
        }));
        
        return transformedDishes;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        throw new Error(`Не удалось загрузить меню: ${error.message}`);
    }
}

// Создание нового заказа
async function createOrder(orderData) {
    return await apiRequest('/labs/api/orders', {
        method: 'POST',
        body: orderData
    });
}

// Получение всех заказов пользователя
async function getOrders() {
    return await apiRequest('/labs/api/orders');
}

// Получение конкретного заказа
async function getOrder(orderId) {
    return await apiRequest(`/labs/api/orders/${orderId}`);
}

// Обновление заказа
async function updateOrder(orderId, orderData) {
    return await apiRequest(`/labs/api/orders/${orderId}`, {
        method: 'PUT',
        body: orderData
    });
}

// Удаление заказа
async function deleteOrder(orderId) {
    return await apiRequest(`/labs/api/orders/${orderId}`, {
        method: 'DELETE'
    });
}

// Получение данных конкретного блюда
async function getDish(dishId) {
    return await apiRequest(`/labs/api/dishes/${dishId}`);
}