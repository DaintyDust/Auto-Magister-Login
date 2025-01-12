chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['/js/login.js']
    });
  }
});

chrome.runtime.onInstalled.addListener(function () {
  // open options.html
  chrome.storage.sync.set({
    "enabled": true
  });
  chrome.action.setIcon({
    path: {
      "16":"/icons/On/16x.png",
      "32":"/icons/On/32x.png",
      "48":"/icons/On/48x.png",
      "128":"/icons/On/128x.png",
      "256":"/icons/On/256x.png"
    }
  });
});