let shareClosetBtn = document.getElementById("shareClosetBtn");

shareClosetBtn.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { code: "scanItemsFromCloset();" });
  });
};

let followUsersBtn = document.getElementById("followUsersBtn");

followUsersBtn.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { code: "tryToFollowNewUsers();" });
  });
};
