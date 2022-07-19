const btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", ()=> {
    win = window.open('https://youtube.com/', '_blank'); 

});

     async function findBtn(i, videoId, vidList){
          let className = `delBtn${i}`;
          let myPromise =  new Promise(function(resolve, reject){
            resolve(  document.getElementsByClassName(className)[0]);
          })
          delBtn(await myPromise, videoId, i, vidList);
        }
          // ADD REMOVE FUNCTION
        function delBtn (btn, id, index, vidList){
          btn.addEventListener("click", ()=>{
            location.reload();
            chrome.storage.sync.remove(id), function(){
              vidList.splice(index, 1);
              chrome.storage.sync.set({"videoList": vidList});
              
            };
            
          });
        }
        

chrome.storage.sync.get(['videoList'], function (result) {
    let videoList = result.videoList;

    const ui = document.getElementById("list");
    let listItems = "";


      
      chrome.storage.sync.get(videoList, function (result) {
        var lists = Object.keys(result);
        for(let i = 0; i < lists.length; i++){
            var list = lists[i];
            var arr = result[list];
            var src = chrome.runtime.getURL("images/delete.png");
            listItems += `<img class = "delBtn${i}" style = "position: absolute; left: 1vw" src="${src}"> <h1 class = "vidTitle" style = "margin-top: 1.5rem" >` + arr[0].title + "</h1>";
            var videoId = lists[i];
            listItems += `<iframe style = "margin-bottom: 1rem" width="560" height="315" src="https://www.youtube.com/embed/` + videoId +  `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            arr.forEach(obj => {
              listItems += `
              <li style = "color: white;">
              <h2> <a style = "color: white;font-weight: 200 " href = "${obj.link}" target="_blank">${obj.desc}</a></h2> 
              <h2 style = " font-weight: 100" >Caption:  "${obj.cap}"</h2>
              
              </li>
              `
          
            });
           
          

        }

        ui.innerHTML = listItems;
      
   
        
        

        for(let j = 0; j<videoList.length; j++){
          findBtn(j, videoList[j], videoList);
        }
      
   
      });
  
     
    
        });
      


  
 

   



 