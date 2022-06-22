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

        // creating form
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "submit.php");

        
        // adding input to YouTube DOM
        const inputBtn = document.createElement("input");
        inputBtn.className = "ytp-chrome-top-buttons" + "input-btn";
        inputBtn.type = "text";
        inputBtn.title = "Caption this timstamp";
    
        youtubeTopControls = document.getElementsByClassName("ytp-chrome-top-buttons")[0];
        
        youtubeTopControls.prepend(inputBtn);


        const currentTime = youtubePlayer.currentTime;
 
        // getting currentVideo title
        let videoTitle = document.title.split(" - YouTube")[0];

       
        const newBookmark = {
            time: currentTime,
            title: videoTitle,
            desc: "Bookmark at " + getTime(currentTime),
            cap: inputBtn.value

        };

        currentVideoBookmarks.push(newBookmark);
        currentVideoBookmarks.sort((a, b) => a.time - b.time);
        // saving to local storage
    localStorage.setItem(currentVideo, JSON.stringify(currentVideoBookmarks));

}

    window.removeEventListener('keydown', stopPropagation, true);

    

    
    newVideoLoaded();

})();


const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11,8);
};