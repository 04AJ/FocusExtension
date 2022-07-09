var http = require('http');
const {finalVidList} = require('./contentScript');

alert(finalVidList);

let videoList = JSON.parse(localStorage.getItem("videoList"));
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




