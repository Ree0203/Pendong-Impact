const confirmButton = document.getElementById("confirmButton");
const exchangeContainer = document.getElementsByClassName("exchange");
const confirmContainer = document.getElementById("confirm-container"); 
const paymentTypeButtons = document.getElementsByClassName("payment-type-buttons");


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
    exchangeContainer[i].addEventListener("click", showConfirmContainer); 
}

