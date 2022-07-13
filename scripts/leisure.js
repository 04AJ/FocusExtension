
// new window var
let win;



const input = document.getElementsByClassName("input")[0];


const field = document.getElementsByClassName("field")[0];

const head = document.getElementsByClassName("head")[0];


const display = document.getElementsByClassName("time")[0];

const end = document.getElementsByClassName("end")[0];

const submit = document.getElementsByClassName("btn")[0];




submit.addEventListener("click", ()=> {
    win = window.open('https://youtube.com/', '_blank'); 
    var time = input.value * 60;
    input.value = "";
    
    field.style.display = "none";
    head.innerHTML = "Time left on YouTube"
   
    end.style.display = "block";
    display.style.display = "block";
    


    return new Promise(resolve =>{
        resolve(startTimer(time, display));
    });

   
    
  
});


  



end.addEventListener("click", ()=>{
    win.close();
    window.close();


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

        chrome.browserAction.setBadgeText({
            "text": (minutes).toString()
        });


    
    }, 1000);
}

