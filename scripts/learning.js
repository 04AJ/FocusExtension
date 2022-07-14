
chrome.storage.sync.get(['videoList'], function (result) {
    let videoList = result.videoList;

    const list = document.getElementById("list");
    let listItems = "";
    videoList.forEach(key => {


    listItems += `
    <li>
        ${key} 

    </li>
    `

    });
  

    list.innerHTML = listItems;


});

const btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", ()=> {
    win = window.open('https://youtube.com/', '_blank'); 

});






