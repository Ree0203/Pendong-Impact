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
const purchaseOuter = document.getElementById("conversion-outer-container");
const xButton = document.getElementById("x-icon"); 

const demyBanner = document.getElementById("demy-container"); 
const jaysonBanner = document.getElementById("jayson-container"); 
const jamesBanner = document.getElementById("james-container"); 
const jaysonBox = document.getElementById("jayson");
const demyBox = document.getElementById("demy"); 
const jamesBox = document.getElementById("james"); 

let characters = [{id:1, name:"Jayson Bustaleno", rarity:5, image: "jayson.png"}, 
                    {id:4, name:"Trash", rarity:3, image:"trash.png"},
                    {id:5, name:"Ryan Donceras", rarity:4, image: "ryan.png"},
                    {id:6, name:"Johanes Leyran", rarity:4, image:"johan.png"},
                    {id:7, name:"Bantayog Basallo", rarity:4, image:"tayog.png"}, 
                    {id:8, name:"Lawrence Mojica", rarity:4, image:"lawrence.png"},
                    {id:9, name:"Chlowen Patambang", rarity:4, image:"chlowen.png"},
                    {id:10, name:"Marcus Matic", rarity:4, image:"marcus.png"}]; 


const wishButton1 = document.getElementById("wish1")
const wishButton10 = document.getElementById("wish10");


const insuffGemContainer = document.getElementById("insuff-gem-container"); 
const shopErrorButton = document.getElementById("shop-error"); 
const wishErrorButton = document.getElementById("wish-error"); 

const video = document.getElementById("pull-animation"); 

video.addEventListener("click", function() { 
    video.currentTime = video.duration; 
    video.style.display = "none"; 
});
wishErrorButton.addEventListener("click", function() { 
    insuffGemContainer.style.display = "none"; 
});

shopErrorButton.addEventListener("click", function() { 
    window.location.href = "payment.html";

}); 

xButton.addEventListener("click", function() { 
    window.location.href = "homepage.html"; 
}); 

wishButton1.addEventListener("click", function() {
    

    if(cvsuGems >= 1){ 

        video.style.display= "block"; 
        video.currentTime = 0; 
        video.play(); 

        video.onended = function() { 
            video.style.display = "none"; 

            singlePull(); 

            setPity(pity); 
            setFourStarPity(fourpity); 

        }
    } else { 
        insuffGemContainer.style.display = "flex"; 
    }
});

wishButton10.addEventListener("click", multipull); 

let selectedCharactersNoTrash = []; 

function filterTrashFromCharacters(selectedCharacters){ 
    selectedCharactersNoTrash = []; 
    for(let i = 0; i<selectedCharacters.length; i++) { 
        if(selectedCharacters[i].name !== "trash") { 
            selectedCharactersNoTrash.push(selectedCharacters[i]); 
        }
    }
}


let selectedCharacters = [];
let currentImageIndex = 0; 

function insertCharactersIntoDatabase(characters) { 

    if(characters.length !== 0) { 
        fetch("insert_character.php", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(characters)
        })
        .then(response => response.json())
        .then(data => {

        })
    }
}


function multipull(){ 
    if(cvsuGems >= 10) { 
        video.style.display = "block";
        video.currentTime = 0; 
        video.play(); 

        video.onended = function() {
            video.style.display = "none";             
            selectedCharacters = [];

            currentImageIndex = 0; 

            updateCurrency(0, -10, 0); 


            for(let i = 0; i<10; i++) { 
                pullCharacter(); 
            }

            setPity(pity); 
            setFourStarPity(fourpity);

            showImages(selectedCharacters); 

            

            filterTrashFromCharacters(selectedCharacters); 

            insertCharactersIntoDatabase(selectedCharactersNoTrash);
        }
    } else { 
        insuffGemContainer.style.display = "flex"; 
    }
}

function singlePull(){
    selectedCharacters = [];

    pullCharacter();

    updateCurrency(0, -1, 0); 

    showImages(selectedCharacters); 

    insertCharactersIntoDatabase(selectedCharacters); 
}

function pullCharacter() { 

    let rarity; 
    let fiveStarChance = 0.6; 
    let fourStarChance = 5.6; 

    if(pity > 73) { 
        fiveStarChance = (pity - 73)*6; 
        console.log("Five Star Chance: " + fiveStarChance); 
    }

    if(fourpity >= 9) { 
        fourStarChance = 100; 
    }

    var random = Math.random()*100; 


    if(random<fiveStarChance) { 
        rarity = 5; 
        setPity(0);  
        pity = 0;
        fourpity++;     
    } else if (random<fourStarChance) { 
        rarity = 4; 
        pity++; 
        setFourStarPity(0); 
        fourpity = 0; 
    } else { 
        rarity = 3; 
        pity++; 
        fourpity++; 
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
    const character = selectedCharacters[currentImageIndex];    

    const img = document.createElement("img"); 
    img.src = `Assets/${character.image}`; 
    img.classList.add("characterImage"); 
    img.style.width = "30%"; 
    container.appendChild(img); 

    const characterName = document.createElement("div"); 
    characterName.textContent = character.name; 
    characterName.classList.add("character-name"); 
    container.appendChild(characterName); 

    displayStars(character, characterName); 

    setTimeout(() => { 
        characterName.classList.add("fade-in");    
    }, 10);

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

function displayStars(character, container){ 
    const starContainer = document.createElement("div"); 
    starContainer.classList.add("star-container"); 

    for(let i = 0; i<character.rarity; i++) { 
        const star = document.createElement("img");
        star.style.opacity = "1"; 
        star.src = "Assets/star-icon.svg";
        star.classList.add("star-character"); 
       
        starContainer.appendChild(star);
    }

    container.appendChild(starContainer); 
}

jaysonBox.addEventListener("click", function() {
    jamesBox.classList.remove("active-banner"); 
    demyBox.classList.remove("active-banner"); 
    jaysonBox.classList.add("active-banner"); 

    demyBanner.style.display = "none"; 
    jamesBanner.style.display = "none";  

    demyBanner.classList.remove("fade-in"); 
    jamesBanner.classList.remove("fade-in");

    setTimeout(() => {
        jaysonBanner.classList.add("fade-in"); 
    }, 100); 
    jaysonBanner.style.display = "block"; 

    characters = [{id:1, name:"Jayson Bustaleno", rarity:5, image: "jayson.png"}, 
                {id:4, name:"Trash", rarity:3, image:"trash.png"},
                {id:5, name:"Ryan Donceras", rarity:4, image: "ryan.png"},
                {id:6, name:"Johanes Leyran", rarity:4, image:"johan.png"},
                {id:7, name:"Tayog Basallo", rarity:4, image:"tayog.png"}, 
                {id:8, name:"Lawrence Mojica", rarity:4, image:"lawrence.png"},
                {id:9, name:"Chlowen Patambang", rarity:4, image:"chlowen.png"},
                {id:10, name:"Marcus Matic", rarity:4, image:"marcus.png"}]; 

}); 

demyBox.addEventListener("click", function() {
    jamesBox.classList.remove("active-banner"); 
    jaysonBox.classList.remove("active-banner"); 
    demyBox.classList.add("active-banner"); 

    jamesBanner.style.display = "none";  
    jaysonBanner.style.display = "none"; 

    jamesBanner.classList.remove("fade-in");
    jaysonBanner.classList.remove("fade-in"); 

    setTimeout(() => { 
        demyBanner.classList.add("fade-in");
    }, 30);
    demyBanner.style.display = "block"; 
    characters = [{id:2, name:"Demy Moya", rarity:5, image: "demy.png"}, 
                {id:4, name:"Trash", rarity:3, image:"trash.png"},
                {id:5, name:"Ryan Donceras", rarity:4, image: "ryan.png"},
                {id:6, name:"Johanes Leyran", rarity:4, image:"johan.png"},
                {id:7, name:"Tayog Basallo", rarity:4, image:"tayog.png"}, 
                {id:8, name:"Lawrence Mojica", rarity:4, image:"lawrence.png"},
                {id:9, name:"Chlowen Patambang", rarity:4, image:"chlowen.png"},
                {id:10, name:"Marcus Matic", rarity:4, image:"marcus.png"}]; 

}); 

jamesBox.addEventListener("click", function() {
    jamesBox.classList.add("active-banner"); 
    demyBox.classList.remove("active-banner"); 
    jaysonBox.classList.remove("active-banner"); 

    demyBanner.style.display = "none"; 
    jaysonBanner.style.display = "none"; 

    demyBanner.classList.remove("fade-in");
    jaysonBanner.classList.remove("fade-in"); 

    setTimeout(() => { 
        jamesBanner.classList.add("fade-in"); 
    }, 30); 
    jamesBanner.style.display = "block";  

    characters = [{id:3, name:"James Mareau Santos", rarity:5, image:"james.png"},
                {id:4, name:"Trash", rarity:3, image:"trash.png"},
                {id:5, name:"Ryan Donceras", rarity:4, image: "ryan.png"},
                {id:6, name:"Johanes Leyran", rarity:4, image:"johan.png"},
                {id:7, name:"Tayog Basallo", rarity:4, image:"tayog.png"}, 
                {id:8, name:"Lawrence Mojica", rarity:4, image:"lawrence.png"},
                {id:9, name:"Chlowen Patambang", rarity:4, image:"chlowen.png"},
                {id:10, name:"Marcus Matic", rarity:4, image:"marcus.png"}];    
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

    setTimeout(() => {
        purchaseContainer.classList.add("fade-in");
    }, 10);
    purchaseOuter.style.display = "block"; 
});

purchaseButton.addEventListener("click", convertGem); 

slider.addEventListener("input", function() { 
    conversionamount = Math.floor((slider.value/100)*maxValue); 
    amountdiv.textContent = conversionamount; 
}); 

cancelPurchase.addEventListener("click", function() { 
    purchaseContainer.classList.remove("fade-in"); 
    purchaseOuter.style.display = "none"; 
}); 

function convertGem() { 
    purchaseContainer.classList.remove("fade-in"); 
    purchaseOuter.style.display = "none"; 
    const conversionPrice = -1*(conversionamount*100); 
    updateCurrency(conversionPrice, conversionamount, 0); 
}

function hideConversionContainer() { 
    purchaseContainer.classList.remove("fade-in"); 
    purchaseOuter.style.display = "none"; 
}

function showConversionContainer() { 
    purchaseContainer.classList.add("fade-in"); 
    purchaseOuter.style.display = "block"; 
}

let cvsuCoinsValue;
let cvsuGems; 
let pity; 
let fourpity; 

getCurrency(); 

function getCurrency() { 
    fetch('get_currency.php')
        .then(response=>response.json())    
        .then(data=> { 
            cvsuCoinsValue = data.coins; 
            cvsuGems = data.gems; 
            pity = data.pity; 
            fourpity = data.four_star_pity; 

            console.log("Four star pity: " + fourpity); 
            console.log("Five star pity: " + pity); 
            console.log(" ")

            cvsucoins.textContent = cvsuGems; 
            coins3.textContent = cvsuCoinsValue;
        });
}

function updateCurrency(coins, gems, pity) { 

    fetch("update_currency.php", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            coins: coins,
            gems: gems,
            pity: pity
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
const inventoryButton = document.getElementById("inventory"); 

shopButton.addEventListener("click", function() { 
    window.location.href = "payment.html";
}); 
 
inventoryButton.addEventListener("click", function() { 
    window.location.href = "inventory.html"; 
}); 
function setPity(pity) { 
    fetch("update_pity.php", { 
        method: "POST", 
        headers: { 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({ 
            pity: pity,
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success") { 
        } else { 
            console.log("There was an error while setting pity"); 
        }
    })
}

function setFourStarPity(fourPity) { 

    fetch("update_fourpity.php", {
         method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fourPity: fourPity 
        })
    })
    .then(response => response.json()) 
    .then(data => {
        if(data.status === "success") { 
        } else { 
            console.log("There was an error while setting four star pity.")
        }
    })
}

fetch('check_session.php').then(response => response.json()).then(loggedIn => {
            if(!loggedIn.loggedIn) window.location.replace('login.html')})
            .catch((error) => console.error(error));

