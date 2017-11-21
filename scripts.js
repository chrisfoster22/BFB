const chosen = {
    recipient: "",
    "focus-area": "",
    "product": "",
    "scent": [],
    "oil": [],
    "butter": [],
    "booster": []
}

let currentStep = 0;

const steps = ["recipient", "focus-area", "product", "scent", "oil", "butter", "booster"]


populateAllProducts(allProducts);
populateScents(products.options.scents);
populateOils(products.options.oils);
populateButters(products.options.butters);
populateBoosters(products.options.boosters);

const bath = document.getElementById("bath");
const outdoor = document.getElementById("outdoor");
const faceMouth = document.getElementById("faceMouth");
const bodyDiv = document.getElementById("body");

registerListeners();
personChosen();
showCurrentStep();

function registerListeners() {
    registerIconListeners();
}

function registerIconListeners() {
    steps.forEach(function(step) {
        [].forEach.call(document.getElementsByClassName(step), function(div) {
            div.addEventListener("click", function(e) {
                chooseItem(step, e.target.id)
                // registerUnchooseListener(e);
            });
        });
    })
}

function chooseItem(step, selected) {
    if (typeof chosen[step] === "object") {
        chosen[step].push(selected);
        populateIngredients(step);
        document.getElementById(selected).style.backgroundColor = "green";
    } else {
        console.log(step);
        chosen[step] = selected;
        [].forEach.call(document.getElementsByClassName(step), function(div) {
            div.style.backgroundColor = "white";
        })
        document.getElementById(selected).style.backgroundColor = "green";
    }
    if (steps[(currentStep - 1)] !== step) {
        currentStep += 1;
    }
    showCurrentStep();
    if (chosen.product !== "") {
        document.getElementById("ingredientsHeading").innerHTML = "Ingredients: Custom " + chosen.product;
    }
}

function showCurrentStep() {
    [].forEach.call(document.getElementsByClassName(steps[currentStep]), function(div) {
        div.style.opacity = 1;
        div.style.pointerEvents = "initial";
        switch(div.className.split(" ")[1]) {
            case "recipient":
                chosen.recipient === "dog" ? dogChosen() : personChosen();
                break;
            case "product":
                let options = products.products[chosen.recipient][chosen["focus-area"]]
                if (options.indexOf(div.id) === -1) {
                    div.style.opacity = .2;
                    div.style.pointerEvents = "none";
                }
                break;
        }
    });
}

function populateIngredients(category) {
    let list = document.getElementById((category + "List"));
    list.innerHTML = "";
    chosen[category].forEach(function(item) {
        let li = document.createElement("li");
        li.innerHTML = item;
        list.append(li);
    })
}

function dogChosen() {
    "hello!"
    faceMouth.style.backgroundImage = 'url("images/focus-area/dog/Dog_Head_Face_Vector_SVG.svg")'
    bodyDiv.style.backgroundImage = 'url("images/focus-area/dog/Dog_Body_Vector_SVG.svg")'
}

function personChosen() {
    bath.style.backgroundImage = 'url("images/focus-area/human/Bathtub_Bubble_Icon_SVG.svg")'
    outdoor.style.backgroundImage = 'url("images/focus-area/human/Outdoors_Icon_SVG.svg")'
    faceMouth.style.backgroundImage = 'url("images/focus-area/human/Female_Head_Face_Icon_SVG.svg")'
    bodyDiv.style.backgroundImage = 'url("images/focus-area/human/Female_Body_Icon_SVG.svg")'
}

function populateAllProducts(allProducts) {
    let productListDiv = document.getElementsByClassName("product-list")[0];
    allProducts.forEach((product) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = product;
        newDiv.id = product
        newDiv.className = "icon product";
        productListDiv.append(newDiv);
    })
}

function populateScents(items) {
    let scentListDiv = document.getElementsByClassName("scent-list")[0];
    items.forEach((product) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = product;
        newDiv.id = product
        newDiv.className = "icon scent";
        scentListDiv.append(newDiv);
    })
}
function populateOils(items) {
    let oilListDiv = document.getElementsByClassName("oil-list")[0];
    items.forEach((product) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = product;
        newDiv.id = product
        newDiv.className = "icon oil";
        oilListDiv.append(newDiv);
    })
}
function populateButters(items) {
    let scentListDiv = document.getElementsByClassName("butter-list")[0];
    items.forEach((product) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = product;
        newDiv.id = product
        newDiv.className = "icon butter";
        scentListDiv.append(newDiv);
    })
}
function populateBoosters(items) {
    let scentListDiv = document.getElementsByClassName("booster-list")[0];
    items.forEach((product) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = product;
        newDiv.id = product
        newDiv.className = "icon booster";
        scentListDiv.append(newDiv);
    })
}
