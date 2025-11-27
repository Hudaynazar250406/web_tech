// dishes_data.js - данные о блюдах для лабораторной работы 6

function Dish(keyword, name, price, category, count, image, kind) {
    this.keyword = keyword;
    this.name = name;
    this.price = price;
    this.category = category;
    this.count = count;
    this.image = image;
    this.kind = kind;
}

let dishesList = [
    // Супы
    new Dish("gazpacho", "Гаспачо", 195, "soup", "350 г", "images/soups/gazpacho.jpg", "veg"),
    new Dish("mushroom_soup", "Грибной суп-пюре", 185, "soup", "330 г", "images/soups/mushroom_soup.jpg", "veg"),
    new Dish("norwegian_soup", "Норвежский суп", 270, "soup", "300 г", "images/soups/norwegian_soup.jpg", "fish"),
    new Dish("ramen", "Рамен", 375, "soup", "425 г", "images/soups/ramen.jpg", "meat"),
    new Dish("tomyum", "Том ям с креветками", 650, "soup", "500 г", "images/soups/tomyum.jpg", "fish"),
    new Dish("chicken", "Куриный суп", 330, "soup", "350 г", "images/soups/chicken.jpg", "meat"),
    
    // Главные блюда
    new Dish("friedpotatoes", "Жареная картошка с грибами", 150, "main", "250 г", "images/main_course/friedpotatoeswithmushrooms1.jpg", "veg"),
    new Dish("lasagna", "Лазанья", 385, "main", "310 г", "images/main_course/lasagna.jpg", "meat"),
    new Dish("chickencutlets", "Котлеты из курицы с пюре", 225, "main", "280 г", "images/main_course/chickencutletsandmashedpotatoes.jpg", "meat"),
    new Dish("fishrice", "Рыбная котлета с рисом и спаржей", 320, "main", "270 г", "images/main_course/fishrice.jpg", "fish"),
    new Dish("pizza", "Пицца Маргарита", 450, "main", "470 г", "images/main_course/pizza.jpg", "meat"),
    new Dish("shrimppasta", "Паста с креветками", 340, "main", "280 г", "images/main_course/shrimppasta.jpg", "fish"),
    
    // Салаты
    new Dish("caesar", "Цезарь с цыпленком", 370, "salad", "220 г", "images/salads/caesar.jpg", "meat"),
    new Dish("caprese", "Капрезе с моцареллой", 350, "salad", "235 г", "images/salads/caprese.jpg", "veg"),
    new Dish("tunasalad", "Салат с тунцом", 480, "salad", "250 г", "images/salads/tunasalad.jpg", "fish"),
    new Dish("saladwithegg", "Корейский салат с овощами и яйцом", 330, "salad", "250 г", "images/salads/saladwithegg.jpg", "veg"),
    
    // Стартеры
    new Dish("frenchfries1", "Картофель фри с кетчупом", 280, "starter", "235 г", "images/starters/frenchfries1.jpg", "veg"),
    new Dish("frenchfries2", "Картофель фри с соусом", 260, "starter", "235 г", "images/starters/frenchfries2.jpg", "veg"),
    
    // Напитки
    new Dish("orangejuice", "Апельсиновый сок", 120, "drink", "300 мл", "images/drinks/orangejuice.jpg", "cold"),
    new Dish("applejuice", "Яблочный сок", 90, "drink", "300 мл", "images/drinks/applejuice.jpg", "cold"),
    new Dish("carrotjuice", "Морковный сок", 110, "drink", "300 мл", "images/drinks/carrotjuice.jpg", "cold"),
    new Dish("cappuccino", "Капучино", 180, "drink", "200 мл", "images/drinks/cappuccino.jpg", "hot"),
    new Dish("greentea", "Зеленый чай", 100, "drink", "200 мл", "images/drinks/greentea.jpg", "hot"),
    new Dish("tea", "Черный чай", 90, "drink", "200 мл", "images/drinks/tea.jpg", "hot"),
    
    // Десерты
    new Dish("baklava", "Пахлава", 220, "dessert", "300 г", "images/desserts/baklava.jpg", "medium"),
    new Dish("cheesecake", "Чизкейк", 240, "dessert", "125 г", "images/desserts/cheesecake.jpg", "small"),
    new Dish("chocolatecheesecake", "Шоколадный чизкейк", 260, "dessert", "125 г", "images/desserts/chocolatecheesecake.jpg", "small"),
    new Dish("chocolatecake", "Шоколадный торт", 270, "dessert", "140 г", "images/desserts/chocolatecake.jpg", "small"),
    new Dish("donuts3", "Пончики (3 штуки)", 410, "dessert", "350 г", "images/desserts/donuts_3.jpg", "medium"),
    new Dish("donuts6", "Пончики (6 штук)", 650, "dessert", "700 г", "images/desserts/donuts_6.jpg", "large")
];