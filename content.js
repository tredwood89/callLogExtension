console.log("chrome ext go!!");


chrome.storage.sync.get(['sheetsValue'], function(data){

  console.log(data.sheetsValue);
  let sheetsData = data.sheetsValue
  let searchBar = document.getElementById('navBarQuickContactSearch')
  let createLogButton = document.getElementsByClassName('stopPropagation')[9]
  let notesBox = document.getElementById('Notes')
  let createNoteButton = document.getElementsByClassName('primaryAction')[0]
  let rownum = 1
  let currentRow = sheetsData.shift()


  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.submitClicked === "clearSearch") {
      chrome.storage.sync.set({'currentRow': currentRow})
      searchBar.value = currentRow[0]
    }

  })

  chrome.storage.sync.set({'currentRow': currentRow})
  searchBar.value = currentRow[0]
  createLogButton.addEventListener("click",function(event){
    console.log(event);
  })
  notesBox.value = currentRow[1]
  createNoteButton.addEventListener("click", function(event){
    searchBar.value = ""
    chrome.storage.sync.set({'sheetsValue': sheetsData})
    chrome.runtime.sendMessage({createButtonClicked:"updateCurrentRow"})

  })

  if (sheetsData.length === 0) {
    searchBar.value = ""
    alert('no more rows')
    return
  }


  // function insertNotes(dataArr){
  //
  //   if (dataArr.length === 0){
  //     alert("no more rows")
  //     return
  //   }
  //
  //   if (dataArr.length > 0){
  //     let currentRow = dataArr.shift()
  //     searchBar.value = currentRow[0]
  //     createLogButton.addEventListener("click",function(event){
  //       console.log(event);
  //     })
  //     notesBox.value = currentRow[1]
  //     createNoteButton.addEventListener("click", function(event){
  //       searchBar.value = ""
  //       return insertNotes(dataArr)
  //     })
  //   }
  // }
  //



  // searchBar.value = sheetsData[0][0]
  // let createLogButton = document.getElementsByClassName('stopPropagation')[9]
  // createLogButton.addEventListener("click",function(event){
  //   console.log(event);
  //
  //
  // })
  // let notesBox = document.getElementById('Notes')
  // notesBox.value = sheetsData[0][1]
})
