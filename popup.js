$(function(){

  let sheetsId = ''
  let sheetsRange = ''

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

    chrome.storage.sync.get(['token'], function(auth){
      console.log(auth.token);
      console.log(sheetsId, sheetsRange);
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
            console.log(data.values)
            chrome.storage.sync.set({'sheetsValue': data.values})
          });
    })
  })
})
