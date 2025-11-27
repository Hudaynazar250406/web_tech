
# Создам инструкцию по структуре файлов для Lab6

structure = """
СТРУКТУРА ПАПКИ Lab6:
====================

Lab6/
├── index.html                          # Главная страница с выбором блюд
├── style.css                           # Основные стили
├── dishes_data.js                      # Данные о блюдах
├── dishes_display.js                   # Скрипт отображения блюд
├── order_validation.js                 # Скрипт валидации заказа
├── images/
│   ├── soups/
│   │   ├── gazpacho.jpg
│   │   ├── mushroom_soup.jpg
│   │   ├── norwegian_soup.jpg
│   │   ├── ramen.jpg
│   │   ├── tomyum.jpg
│   │   └── chicken.jpg
│   ├── main_course/
│   │   ├── friedpotatoeswithmushrooms1.jpg
│   │   ├── lasagna.jpg
│   │   ├── chickencutletsandmashedpotatoes.jpg
│   │   ├── fishrice.jpg
│   │   ├── pizza.jpg
│   │   └── shrimppasta.jpg
│   ├── salads/
│   │   ├── caesar.jpg
│   │   ├── caprese.jpg
│   │   ├── tunasalad.jpg
│   │   └── saladwithegg.jpg
│   ├── starters/
│   │   ├── frenchfries1.jpg
│   │   └── frenchfries2.jpg
│   ├── drinks/
│   │   ├── orangejuice.jpg
│   │   ├── applejuice.jpg
│   │   ├── carrotjuice.jpg
│   │   ├── cappuccino.jpg
│   │   ├── greentea.jpg
│   │   └── tea.jpg
│   └── desserts/
│       ├── baklava.jpg
│       ├── cheesecake.jpg
│       ├── chocolatecheesecake.jpg
│       ├── chocolatecake.jpg
│       ├── donuts_3.jpg
│       └── donuts_6.jpg

ФАЙЛЫ ДЛЯ СОЗДАНИЯ:
==================

1. index.html - HTML разметка
2. style.css - CSS стили в твоем стиле
3. dishes_data.js - данные блюд
4. dishes_display.js - отображение карточек
5. order_validation.js - валидация комбо

ВАЛИДНЫЕ КОМБО:
===============

1. Суп + Главное блюдо + Салат + Напиток
2. Суп + Главное блюдо + Напиток
3. Суп + Салат + Напиток
4. Главное блюдо + Салат + Напиток
5. Главное блюдо + Напиток

Десерт можно добавить к любому комбо.
Стартер (закуска) можно добавить к любому комбо.
"""

print(structure)
