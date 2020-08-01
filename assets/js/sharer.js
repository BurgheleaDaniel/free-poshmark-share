function scanItemsFromCloset() {
  // items = document.querySelectorAll('.share-gray-large:not(.chrome-clicked)');
  items = document.querySelectorAll(".share-gray:not(.chrome-clicked)");

  if (items.length == 0) {
    showMessage("success", "The sharing is now DONE", 9999);
    return;
  }

  showMessage("success", "The sharing procces has stared", 9999);

  var index = 0;
  var interval = setInterval(function () {
    if (index == items.length) {
      clearInterval(interval);
      tryToAddNewItemsInCloset();
    } else if (areYouARobot()) {
      showMessage(
        "warning",
        "Please confirm that you are not a robot and start again",
        9999
      );
      clearInterval(interval);
    } else {
      openShareListingPopup(items[index], shareListingToMyFollowers);
    }
    index++;
  }, 1000);
}

function openShareListingPopup(item, callback) {
  item.click();
  item.scrollIntoView(false);
  window.scrollBy(0, 100);

  item.classList.add("chrome-clicked");
  $(item).closest(".tile").css("background-color", "rgba(0, 0, 0, 0.1)");

  var interval = setInterval(function () {
    callback();
    clearInterval(interval);
  }, 500);
}

function shareListingToMyFollowers() {
  // var linkPopupShare = document.querySelectorAll('.share-wrapper-container')[0];
  var linkPopupShare = document.querySelectorAll(".share-wrapper-con")[0];

  if (linkPopupShare) {
    linkPopupShare.click();
  } else {
    // showMessage('warning', 'Please check if you are logged in!', 2000);
    // document.location.assign('/login');
  }
}

function tryToAddNewItemsInCloset() {
  amIOnAvailableItemsPage();

  showMessage("success", "Please wait... we are looking for more items", 9999);
  window.scrollTo(0, document.body.scrollHeight);
  var interval = setInterval(function () {
    clearInterval(interval);
    scanItemsFromCloset();
  }, 5000);
}

function areYouARobot() {
  if ($("#captcha-popup").css("display") == "block") {
    return true;
  }

  return false;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function amIOnAvailableItemsPage() {
  return true;

  var field = "availability";
  var url = window.location.href;
  if (url.indexOf("?" + field + "=") != -1) {
    return true;
  } else if (url.indexOf("&" + field + "=") != -1) {
    return true;
  }

  url = new URL(document.location);
  url.searchParams.set("availability", "available");
  document.location.assign(url.href);
}

function showMessage(type, title, timer) {
  Swal.fire({
    position: "bottom-end",
    type: type,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}
