// chrome.browserAction.onClicked.addListener(function() {
//   chrome.tabs.create({url: 'popup.html'});
// });

chrome.browserAction.setPopup({popup:"popup.html"})
// let init = {
//   method: 'GET',
//   async: true,
//   headers: {
//     Authorization: 'Bearer ' + token,
//     'Content-Type': 'application/json'
//   },
//   'contentType': 'json'
// };
// fetch(
//     'https://sheets.googleapis.com/v4/spreadsheets//values/A2:B10',
//     init)
//     .then((response) => response.json())
//     .then(function(data) {
//       console.log(data)
//     });
