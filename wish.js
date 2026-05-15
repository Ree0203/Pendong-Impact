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

const demyBanner = document.getElementById("demy-container"); 
const jaysonBanner = document.getElementById("jayson-container"); 
const jamesBanner = document.getElementById("james-container"); 
const jaysonBox = document.getElementById("jayson");
const demyBox = document.getElementById("demy"); 
const jamesBox = document.getElementById("james"); 

const characters = [{id:1, name:"jayson", rarity:5, image: "jayson.png"}, 
                    {id:2, name:"demy", rarity:5, image: "demy.png"}, 
                    {id:3, name:"james", rarity:5, image:"james.png"},
                    {id:4, name:"trash", rarity:3, image:"trash.png"},
                    {id:5, name:"ryan", rarity:4, image: "ryan.png"},
                    {id:6, name:"johan", rarity:4, image:"johan.png"},
                    {id:7, name:"tayog", rarity:4, image:"tayog.png"}, 
                    {id:8, name:"lawrence", rarity:4, image:"lawrence.png"},
                    {id:9, name:"chlowen", rarity:4, image:"chlowen.png"},
                    {id:10, name:"marcus", rarity:4, image:"marcus.jpg"}]; 

const wishButton1 = document.getElementById("wish1")
const wishButton10 = document.getElementById("wish10");


const insuffGemContainer = document.getElementById("insuff-gem-container"); 
const shopErrorButton = document.getElementById("shop-error"); 
const wishErrorButton = document.getElementById("wish-error"); 

wishErrorButton.addEventListener("click", function() { 
    insuffGemContainer.style.display = "none"; 
});

shopErrorButton.addEventListener("click", function() { 
    window.location.href = "payment.html";

}); 

wishButton1.addEventListener("click", function() {
    if(cvsuGems >= 1){ 
        singlePull(); 
    } else { 
        insuffGemContainer.style.display = "flex"; 
    }
});

wishButton10.addEventListener("click", multipull);

let selectedCharacters = [];
let currentImageIndex = 0; 

function multipull(){ 
    if(cvsuGems >= 10) { 
        selectedCharacters = [];

        currentImageIndex = 0; 

        for(let i = 0; i<10; i++) { 
            pullCharacter(); 
        }

        showImages(selectedCharacters); 
    } else { 
        insuffGemContainer.style.display = "flex"; 
    }
    
}

function singlePull(){
    selectedCharacters = [];

    pullCharacter();
    
    showImages(selectedCharacters); 
}
function pullCharacter() { 

    let rarity; 

    var random = Math.random()*100; 

    if(random<0.6) { 
        rarity = 5; 
    } else if (random<5.6) { 
        rarity = 4; 
    } else { 
        rarity = 3; 
    }

    let filteredCharacters;
    filteredCharacters = filterCharacters(rarity, characters); 

    
    var selected = filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
    selectedCharacters.push(selected); 

    return selected; 
}

function filterCharacters(rarity, characters) { 
    let filteredCharacters = [];
    for(let i = 0; i<characters.length; i++){ 

        if(characters[i].rarity === rarity) { 
            filteredCharacters.push(characters[i]);
        }
    }

    return filteredCharacters;
}

function showImages(selected) { 
    selectedCharacters = selected; 

    renderImage();
}

function renderImage() { 
    const container = document.getElementById("obtainedCharacters");

    if(!selectedCharacters || selectedCharacters.length === 0) { 
        container.style.display = "none"; 
        return; 
    }

    container.style.display = "flex"; 
    container.style.pointerEvents = "auto"; 
    container.style.zIndex = "3"; 
    container.innerHTML = ""; 
    container.textContent = currentImageIndex+1; 
    const character = selectedCharacters[currentImageIndex]; 

    const img = document.createElement("img"); 
    img.src = `Assets/${character.image}`; 
    img.style.width = "30%"; 
    container.appendChild(img); 

    setTimeout(() => {
        img.classList.add("fade-in");
    }, 10);
    
    container.onclick = (e) => { 
        e.stopPropagation(); 
        currentImageIndex++; 

        if(selectedCharacters.length > currentImageIndex) { 
            container.innerHTML = "";
            renderImage(); 
        } else { 
            container.style.display = "none"; 
            container.style.pointerEvents = "none"; 
            container.style.zIndex = "-1"; 
            currentImageIndex = 0; 

        } 
    }
}

jaysonBox.addEventListener("click", function() {
    jamesBox.classList.remove("active-banner"); 
    demyBox.classList.remove("active-banner"); 
    jaysonBox.classList.add("active-banner"); 

    demyBanner.style.display = "none"; 
    jamesBanner.style.display = "none";  
    jaysonBanner.style.display = "block"; 
}); 

demyBox.addEventListener("click", function() {
    jamesBox.classList.remove("active-banner"); 
    jaysonBox.classList.remove("active-banner"); 
    demyBox.classList.add("active-banner"); 

    demyBanner.style.display = "block"; 
    jamesBanner.style.display = "none";  
    jaysonBanner.style.display = "none"; 
}); 

jamesBox.addEventListener("click", function() {
    jamesBox.classList.add("active-banner"); 
    demyBox.classList.remove("active-banner"); 
    jaysonBox.classList.remove("active-banner"); 

    demyBanner.style.display = "none"; 
    jamesBanner.style.display = "block";  
    jaysonBanner.style.display = "none"; 
}); 


var minValue = 0; 
var maxValue = 0; 


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
    purchaseContainer.style.display = "none"; 
    const conversionPrice = -1*(conversionamount*100); 
    updateCurrency(conversionPrice, conversionamount); 
}

function hideConversionContainer() { 
    purchaseContainer.style.display = "none"; 
}

function showConversionContainer() { 
    purchaseContainer.style.display = "flex"; 
}

let cvsuCoinsValue;
let cvsuGems; 

getCurrency(); 

function getCurrency() { 
    fetch('get_currency.php')
        .then(response=>response.json())    
        .then(data=> { 
            cvsuCoinsValue = data.coins; 
            cvsuGems = data.gems; 

            console.log("Coins: ", cvsuCoinsValue); 
            console.log("Gems: ", cvsuGems); 

            cvsucoins.textContent = cvsuGems; 
            coins3.textContent = cvsuCoinsValue;
        });
}

function updateCurrency(coins, gems) { 

    fetch("update_currency.php", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            coins: coins,
            gems: gems
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success") {
            console.log("Converted " + gems + " gems"); 
            console.log("Subtracted " + coins + " from coins");  
            getCurrency(); 
        } else { 
            console.log("There was an error during the conversion"); 
        }
    })
}
const shopButton = document.getElementById("shop"); 

shopButton.addEventListener("click", function() { 
    window.location.href = "payment.html";
}); 
 


