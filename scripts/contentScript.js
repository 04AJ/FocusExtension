(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];
    let videoList = [];


    // listening for background message
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const{type, value, videoId} = obj;

        if(type === "NEW"){
            currentVideo = videoId;
            

            videoList = [];
            let localVids = JSON.parse(localStorage.getItem("videoList"));
            if(localVids){
                videoList = localVids;
            }
   
            videoList.push(currentVideo);
           
       newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {

        currentVideoBookmarks = [];

        let localBookmarks = JSON.parse(localStorage.getItem(currentVideo));
        if(localBookmarks){
            currentVideoBookmarks = localBookmarks;


        }


        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0]; 
     // adding button to YouTube DOM
        if(!bookmarkBtnExists){
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("images/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to save current timestamp";

            youtubeLeftControls =  document.getElementsByClassName("ytp-right-controls")[0];
            
            youtubeLeftControls.prepend(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);



        }
    }

    const addNewBookmarkEventHandler = () => {
        // disabling keyboard shortcuts
        window.addEventListener('keydown', stopPropagation, true);
            function stopPropagation(e) {
            e.stopPropagation();
            }

 
        youtubePlayer = document.getElementsByClassName("video-stream")[0];
        youtubePlayer.pause();
        const inputExists = document.getElementsByClassName("input-btn")[0]; 
     // adding button to YouTube DOM
        if(!inputExists){

        const bg = document.createElement("div");
        bg.style.backgroundColor = "black";
        bg.style.padding = "10px";
        bg.style.display = "flex";
        bg.style.justifyContent = "center";
        bg.style.border = "3px solid rgb(9, 196, 209)";

     
        const input = document.createElement("input");
        input.className = "ytp-chrome-top-buttons " + "input-btn";
        input.type = "text";
        input.title = "Caption this timestamp. Click the button to submit.";
        input.placeholder = "Caption this timestamp";
        input.style.height = "2rem"; 
        input.style.marginTop = "5px";
        input.style.width = "250px";
        input.style.fontSize = "2rem";
        input.style.fontFamily = "Helvetica !important";

        const submit = document.createElement("img");
        submit.className = "ytp-chrome-top-buttons " + "submit-btn";
        submit.src = chrome.runtime.getURL("images/submit2.png");
        submit.title = "Submit";
        submit.style.height = "3.5rem"; 
        submit.style.width= "3.5rem"; 

        submit.onclick = function (){
            var inputVal  = input.value;
            var currentTime = Math.round(youtubePlayer.currentTime);
            var videoTitle = document.title.split(" - YouTube")[0];
        
           
            var newBookmark = {
                time: currentTime,
                title: videoTitle,
                desc: "Bookmark at " + Math.floor(currentTime/60) + ":" + currentTime%60,
                link: "https://youtu.be/" + currentVideo + "?t=" + currentTime,
                cap: inputVal
    
            };

        
            currentVideoBookmarks.push(newBookmark);
            currentVideoBookmarks.sort((a, b) => a.time - b.time);

            

            // saving to local storage
        localStorage.setItem(currentVideo, JSON.stringify(currentVideoBookmarks));

        // saving video IDs
        localStorage.setItem("videoList", JSON.stringify(videoList));
        input.remove();
        submit.remove();
        bg.remove();
        youtubePlayer.play();



        }

        bg.appendChild(input);
        bg.appendChild(submit);
        youtubeTopControls = document.getElementsByClassName("ytp-chrome-top-buttons")[0];
        // youtubeTopControls.prepend(submit);
        // youtubeTopControls.prepend(input);
        youtubeTopControls.appendChild(bg);
        
        
        }

       
        
      

}


    
   window.removeEventListener('keydown', stopPropagation, true);

    
    newVideoLoaded();

})();
