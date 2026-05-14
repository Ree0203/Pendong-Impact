const confirmButton = document.getElementById("confirmButton");
const exchangeContainer = document.getElementsByClassName("exchange");
const confirmContainer = document.getElementById("confirm-container"); 
const paymentTypeButtons = document.getElementsByClassName("payment-type-buttons");
const gemsContainer = document.getElementById("cvsu-coins-amount-payment");
const coinsContainer = document.getElementById("3-coins-amount"); 

const priceContainer = document.getElementById("product-price")
const amountContainer = document.getElementById("product-description"); 


let coins; 
let price; 

for(let i = 0; i<paymentTypeButtons.length; i++) { 
    paymentTypeButtons[i].addEventListener("click", colorButton); 
}

function colorButton(event) { 
    for(let i = 0; i<paymentTypeButtons.length; i++){ 
        paymentTypeButtons[i].classList.remove("active-button"); 
    }

    event.target.classList.add("active-button")
}

confirmButton.addEventListener("click", hideConfirmContainer); 

function hideConfirmContainer() { 
    confirmContainer.style.display = "none"; 
}

function showConfirmContainer() { 
    confirmContainer.style.display = "flex"; 
}

console.log("hello world"); 

for(let i = 0; i<exchangeContainer.length; i++) { 
    exchangeContainer[i].addEventListener("click", function() { 

        coins = exchangeContainer[i].dataset.coins; 
        gems = exchangeContainer[i].dataset.price; 

        priceContainer.textContent = coins + " DASH 3 coins"; 
        amountContainer.textContent = "₱" + gems; 
        showConfirmContainer(); 
    }); 
}

let cvsuCoinsValue;
let cvsuGems; 

fetch('get_currency.php')
    .then(response=>response.json())    
    .then(data=> { 
        cvsuCoinsValue = data.coins; 
        cvsuGems = data.gems; 

        console.log("Coins: ", cvsuCoinsValue); 
        console.log("Gems: ", cvsuGems); 

        gemsContainer.textContent = cvsuGems; 
        coinsContainer.textContent = cvsuCoinsValue;
    });