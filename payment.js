const confirmButton = document.getElementById("confirmButton");
const exchangeContainer = document.getElementsByClassName("exchange");
const confirmContainer = document.getElementById("confirm-container"); 

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