document.addEventListener("DOMContentLoaded", function() { 
    console.log("hello world"); 

    const cvsucoins = document.getElementById("cvsu-coins-amount"); 
    const coins3 = document.getElementById("3-coins-amount"); 
    const min = document.getElementById("min"); 
    const max = document.getElementById("max"); 
    
    var cvsuCoinsValue = 1000; 
    var minValue = 0; 
    var maxValue = cvsuCoinsValue/100; 

    coins3.textContent = cvsuCoinsValue;
    cvsucoins.textContent = 100; 
    
    min.textContent = minValue; 
    max.textContent = maxValue; 
});