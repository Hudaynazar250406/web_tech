// soups
let gaspacho = {
    keyword: "gaspacho",
    name: "Гаспачо",
    price: 195,
    category: "soup",
    weight: "350 г",
    image: "menu/soups/gazpacho.jpg"
}

let mushroom_soup = {
    keyword: "mushroom_soup",
    name: "Грибной суп-пюре",
    price: 185,
    category: "soup",
    weight: "330 г",
    image: "menu/soups/mushroom_soup.jpg"
}

let norway_soup = {
    keyword: "norway_soup",
    name: "Норвежский суп",
    price: 270,
    category: "soup",
    weight: "300 г",
    image: "menu/soups/norwegian_soup.jpg"
}

// main course dishes
let fried_potatoes = {
    keyword: "fried_potatoes",
    name: "Жаренная картошка с грибами",
    price: 150,
    category: "main_course",
    weight: "250 г",
    image: "menu/main_course/friedpotatoeswithmushrooms1.jpg"
}

let lasagna = {
    keyword: "lasagna",
    name: "Лазанья",
    price: 385,
    category: "main_course",
    weight: "310 г",
    image: "menu/main_course/lasagna.jpg"
}

let meat_balls = {
    keyword: "meat_balls",
    name: "Котлеты из курицы с картофельным пюре",
    price: 225,
    category: "main_course",
    weight: "280 г",
    image: "menu/main_course/chickencutletsandmashedpotatoes.jpg"
}

// drinks
let apple_juice = {
    keyword: "apple_juice",
    name: "Яблочный сок",
    price: 120,
    category: "drink",
    weight: "300 мл",
    image: "menu/drinks/applejuice.jpg"
}

let carrot_juice = {
    keyword: "carrot_juice",
    name: "Морковный сок",
    price: 90,
    category: "drink",
    weight: "300 мл",
    image: "menu/drinks/carrotjuice.jpg"
}

let orange_juice = {
    keyword: "orange_juice",
    name: "Апельсиновый сок",
    price: 110,
    category: "drink",
    weight: "300 мл",
    image: "menu/drinks/orangejuice.jpg"
}

let dishes_list = [gaspacho, norway_soup, mushroom_soup, fried_potatoes, lasagna, meat_balls, apple_juice, orange_juice, carrot_juice];

// sorting dishes by their names inside their categories
dishes_list.sort((a, b) => {
    if (a.category === b.category) {
        return a.name.localeCompare(b.name); 
    }
});