
// finding active tab and checking if it's a youtube vid
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if(tab.url && tab.url.includes("youtube.com/watch")){
        // creating unique id for each vid
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        console.log(urlParameters);

        // sending message to contentScript 
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v")
        });

    }

    
})