

// NOT WORKING - check console
chrome.storage.sync.get(['videoList'], function (result) {
    let videoList = result.videoList;

    const ui = document.getElementById("list");
    let listItems = "";


      
      chrome.storage.sync.get(videoList, function (result) {
        var lists = Object.keys(result);
        for(let i = 0; i < lists.length; i++){
            var list = lists[i];
            var arr = result[list];
            console.log(arr);
            listItems += `<h1 style = "margin-top: 1.5rem" >` + arr[0].title + "</h1>";
            var videoId = lists[i]
            listItems += `<iframe style = "margin-bottom: 1rem" width="560" height="315" src="https://www.youtube.com/embed/` + videoId +  `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            arr.forEach(obj => {
              listItems += `
              <li style = "color: white;">
              <h2> <a style = "color: white;font-weight: 200 " href = "${obj.link}" target="_blank">${obj.desc}</a></h2> 
              <h2 style = " font-weight: 100" >Caption:  "${obj.cap}"</h2>
             

          
              </li>
              `
              // console.log("caption: " + obj.cap);
              // console.log("description: " + obj.desc);
              // console.log("link: " + obj.link);
              // console.log("time: " + obj.time);
              // console.log("title: " + obj.title);
            });
           
           

        }

        ui.innerHTML = listItems;
    
        });
      

      
    
  
      
   
    });





const btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", ()=> {
    win = window.open('https://youtube.com/', '_blank'); 

});

// function getValue(callback) {
//     chrome.storage.sync.get("a3", callback);
//   }


 
//   getValue(function (value) {
//     let text = value;
//     console.log(JSON.parse(text));
 
    
//   }); 