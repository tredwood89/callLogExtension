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
    chrome.storage.sync.set({'sheetsId':sheetsId});
    chrome.storage.sync.set({'sheetsRange':sheetsRange});
    alert("clicked ")
  })

})
