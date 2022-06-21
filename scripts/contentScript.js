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

    // adding button to YouTube DOM
    const newVideoLoaded = () => {
        


        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0]; 

        if(!bookmarkBtnExists){
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("images/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to save current timestamp";

            youtubeLeftControls =  document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];
            
            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);




        }
    }

    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
            
        };


        console.log(currentVideoBookmarks);

        // saving to local storage

    localStorage.setItem(currentVideo, JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a,b) => a.time -b.time)));

}

    

    
    newVideoLoaded();

})();


const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11,8);
};