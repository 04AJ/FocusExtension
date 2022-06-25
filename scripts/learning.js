let videoList = JSON.parse(localStorage.getItem("videoList"));
console.log(videoList);
const list = document.getElementsByClassName("list");

videoList.forEach(key => {

    let listItems = "";
    if(JSON.parse(localStorage).getItem(key)){
        listItems += `
        <li>
            <a target = '_blank'> 
            ${key} 

            </a>
        </li>
    `
    }
});

list.innerHTML = listItems;
