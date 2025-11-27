function Dish(keyword, name, price, category, weight, image, kind) {
    this.keyword = keyword,
    this.name = name, 
    this.price = price, 
    this.category = category,
    this.weight = weight,
    this.image = image;
    this.kind = kind;
}

let dishes_list = [
    new Dish("gaspacho", "Гаспачо", 195, "soup", "350 г", "menu/soups/gazpacho.jpg", "veg"),
    new Dish("mushroom_soup", "Грибной суп-пюре", 185, "soup", "330 г", "menu/soups/mushroom_soup.jpg", "veg"),
    new Dish("norway_soup", "Норвежский суп", 270, "soup", "300 г", "menu/soups/norwegian_soup.jpg", "fish"),
    new Dish("ramen", "Рамен", 270, "soup", "425 г", "menu/soups/ramen.jpg", "meat"),
    new Dish("tom_yam", "Том ям с креветками", 650, "soup", "500 г", "menu/soups/tomyum.jpg", "fish"),
    new Dish("chicken_soup", "Куриный суп", 330, "soup", "350 г", "menu/soups/chicken.jpg", "meat"),

    new Dish("fried_potatoes", "Жаренная картошка с грибами", 150, "mainCourse", "250 г", "menu/main_course/friedpotatoeswithmushrooms1.jpg", "veg"),
    new Dish("lasagna", "Лазанья", 385, "mainCourse", "310 г", "menu/main_course/lasagna.jpg", "meat"),
    new Dish("meat_balls", "Котлеты из курицы с картофельным пюре", 225, "mainCourse", "280 г", "menu/main_course/chickencutletsandmashedpotatoes.jpg", "meat"),
    new Dish("fish_balls", "Рыбная котлета с рисом и спаржей", 320, "mainCourse", "270 г", "menu/main_course/fishrice.jpg", "fish"),
    new Dish("pizza", "Пицца Маргарита", 450, "mainCourse", "470 г", "menu/main_course/pizza.jpg", "veg"),
    new Dish("shrimp_pasta", "Паста с креветками", 340, "mainCourse", "280 г", "menu/main_course/shrimppasta.jpg", "fish"),

    new Dish("apple_juice", "Яблочный сок", 120, "drink", "300 мл", "menu/drinks/applejuice.jpg", "cold"),
    new Dish("carrot_juice", "Морковный сок", 90, "drink", "300 мл", "menu/drinks/carrotjuice.jpg", "cold"),
    new Dish("orange_juice", "Апельсиновый сок", 110, "drink", "300 мл", "menu/drinks/orangejuice.jpg", "cold"),
    new Dish("cappuchino", "Каппучино", 180, "drink", "300 мл", "menu/drinks/cappuccino.jpg", "hot"),
    new Dish("green_tea", "Зеленый чай", 100, "drink", "300 мл", "menu/drinks/greentea.jpg", "hot"),
    new Dish("black_tea", "Черный чай", 90, "drink", "300 мл", "menu/drinks/tea.jpg", "hot"),

    new Dish("corean_salad", "Корейский салат с овощами и яйцом", 330, "starter", "250 г", "menu/starters/saladwithegg.jpg", "veg"),
    new Dish("caesar_salad", "Цезарь с ципленком", 370, "starter", "220 г", "menu/starters/caesar.jpg", "meat"),
    new Dish("caprese", "Капрезе с моцареллой", 350, "starter", "235 г", "menu/starters/caprese.jpg", "veg"),
    new Dish("tuna_salad", "Салат с тунцом", 480, "starter", "250 г", "menu/starters/tunasalad.jpg", "fish"),
    new Dish("fries_caesar", "Картофель фри с соусом цезарь", 280, "starter", "235 г", "menu/starters/frenchfries1.jpg", "veg"),
    new Dish("fries_ketchup", "Картофель фри с кетчупом", 260, "starter", "235 г", "menu/starters/frenchfries2.jpg", "veg"),

    new Dish("baklava", "Пахлава", 220, "dessert", "300 г", "menu/desserts/baklava.jpg", "middle"),
    new Dish("chesecake", "Чизкейк", 240, "dessert", "125 г", "menu/desserts/cheesecake.jpg", "small"),
    new Dish("choco_chesecake", "Шоколадный чизкейк", 260, "dessert", "125 г", "menu/desserts/chocolatecheesecake.jpg", "small"),
    new Dish("choco_cake", "Шоколадный торт", 270, "dessert", "140 г", "menu/desserts/chocolatecake.jpg", "small"),
    new Dish("donats_3_pieces", "Пончики (3 штуки)", 410, "dessert", "350 г", "menu/desserts/donuts_3.jpg", "middle"),
    new Dish("donats_6_pieces", "Пончики (6 штук)", 650, "dessert", "700 г", "menu/desserts/donuts_6.jpg", "large")
];

// sorting dishes by their names inside their categories
dishes_list.sort((a, b) => {
    if (a.category === b.category) {
        if (a.kind === b.kind) {
            return a.name.localeCompare(b.name);
        }
        else {
            return a.kind.localeCompare(b.kind);
        }
    }
});