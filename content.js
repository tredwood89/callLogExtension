console.log("chrome ext go!!");

chrome.storage.sync.get(['sheetsValue'], function(data){
  console.log(data.sheetsValue);
  let sheetsData = data.sheetsValue
  let searchBar = document.getElementById('navBarQuickContactSearch')
  searchBar.value = sheetsData[0][0]
  let createLogButton = document.getElementsByClassName('stopPropagation')[9]
  createLogButton.addEventListener("click",function(event){
    console.log(event);
  

  })
  let notesBox = document.getElementById('Notes')
  notesBox.value = sheetsData[0][1]


})
