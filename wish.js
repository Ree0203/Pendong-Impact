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




wishButton1.addEventListener("click", singlePull);
wishButton10.addEventListener("click", multipull);

let selectedCharacters = [];
let currentImageIndex = 0; 

function multipull(){ 
    selectedCharacters = [];

    for(let i = 0; i<10; i++) { 
        pullCharacter(); 
    }

    showImages(selectedCharacters); 
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
    container.style.display = "flex"; 
    container.style.zIndex = "3"; 
    container.innerHtml = ""; 
    container.textContent = currentImageIndex+1; 
    const character = selectedCharacters[currentImageIndex]; 

    const img = document.createElement("img"); 
    img.src = `Assets/${character.image}`; 
    img.style.width = "30%"; 
    container.appendChild(img); 

    setTimeout(() => {
            img.classList.add("fade-in");
    }, 10);
    
    container.onclick = () => { 
        currentImageIndex++; 

        if(selectedCharacters.length > currentImageIndex) { 
            container.innerHTML = "";
            renderImage(); 
        } else { 
            container.style.zIndex = -1;
            container.style.display = "none"; 
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



