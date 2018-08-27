$(function(){

  let sheetsId = ''
  let sheetsRange = ''

  let rowTally = 0

  $('#gsheetsId').keyup(function(){
    sheetsId = $(this).val()
  })

  $('#rowRange').keyup(function(){
    sheetsRange = $(this).val()
  })

  $('#getSheetValue').click(function(){
    // chrome.storage.sync.set({'sheetsId':sheetsId});
    // chrome.storage.sync.set({'sheetsRange':sheetsRange});
    // alert(`${sheetsId}, ${sheetsRange}`)
    chrome.runtime.sendMessage({submitClicked:"clearSearch"})

    chrome.storage.sync.get(['token'], function(auth){
      console.log('user token',auth.token);
      // console.log(sheetsId, sheetsRange);
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + auth.token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${sheetsRange}`,
          init)
          .then((response) => response.json())
          .then(function(data) {
            console.log('incoming sheets', data.values)
            if (data.values){
              chrome.storage.sync.set({'sheetsValue': data.values})
              chrome.storage.sync.set({'totalEntries':data.values.length})
              rowTally = 1

              $('#entries').text(` ${data.values.length}`)
              $('#name').text(data.values[0][0])
              $('#note').text(data.values[0][1])
            }
            else {
              alert("Sheet Id or range invalid")
            }
        });
    })
  })

  $('#currentRowDiv').click(function(){
    chrome.storage.sync.get(['currentRow', 'totalEntries'], function(row){
      // console.log('hello from current row');
      if (row.currentRow) {
        // console.log('curr is real');

        $('#entries').text(` ${row.totalEntries}`)
        $('#name').text(row.currentRow[0])
        $('#note').text(row.currentRow[1])
      }
    })
  })

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.createButtonClicked === "updateCurrentRow"){
      // console.log('clicked by create');
      chrome.storage.sync.get(['currentRow', 'totalEntries'], function(row){
        // console.log('hello from current row');
        if (row.currentRow) {
          // console.log('curr is real');
          let entriesRemaining = parseInt(row.totalEntries) - 1
          chrome.storage.sync.set({'totalEntries': entriesRemaining})
          console.log('remaining',entriesRemaining);
          $('entries').text(` ${entriesRemaining}`)
          $('#name').text(row.currentRow[0])
          $('#note').text(row.currentRow[1])
        }
      })

    }

  })

    $('#signin-button').click(function(){
      console.log('on clicked');
      $('#switchBoxOff').hide('fast')
      $('#switchBoxOn').show('fast')
    })

    $('#signout-button').click(function(){
      $('#switchBoxOn').hide('fast')
      $('#switchBoxOff').show('fast')
      $('entries').text("")
      $('#name').text("")
      $('#note').text("")
      chrome.runtime.sendMessage({submitClicked:"clearSearch"})
      chrome.storage.sync.clear()
    })
})
