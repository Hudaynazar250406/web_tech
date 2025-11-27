// this script loads all of the dishes on the html page
function turnDishToCard(dish) {
    let prodCard = document.createElement("div");
    prodCard.className = "product";
    prodCard.style.flexFlow = "column";
    prodCard.setAttribute("data-product", dish.keyword);
    prodCard.setAttribute("data-kind", dish.kind);

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

    return prodCard;

}

document.addEventListener("DOMContentLoaded", function() {
    // adding event listeners to the filtering buttons
    let filterButtons = document.getElementsByClassName("kind_choice_btn");
    for (let fltButton of filterButtons) {
        fltButton.addEventListener("click", filterButtonAction)
        fltButton.addEventListener("mouseover", function() {
            fltButton.style.backgroundColor = "rgb(200, 255, 190)";
        })
        fltButton.addEventListener("mouseout", function() {
            fltButton.style.backgroundColor = "transparent";
        })
    }
    // preparing cards for loading into the form
    for (let dish of dishes_list) {
        prodCard = turnDishToCard(dish);

        // showing cards on html page
        let wrapper = document.getElementById(dish.category);
        wrapper.appendChild(prodCard);
    }
});