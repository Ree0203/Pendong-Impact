const confirmButton = document.getElementById("confirmButton");
const exchangeContainer = document.getElementsByClassName("exchange");
const confirmContainer = document.getElementById("confirm-container"); 
const paymentTypeButtons = document.getElementsByClassName("payment-type-buttons");
const gemsContainer = document.getElementById("cvsu-coins-amount-payment");
const coinsContainer = document.getElementById("3-coins-amount"); 
const confirmOuterContainer = document.getElementById("confirm-outer"); 

const priceContainer = document.getElementById("product-price")
const amountContainer = document.getElementById("product-description"); 

const confirmBack = document.getElementById("payment-x"); 

const purchaseButton = document.getElementById("purchase-button"); 
let coins; 
let price; 
let gems = 0; 



const xButton = document.getElementById("x-icon"); 

xButton.addEventListener("click", function() { 
<<<<<<< HEAD
    if(document.referrer){ 
        window.location.href = document.referrer
    } else { 
        window.location.href = "homepage.html"
    }
}); 
=======
    window.history.back(); 
});

window.addEventListener('pageshow',(e) => {
  if (e.persisted) window.location.reload();
});
>>>>>>> 36a56b70abf6b7a54268cfc8611131871ef71003

confirmBack.addEventListener("click", hideConfirmContainer); 

for(let i = 0; i<paymentTypeButtons.length; i++) { 
    paymentTypeButtons[i].addEventListener("click", colorButton); 
}

function colorButton(event) { 
    for(let i = 0; i<paymentTypeButtons.length; i++){ 
        paymentTypeButtons[i].classList.remove("active-button"); 
    }

    event.target.classList.add("active-button");
}

confirmButton.addEventListener("click", hideConfirmContainer); 

function hideConfirmContainer() { 
    confirmOuterContainer.style.display = "none"; 
    confirmContainer.classList.remove("fade-in"); 
}

function showConfirmContainer() { 
    confirmOuterContainer.style.display = "block"; 

    setTimeout(() => { 
        confirmContainer.classList.add("fade-in"); 
    }, 10);
}

console.log("hello world"); 

for(let i = 0; i<exchangeContainer.length; i++) { 
    exchangeContainer[i].addEventListener("click", function() { 

        coins = exchangeContainer[i].dataset.coins; 
        price = exchangeContainer[i].dataset.price; 

        priceContainer.textContent = coins + " DASH 3 coins"; 
        amountContainer.textContent = "₱" + price; 

        showConfirmContainer(); 
    }); 
}

let cvsuCoinsValue;
let cvsuGems; 

getCurrency(); 

function getCurrency() { 
    fetch('get_currency.php', {method: 'POST'})
        .then(response=>response.json())    
        .then(data=> { 
            cvsuCoinsValue = data.coins; 
            cvsuGems = data.gems; 

            console.log("Coins: ", cvsuCoinsValue); 
            console.log("Gems: ", cvsuGems); 

            gemsContainer.textContent = cvsuGems; 
            coinsContainer.textContent = cvsuCoinsValue;
    });
}

purchaseButton.addEventListener("click", function() { 
    purchaseCoins(coins, gems);
}); 

function purchaseCoins(coins, gems) { 

    fetch('update_currency.php', { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            coins: coins,
            gems: gems,
            pity: 0
        })
    })
    .then(response => response.json())
    .then(data => { 

        if(data.status === "success") { 
            console.log("Purchased " + coins + " coins"); 
            getCurrency(); 
        } else { 
            alert("error"); 
        }
    })
}

fetch('check_session.php', {method: 'POST'})
.then(response => response.json())
.then(loggedIn => {
    if(!loggedIn.loggedIn) { 
        window.location.replace('login.html')
    }
})
.catch((error) => console.error(error));
