window.onload = () => {
    const kitty = document.getElementById("kitty")
    kitty.onclick = () => {
        kitty.classList.toggle("kitty-move")
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.querySelector('.digital-clock').textContent = hours + ':' + minutes;
}

setInterval(updateClock, 1000);
updateClock();

function updateSharks() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourProgress = ((hours * 3600) + (minutes * 60) + seconds) / 43200; 
    const minuteProgress = ((minutes * 60) + seconds) / 3600; 
    
    const hourAngle = hourProgress * 360;
    const minuteAngle = minuteProgress * 360;
    
    const bigShark = document.querySelector('.shark');
    const smallShark = document.querySelector('.small-shark');
    
    bigShark.style.transform = `translate(-50%, -50%) rotate(${hourAngle}deg) translateY(-390px)`;
    smallShark.style.transform = `translate(-50%, -50%) rotate(${minuteAngle}deg) translateY(-240px)`;
}

setInterval(updateSharks, 1000);
updateSharks();