// this script loads all of the dishes on the html page

document.addEventListener("DOMContentLoaded", function() {
    // preparing cards for loading into the form
    for (let dish of dishes_list) {
        let prodCard = document.createElement("div");
        prodCard.className = "product";
        prodCard.style.flexFlow = "column";
        prodCard.setAttribute("data-product", dish.keyword);

        let prodImg = document.createElement("img");
        prodImg.src = dish.image;

        let prodPrice = document.createElement("p");
        prodPrice.className = "price";
        prodPrice.innerHTML = String(dish.price) + " &#8381";

        let prodName = document.createElement("p");
        prodName.className = "prod_name";
        prodName.textContent = dish.name;

        let prodWeight = document.createElement("p");
        prodWeight.className = "weight";
        prodWeight.textContent = dish.weight;

        let addButton = document.createElement("button");
        addButton.className = "btn";
        addButton.textContent = "Добавить";

        addButton.addEventListener("click", addDishToOrder);

        prodCard.append(prodImg);
        prodCard.append(prodPrice);
        prodCard.append(prodName);
        prodCard.append(prodWeight);
        prodCard.append(addButton);

        // showing cards on html page
        let wrapper = document.getElementById(dish.category);
        wrapper.appendChild(prodCard);
    }
});