// this script works with the form

// flags to check wether we need to simply increase total sum
// or to substract previous price from it
let dishesWereAdded = {
    soup: false,
    mainCourse: false,
    drink: false,
    dessert: false,
    starter: false
}

// previous dish choice storages
let previousDishes = {
    soup: null,
    mainCourse: null,
    drink: null,
    dessert: null,
    starter: null
}

// previous prices of dishes
let previousDishesPrices = {
    soup: null,
    mainCourse: null,
    drink: null,
    dessert: null,
    starter: null
}

// total sum of order
let totalSum = 0;

// this function hides element with "nothing chosen" id
function hideNothingChosen() {
    let nothingChosen = document.getElementById("nothing_chosen");
    if (nothingChosen == null) {
        console.log("element with id 'nothing_chosen' was not found");
    }
    else {
        nothingChosen.style.display = "none";
    }
}

// this function shows all chosen dishes in order field
function showDishes() {
    let dishesInOrder = document.getElementsByClassName("dishes_select");
    for (let elem of dishesInOrder) {
        elem.style.display = "block";
    }
}

// this function adds new information about chosen dishes after every button click
function addDishToOrder(event) {
    let actionTarget = event.currentTarget.parentNode;

    // highlighting chosen dishes
    if (previousDishes[actionTarget.parentNode.id] != null) {
        previousDishes[actionTarget.parentNode.id].className = "product";
        console.log(`element ${previousDishes[actionTarget.parentNode.id].parentNode.id} has different class ${previousDishes[actionTarget.parentNode.id].className}`);
    }
    actionTarget.className = "product_clicked";
    console.log(`element ${actionTarget.parentNode.id} has different class ${actionTarget.className}`);
    previousDishes[actionTarget.parentNode.id] = actionTarget;

    showDishes();
    hideNothingChosen();

    let shownDishInOrder = document.getElementById("chosen_" + actionTarget.parentNode.id);
    shownDishInOrder.innerHTML = actionTarget.children[2].textContent + " " + actionTarget.children[1].textContent;

    // turning text content of an element that represents price into a number
    let prod_price = "";
    let prodPriceString = actionTarget.children[1].textContent;
    let i = 0;
    while (!(prodPriceString[i] === " ")) {
        prod_price = prod_price + prodPriceString[i];
        i++;
    }
    prod_price = Number(prod_price);

    // changing total sum 
    if (dishesWereAdded[actionTarget.parentNode.id] === false) {
        dishesWereAdded[actionTarget.parentNode.id] = true;
        totalSum += prod_price;
        previousDishesPrices[actionTarget.parentNode.id] = prod_price;
    }
    else {
        totalSum -= previousDishesPrices[actionTarget.parentNode.id];
        totalSum += prod_price;
        previousDishesPrices[actionTarget.parentNode.id] = prod_price;
    }
    document.getElementById("total_sum").innerHTML = String(totalSum) + " &#8381";

    // adding information about total sum and dish parameters onto html page
    document.getElementById("total_sum_input").value = totalSum;
    document.getElementById(actionTarget.parentNode.id + "_choice_input").value = actionTarget.getAttribute("data-product");
}

// setting action on reset button click
let resetButton = document.getElementById("reset_btn");
resetButton.addEventListener("click", function() {
    // setting all input fields to their default values
    for (let key in previousDishes) {
        document.getElementById(key+"_choice_input").value = "was not set";
    }

    // setting defualt phrases to chosen dishes fields
    document.getElementById("total_sum").innerHTML = "0 &#8381";

    for (let key in previousDishes) {
        document.getElementById("chosen_"+key).innerHTML = "Пока ничего нет";
    }

    // hiding chosen dishes fields
    let dishesInOrder = document.getElementsByClassName("dishes_select");
    for (let elem of dishesInOrder) {
        elem.style.display = "none";
    }

    // making element with id "nothing_chosen" visible
    document.getElementById("nothing_chosen").style.display = "block";

    // setting all global variables in this to their default values
    for (let key in dishesWereAdded) {
        dishesWereAdded[key] = false;
    } 
    totalSum = 0;
    for (let key in previousDishesPrices) {
        previousDishesPrices[key] = 0;
    }
    for (let key in previousDishes) {
        if (previousDishes[key] != null) {
            previousDishes[key].className = "product";
        }
    }
    for (let key in previousDishes) {
        previousDishes[key] = null;
    }
})