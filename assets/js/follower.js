// https://poshmark.com/user/katef/followers

function scanUnfollowedUsers() {
  // items = document.querySelectorAll('.follow__btn.btn--primary:not(.f-hide)');
  items = document.querySelectorAll(".auth-required.btn.blue:not(.f-hide)");

  if (items.length == 0) {
    showMessage("success", "The following is now DONE", 9999);
    return;
  }

  showMessage("success", "The following procces has stared", 9999);

  var index = 0;
  var interval = setInterval(function () {
    if (index == items.length) {
      clearInterval(interval);
      tryToFollowNewUsers();
    } else if (areYouARobot()) {
      showMessage(
        "warning",
        "Please confirm that you are not a robot and start again",
        9999
      );
      clearInterval(interval);
    } else {
      clickAndFollowUser(items[index]);
    }
    index++;
  }, 1000);
}

function clickAndFollowUser(item) {
  if (item.classList.contains(".chrome-clicked")) {
    return;
  }

  item.click();

  item.scrollIntoView(false);
  window.scrollBy(0, 100);

  item.classList.add("chrome-clicked");
  $(item)
    .closest(".item-content")
    .css("background-color", "rgba(0, 0, 0, 0.1)");
}

function tryToFollowNewUsers() {
  showMessage("success", "Please wait... we are looking for more users", 9999);
  window.scrollTo(0, document.body.scrollHeight);
  var interval = setInterval(function () {
    clearInterval(interval);
    scanUnfollowedUsers();
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

function showMessage(type, title, timer) {
  Swal.fire({
    position: "bottom-end",
    type: type,
    title: title,
    showConfirmButton: false,
    timer: timer,
  });
}
