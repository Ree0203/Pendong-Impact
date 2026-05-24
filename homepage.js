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

    fetch("get_currency.php")
    .then(response => response.json())
    .then(data=> {
        coins = data.coins;
        gems = data.gems;  

        console.log("Coins: " + coins); 
        console.log("Gems: " + gems); 

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
    fetch("get_account.php")
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
    console.log(profilePic); 

    if(profilePic !== null) { 
        profilePicContainer.src = "Assets/" + profilePic; 
        navProfileContainer.src = "Assets/" + profilePic; 
    } else { 
        profilePicContainer.src = "Assets/profile.jpg"; 
    }
} 

//session

fetch('check_session.php').then(response => response.json()).then(loggedIn => {
            if(!loggedIn.loggedIn) window.location.replace('login.html')})
            .catch((error) => console.error(error));





