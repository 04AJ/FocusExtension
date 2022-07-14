
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
            chrome.storage.sync.get(['videoList'], function (result) {
                let localVids = result.videoList;
                if(localVids){
                    videoList = localVids;
                }
                videoList.push(currentVideo);
                   });
            
          
          
           
       newVideoLoaded();
        }
    });


    const newVideoLoaded = () => {

        currentVideoBookmarks = [];
        chrome.storage.sync.get(['currentVideo'], function (result) {
            let localBookmarks = result.currentVideo;
            if(localBookmarks){
                currentVideoBookmarks = localBookmarks;
    
    
            }    
        });
        
       

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

            

                    // saving to chrome storage
                    chrome.storage.sync.set({'currentVideo': currentVideoBookmarks}, function () {
                            console.log("caption sent!");
                    });

                

                    // saving video IDs
                    chrome.storage.sync.set({"videoList": videoList});


                    input.remove();
                    submit.remove();
                    bg.remove();
                    youtubePlayer.play();
            // sending message to popup 
            //    chrome.tabs.sendMessage(currentVideo, {
            //     type: "NEW",
            //     videoId: "Hello"
            // });




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

