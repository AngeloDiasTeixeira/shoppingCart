var removeButtons = document.getElementsByClassName("cartItemRemove");
for (var i = 0; i < removeButtons.length; i++) {
    var removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeItem);
}

function removeItem(event) {
    var removeButton = event.target;
    removeButton.parentElement.remove();
    updateCart();
}

function updateCart() {
    var cartItems = document.getElementsByClassName("cartItem");
    var cartTotal = 0;
    for (var i = 0; i < cartItems.length; i++) {
        cartRowUpdate(cartItems[i]);
        cartTotal += parseFloat(cartItems[i].getElementsByClassName("cartRowTotalValue")[0].innerText.replace("€", ""));
    }
    document.getElementsByClassName("cartItems")[0].getElementsByClassName("cartItemsTotalValue")[0].innerText = `${cartTotal}€`;
}

function cartRowUpdate() {
    var cartItem = arguments[0];
    var quantity = cartItem.getElementsByClassName("cartItemQuantity")[0].value;
    var eP = cartItem.getElementsByClassName("cartItemPrice")[0];
    var price = parseFloat(eP.innerText.replace('€', ''));
    var rowValue = cartItem.getElementsByClassName("cartRowTotalValue")[0];
    rowValue.innerText = (quantity * price) + "€";
}

var quantities = document.getElementsByClassName("cartItemQuantity");
for (var i = 0; i < quantities.length; i++) {
    var quantity = quantities[i];
    quantity.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
    var quantity = event.target;
    if (isNaN(quantity.value) || quantity.value <= 0)
        quantity.value = 1;
    updateCart();
}

var addToCartButtons = document.getElementsByClassName("addToCartButton");
for (var i = 0; i < addToCartButtons.length; i++) {
    var addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartButtonClicked);
}

function addToCartButtonClicked(event) {
    var addToCartButton = event.target;
    var itemImageSource = addToCartButton.parentElement.getElementsByClassName("itemForSaleImage")[0].src;
    var itemName = addToCartButton.parentElement.getElementsByClassName("itemForSaleName")[0].innerText;
    var itemPrice = addToCartButton.parentElement.getElementsByClassName("itemForSalePrice")[0].innerText;
    addItemToCart(itemImageSource, itemName, itemPrice);
}

function addItemToCart(itemImageSource, itemName, itemPrice) {
    var v = document.getElementsByClassName("cartItemsRow")[0].getElementsByClassName("cartItem");
    for (var i = 0; i < v.length; i++)
        if (itemName == v[i].getElementsByClassName("cartItemName")[0].innerText) {
            alert("Item already on cart!");
            return;
        }
    var cartItem = document.createElement("div");
    var cartItemContent =
        `<img class="cartItemImage" src="${itemImageSource}">
        <span class="cartItemName">${itemName}</span>
        <span class="cartItemPrice">${itemPrice}</span>
        <input class="cartItemQuantity" type="number" value=1>
        <span class="cartRowTotalValue">${itemPrice}</span>
        <button class="cartItemRemove">Remove</button>`
    cartItem.innerHTML = cartItemContent;
    cartItem.classList.add("cartItem");
    cartItem.getElementsByClassName("cartItemRemove")[0].addEventListener("click", removeItem);
    cartItem.getElementsByClassName("cartItemQuantity")[0].addEventListener("change", quantityChanged);
    document.getElementsByClassName("cartItemsRow")[0].appendChild(cartItem);
    updateCart();
}

var purchase = document.getElementsByClassName("purchase")[0];
purchase.addEventListener("click", purchaseFunction);

function purchaseFunction(){
    alert("Thank you for your purchase!");
    var cartItems = document.getElementsByClassName("cartItem");
    for(var i=0; i<cartItems.length; i++){
        cartItems[i].remove();
        i--;
    }
    updateCart();
}