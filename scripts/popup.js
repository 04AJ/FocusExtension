
import { getCurrentTab } from "scripts/utils.js";

document.addEventListener("DOMContentLoaded", async () =>{
    const activeTab = await getCurrentTab();
    const queryParameters = activeTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if(activeTab.url.includes("youtube.com/watch") && currentVideo){

    } else{
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = `<div class = "title" >This is not a YouTube video page</div>`;
    }

});

// chrome.runtime.onMessage.addListener(

//     function(request,sender,sendResponse){

//         const{type, videoId} = request;
//         alert("hi")
//         sendResponse()
//         localStorage.clear();


//     }
// );


