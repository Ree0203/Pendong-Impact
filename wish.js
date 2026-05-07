document.addEventListener("DOMContentLoaded", function() { 
    console.log("hello world"); 

    const cvsucoins = document.getElementById("cvsu-coins-amount"); 
    const coins3 = document.getElementById("3-coins-amount"); 
    const min = document.getElementById("min"); 
    const max = document.getElementById("max"); 
    const amountdiv = document.getElementById("amount-to-convert"); 
    const slider = document.getElementById("myRange"); 


    var cvsuCoinsValue = 1000; 
    var minValue = 0; 
    var maxValue = cvsuCoinsValue/100; 

    var conversionamount = 0; 
    amountdiv.textContent = 0; 

    slider.addEventListener("input", function() { 
        conversionamount = Math.floor((slider.value/100)*maxValue); 
        amountdiv.textContent = conversionamount; 
    }); 

    coins3.textContent = cvsuCoinsValue;
    cvsucoins.textContent = 100; 
    
    min.textContent = minValue; 
    max.textContent = maxValue; 
});