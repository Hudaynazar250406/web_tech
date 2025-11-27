// dishes.js

// Глобальный массив для работы сайта
const dishes = [];

// Загрузка блюд с сервера
async function loadDishes() {
  try {
      const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
      if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
      }
      const fetchedDishes = await response.json();

      // Только блюда из API, никаких localDishes!
      dishes.length = 0;
      dishes.push(...fetchedDishes);

      if (typeof displayDishes === 'function') {
          displayDishes();
      }

  } catch (err) {
      console.error('Ошибка при загрузке блюд:', err);
      // Блюда не отображаем, так как отображение localDishes запрещено
  }
}

document.addEventListener('DOMContentLoaded', loadDishes);
