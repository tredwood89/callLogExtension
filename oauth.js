window.onload = function() {
    document.getElementById('signin-button').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
      chrome.storage.sync.set({ 'token': token });
      
      });
    });
  };
