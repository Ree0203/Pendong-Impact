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