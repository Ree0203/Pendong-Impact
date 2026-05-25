//session

fetch('check_session.php', {method: 'POST'}).then(response => response.json()).then(loggedIn => {
            if(!loggedIn.loggedIn) window.location.replace('login.html')})
            .catch((error) => console.error(error));


//reload

window.addEventListener('pageshow',(e) => {
  if (e.persisted) window.location.reload();
});

/* Clock */
function updateClock() {
    const now = new Date(); 
    let h = now.getHours();
    let m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM'; 
    
    h = h % 12 || 12;
    document.getElementById('clock').textContent = `${h}:${String(m).padStart(2,'0')} ${ampm}`;
}

updateClock(); 
setInterval(updateClock, 1000);

/* Nav Interaction */
document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((b) => {
        b.classList.remove('active');
    });
    btn.classList.add('active');
    });
});


//Currencies
let coins; 
let gems; 

const coinContainer = document.getElementById("coins"); 
const gemContainer = document.getElementById("gems"); 

getCurrency();

function getCurrency() { 

    fetch("get_currency.php", {method: 'POST'})
    .then(response => response.json())
    .then(data=> {
        coins = data.coins;
        gems = data.gems;  

        coinContainer.textContent = coins; 
        gemContainer.textContent = gems; 
    })
}


//dropdown 

const hamburgerButton = document.getElementById("hamburger-btn"); 
const dropdownContainer = document.getElementById("dropdown-Container"); 

hamburgerButton.addEventListener("click", function() { 

    setTimeout(() => { 
        dropdownContainer.classList.toggle("fade-in"); 
    }, 10); 
});

//hrefs 

const profileNavButton = document.getElementById("profile-nav"); 
const wishNav = document.getElementById("wish-nav"); 
const inventoryNav = document.getElementById("inventory-nav"); 
const shopNav = document.getElementById("shop-nav"); 
const eventBoard = document.getElementById("event-board"); 
const profileDropDown = document.getElementById("profile"); 
const accountSettings = document.getElementById("account-settings"); 
const addButton = document.getElementById("ba-add"); 
const addButton2 = document.getElementById("ba-add2");

addButton2.addEventListener("click", function() { 
    window.location.href = "wish.html"; 
});

addButton.addEventListener("click", function() { 
    window.location.href = "wish.html"; 
}); 

profileDropDown.addEventListener("click", function() { 
    window.location.href = "profile.html"; 
}); 

accountSettings.addEventListener("click", function() { 
    window.location.href = "account.html"; 
})
profileNavButton.addEventListener("click", function(){ 
    window.location.href = "profile.html"; 
});

wishNav.addEventListener("click", function() { 
    window.location.href = "wish.html"; 
}); 
    
inventoryNav.addEventListener("click", function() { 
    window.location.href = "inventory.html"; 
});

shopNav.addEventListener("click", function() { 
    window.location.href = "payment.html"; 
}); 

eventBoard.addEventListener("click", function() { 
    window.location.href = "wish.html"; 
}); 

//logout

const logout = document.getElementById('logout');

logout.addEventListener('click', function(){
    fetch('destroy_session.php', {method: 'POST'})
    .then(response => response.json())
    .then(data => { 
        showModal(data.status, data.message); 
        setTimeout(() => { 
            window.location.replace("login.html"); 
        }, 2000); 
    })
    .catch(error => console.error(error));
});

//profile 

let username; 
let userId; 
let profilePic;

const profileName = document.getElementById("profile-name"); 
const profileId = document.getElementById("profile-id"); 
const profilePicContainer = document.getElementById("profile-picture"); 
const navProfileContainer = document.getElementById("nav-profile-icon"); 

getAccount(); 

function getAccount() { 
    fetch("get_account.php", {method: 'POST'})
    .then(response => response.json())
    .then(data => { 
        username = data.username; 
        userId = 202600256269 + data.user_id; 
        profilePic = data.profile_pic; 

        setProfile(username, userId, profilePic); 
    })
    .catch(error => console.error("Error fetching account, ", error)); 
}

function setProfile(username, userId, profilePic) { 
    profileName.textContent = username; 
    profileId.textContent = userId;

    if(profilePic !== null) { 
        profilePicContainer.src = "Assets/" + profilePic; 
        navProfileContainer.src = "Assets/" + profilePic; 
    } else { 
        profilePicContainer.src = "Assets/profile.jpg"; 
    }
} 

//Visit Menu
getAllAccounts();
async function getAllAccounts() {
    const response = await fetch('get_all_accounts.php', {method: 'POST'});
    const accounts = await response.json();
    displayPlayers(accounts);
}

const visitMenu = document.querySelector('.visit-menu');
const playerCardOrig = document.querySelector('.player-card');
function displayPlayers(accounts) {

    for(let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const playerCardClone = playerCardOrig.cloneNode(true);
        const clonePicture = playerCardClone.querySelector('.player-card-picture');
        const cloneUsername = playerCardClone.querySelector('.player-card-username');
        const cloneUserId = playerCardClone.querySelector('.player-card-id');
        const cloneOnline = playerCardClone.querySelector('.player-card-online');
        const cloneButton = playerCardClone.querySelector('.player-card-button img');

        playerCardClone.dataset.userId = account.user_id;
        clonePicture.style.backgroundImage = `url('Assets/${account.profile_pic}')`
        cloneUsername.textContent = account.username;
        cloneUserId.textContent = 202600256269 + account.user_id;
        cloneOnline.textContent = getLastLogin(account.last_login);
        
        cloneButton.addEventListener('click', () => window.location.href = `profile.html?id=${account.user_id}`);
        playerCardClone.style.display = 'flex';
        visitMenu.append(playerCardClone);
    }

    
}

const visitButton = document.querySelector('.visit-icon');
const visitCloseButton = document.querySelector('#visit-menu-title .x-button');
const visitMenuContainer = document.querySelector('.visit-menu-container');

visitButton.addEventListener('click', () => visitMenuContainer.classList.toggle('show'));
visitCloseButton.addEventListener('click', () => visitMenuContainer.classList.remove('show'));

//Get last login

function getLastLogin(lastLogin) {
    const now = new Date();
    const msTimeOffset = now - new Date(lastLogin);
    
    const msMinutes = 60 * 1000;
    const msHours = 60 * msMinutes;
    const msDays = 24 * msHours;

    const days = Math.floor(msTimeOffset / msDays);
    const hours = Math.floor((msTimeOffset % msDays) / msHours);
    const minutes = Math.floor((msTimeOffset % msHours) / msMinutes);
    
    
    if(days === 0 && hours === 0 && minutes === 0) return 'Just now';

    const total = [];

    if(days > 0) total.push(`${days}d`);
    if(hours > 0) total.push(`${hours}h`);
    if(minutes > 0) total.push(`${minutes}m`)

    return `${total.join(' ')} ago`
}




