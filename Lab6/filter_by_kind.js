let dishKinds = {
    starter: false,
    soup: false,
    mainCourse: false,
    drink: false,
    dessert: false
}

let previousClicked = "";
let previousContId = "";

function filterButtonAction(event) {
    let actionTarget = event.currentTarget;
    let actionTargetContainer = actionTarget.parentNode;
    let actionTargetContainerId = actionTargetContainer.id;
    let prodContainerId = "";
    let i = -1;
    while (actionTargetContainerId.at(i) != "_") {
        prodContainerId = actionTargetContainerId.at(i) + prodContainerId;
        i--;
    }
    if (dishKinds[prodContainerId] == false) {
        console.log(`button ${prodContainerId}-filter is clicked`);
        if (prodContainerId == previousContId) {
            previousClicked.style.backgroundColor = "transparent";
        }
        let prodContainer = document.getElementById(prodContainerId);
        for (let prod of prodContainer.children) {
            if (prod.getAttribute("data-kind") != actionTarget.getAttribute("data-kind")) {
                prod.style.display = "none";
            }
        }
        dishKinds[prodContainerId] = true;
        actionTarget.className = "kind_choice_btn_click";
        previousClicked = actionTarget;
        return;
    }
    if (dishKinds[prodContainerId] == true) {
        console.log(`button ${prodContainerId}-filter is UNclicked`);
        let prodContainer = document.getElementById(prodContainerId);
        for (let prod of prodContainer.children) {
            prod.style.display = "flex";
        }
        dishKinds[prodContainerId] = false;
        actionTarget.style.backgroundColor = "kind_choice_btn";
        return;
    }
}