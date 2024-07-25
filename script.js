const divContainer = document.getElementById('container')
const secondDiv = document.getElementById("second-container");
const thirdDiv = document.getElementById("third-container");
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const lapbtn = document.getElementById('lap');

let startTime;
let updateTime;
let difference;
let pausedTime = 0;
let paragraphElement
let hours;
let minutes;
let seconds;
let miliSecond;
let timeInterval;
let isRunning = false;
let reset = false;
let count = 0;

startBtn.addEventListener('click', ()=>{
    if(!isRunning){
        startTime = new Date().getTime() - pausedTime;
        timeInterval = setInterval(getShowTime, 1);
        startBtn.innerHTML = "<i class='bx bx-pause'></i>";
        isRunning = true;
        reset = false;
        lapbtn.disabled = false;
     }else{
        clearInterval(timeInterval);
        lapbtn.disabled = true;
        pausedTime = new Date().getTime() - startTime;
        startBtn.innerHTML = "<i class='bx bx-play'></i>";
        isRunning = false;  
    }
})

lapbtn.addEventListener('click', ()=>{
    if(!isRunning) return
    paragraphElement = document.createElement('p');
    paragraphElement.classList.add("style")
    paragraphElement.innerHTML = (count + 1) + ", "+ hours + ':' + minutes + ':' + seconds + "." + miliSecond;
    if(count < 7){
        secondDiv.appendChild(paragraphElement);
        count += 1;
        console.log(count)  
    }else if(count < 14){
        thirdDiv.appendChild(paragraphElement);
        count += 1;
    }else{
        window.alert("No More Lap!")
    }
})

resetBtn.addEventListener('click', ()=>{
    clearInterval(timeInterval);
    display.innerHTML = "00:00:00.00";
    hours = 0;
    minutes = 0;
    seconds = 0;
    miliSecond = 0;
    pausedTime = 0;
    isRunning = false;
    startBtn.innerHTML ="<i class='bx bx-play'></i>";
    lapbtn.disabled = true;
    while(secondDiv.firstChild){
        secondDiv.removeChild(secondDiv.firstChild);
    }
    while(thirdDiv.firstChild){
        thirdDiv.removeChild(thirdDiv.firstChild);
    }
    count = 0;
    reset = true;
})

function getShowTime(){
    updateTime = new Date().getTime();  
    difference = updateTime-startTime;
    hours = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
    minutes = Math.floor((difference % (1000*60*60)) / (1000*60));
    seconds = Math.floor((difference % (1000*60)) / (1000));
    miliSecond = Math.floor((difference % 10000 / 100))

    hours = (hours < 10) ? '0' + hours:hours;
    minutes = (minutes < 10) ? '0' + minutes:minutes;
    seconds = (seconds < 10) ? '0' + seconds:seconds;
    // miliSecond = (miliSecond < 10) ? '0' + miliSecond:miliSecond;

    display.innerHTML = hours + ':' + minutes + ':' + seconds + "." + miliSecond ;
}
