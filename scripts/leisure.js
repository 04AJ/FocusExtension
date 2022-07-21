// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["2em", 0],
    translateZ: 0,  
    duration: 2000,
    delay: (el, i) => 500 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1500,
    easing: "easeOutExpo",
    delay: 1000
  });

// new window var
let win;



const input = document.getElementsByClassName("input")[0];


const field = document.getElementsByClassName("field")[0];

const head = document.getElementsByClassName("head")[0];


const display = document.getElementsByClassName("time")[0];

const end = document.getElementsByClassName("end")[0];

const submit = document.getElementsByClassName("btn")[0];
const note = document.getElementsByClassName("note")[0];




submit.addEventListener("click", ()=> {
    win = window.open('https://youtube.com/', '_blank'); 
    var time = input.value * 60;
    input.value = "";
    
    field.style.display = "none";
    head.innerHTML = "Time left on YouTube"
   
    end.style.display = "block";
    display.style.display = "block";

    note.innerHTML = "View the extension badge (top right corner) to keep track of your time";
    


    return new Promise(resolve =>{
        resolve(startTimer(time, display));
    });

   
    
  
});


  



end.addEventListener("click", ()=>{
    win.close();
    window.close();
     chrome.action.setBadgeText({
            "text": ""
        });
        

});

async function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {

        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            win.close();
        }

        chrome.action.setBadgeText({
            "text": (minutes).toString()
        });
        

        if(minutes > 10){
            chrome.action.setBadgeBackgroundColor(
                {color: "green"}
            );
        } else{
            chrome.action.setBadgeBackgroundColor(
                {color: "red"}
            ); 
        }
      


    
    }, 1000);
}

