(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];


    // listening for background message
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const{type, value, videoId} = obj;

        if(type === "NEW"){
            currentVideo = videoId;
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
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
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

 
        const inputExists = document.getElementsByClassName("input-btn")[0]; 
     // adding button to YouTube DOM
        if(!inputExists){
     
        const input = document.createElement("input");
        input.className = "ytp-chrome-top-buttons" + "input-btn";
        input.type = "text";
        input.title = "Caption this timstamp. Click enter so submit.";

        const submit = document.createElement("button");
        submit.className = "ytp-chrome-top-buttons" + "submit-btn";
        submit.type = "button";
        submit.innerHTML = "Submit";
        submit.onclick = function (){
            var inputVal  = input.value;
           
        
            const currentTime = youtubePlayer.currentTime;
            let videoTitle = document.title.split(" - YouTube")[0];
    
           
            const newBookmark = {
                time: currentTime,
                title: videoTitle,
                desc: "Bookmark at " + getTime(currentTime),
                cap: inputVal
    
            };
    
            currentVideoBookmarks.push(newBookmark);
            currentVideoBookmarks.sort((a, b) => a.time - b.time);
            // saving to local storage
        localStorage.setItem(currentVideo, JSON.stringify(currentVideoBookmarks));
        input.remove();
        submit.remove();

        }

        youtubeTopControls = document.getElementsByClassName("ytp-chrome-top-buttons")[0];
        youtubeTopControls.prepend(input);

        
        youtubeLeftControls =  document.getElementsByClassName("ytp-left-controls")[0];
        youtubeLeftControls.appendChild(submit);
        }

       
        
      

}

    window.removeEventListener('keydown', stopPropagation, true);

    

    
    newVideoLoaded();

})();


const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11,8);
};