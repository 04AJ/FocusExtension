
const input = document.getElementsByClassName("input")[0];


const field = document.getElementsByClassName("field")[0];

const head = document.getElementsByClassName("head")[0];

const btn = document.getElementsByClassName("btn");

const display = document.getElementsByClassName("time")[0];

const stop = document.getElementsByClassName("stop")[0];



 function myfunction(){
    var time = input.value * 60;
    input.value = "";
    field.style.display = "none";
    head.innerHTML = "Time left on YouTube"
    startTimer(time, display);
    stop.style.display = "block";
  
}


stop.addEventListener("click", ()=>{
    field.style.display = "block";
    stop.style.display = "none";
    display.style.display = "none";


});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            // timer = duration; // uncomment this line to reset timer automatically after reaching 0
        }
    }, 1000);
}
