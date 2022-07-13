
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
    console.log(listItems)

    list.innerHTML = listItems;


});




