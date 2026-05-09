document.addEventListener("DOMContentLoaded", function(){ 
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
    const cancelPurchase = document.getElementById("cancel"); 

    var cvsuCoinsValue = 21245; 
    var minValue = 0; 
    var maxValue = 0; 
    var cvsuGems = 20; 

    var conversionamount = 0; 
    amountdiv.textContent = 0; 

    addGemButton.addEventListener("click", function() { 
        slider.value = 50;
        maxValue = Math.floor(cvsuCoinsValue/100); 

        conversionamount = Math.floor((slider.value/100)*maxValue); 
        amountdiv.textContent = conversionamount; 

        min.textContent = minValue; 
        max.textContent = maxValue; 
        purchaseContainer.style.display = "flex"; 
    });

    purchaseButton.addEventListener("click", convertGem); 

    slider.addEventListener("input", function() { 
        conversionamount = Math.floor((slider.value/100)*maxValue); 
        amountdiv.textContent = conversionamount; 
    }); 

    cancelPurchase.addEventListener("click", function() { 
        purchaseContainer.style.display = "none"; 
    }); 
    function convertGem() { 
        cvsuGems = cvsuGems + conversionamount; 
        cvsucoins.textContent = cvsuGems; 
        cvsuCoinsValue -= conversionamount*100; 
        coins3.textContent = cvsuCoinsValue; 
        purchaseContainer.style.display = "none"; 
    }

    function hideConversionContainer() { 
        purchaseContainer.style.display = "none"; 
    }

    function showConversionContainer() { 
        purchaseContainer.style.display = "flex"; 
    }
    cvsucoins.textContent = cvsuGems; 
    coins3.textContent = cvsuCoinsValue;
}); 


