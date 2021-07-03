// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
console.log("loaded");
chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0];
    if (currTab) { // Sanity check
      const tabId = currTab.id;
      chrome.scripting.executeScript(
          {
            target: {tabId: tabId},
            files: ['copyflip.js'],
          },
          () => { 
            
          });
        }
  });
});
  
    
 
  
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  switch (command) {
    case "fliprtl":
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currTab = tabs[0];
        if (currTab) { // Sanity check
          const tabId = currTab.id;
          chrome.scripting.executeScript(
              {
                target: {tabId: tabId},
                files: ['pasteflip.js'],
              },
              () => { 
                
              });
            }
      });
      
     
      break;
      case "copyfliprtl":
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var currTab = tabs[0];
          if (currTab) { // Sanity check
            const tabId = currTab.id;
            chrome.scripting.executeScript(
                {
                  target: {tabId: tabId},
                  files: ['copyflip.js'],
                },
                () => { 
                  
                });
              }
        });
        
       
        break;
    default:
      break;
  }
});


