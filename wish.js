document.addEventListener("DOMContentLoaded", function() { 
    console.log("hello world"); 

    const cvsucoins = document.getElementById("cvsu-coins-amount"); 
    const coins3 = document.getElementById("3-coins-amount"); 
    const min = document.getElementById("min"); 
    const max = document.getElementById("max"); 
    const amountdiv = document.getElementById("amount-to-convert"); 
    const slider = document.getElementById("myRange"); 
    const purchaseButton = document.getElementById("purchase"); 
    const addGemButton = document.getElementById("purchase-cvsu"); 
    const purchaseContainer = document.getElementById("conversion-container"); 

    var cvsuCoinsValue = 1000; 
    var minValue = 0; 
    var maxValue = cvsuCoinsValue/100; 
    var cvsuGems = 20; 

    var conversionamount = 0; 
    amountdiv.textContent = 0; 

    addGemButton.addEventListener("click", function() { 
        purchaseContainer.style.display = "block"; 
    });

    purchaseButton.addEventListener("click", convertGem); 

    slider.addEventListener("input", function() { 
        conversionamount = Math.floor((slider.value/100)*maxValue); 
        amountdiv.textContent = conversionamount; 
    }); 

    function convertGem() { 
        cvsuGems = cvsuGems + conversionamount; 
        cvsucoins.textContent = cvsuGems; 
        cvsuCoinsValue -= conversionamount*100; 
        coins3.textContent = cvsuCoinsValue; 


    }

    function hideConversionContainer() { 
        purchaseContainer.style.display = "none"; 
    }
    
    cvsucoins.textContent = cvsuGems; 
    coins3.textContent = cvsuCoinsValue;
    min.textContent = minValue; 
    max.textContent = maxValue; 
});