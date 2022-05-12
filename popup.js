document.addEventListener("DOMContentLoaded", documentEvents, false);

function documentEvents() {
  const clearBtn = document.getElementById("clear");
  const submitBtn = document.getElementById("submit");
  const autoBtn = document.getElementById("auto");
  const inputTxt = document.getElementById("imgCssInput");

  submitBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        cmd: "setCss",
        css: convertIntoCss(inputTxt.value),
      });
      chrome.storage.sync.set({ image: inputTxt.value }, () => {});
      inputTxt.value = "";
    });

    const notifOptions = {
      type: "basic",
      iconUrl: "images/background48.png",
      title: "Background notifcation",
      message: "Manually added your stylesheet!",
    };
    chrome.notifications.create("", notifOptions, function () {
      console.log("Error:", chrome.runtime.lastError);
    });
  });

  clearBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { cmd: "clearCss" });

      chrome.storage.sync.set({ image: "" }, () => {});
    });
  });

  autoBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { cmd: "fixCss" });
    });
    const notifOptions = {
      type: "basic",
      iconUrl: "images/background48.png",
      title: "Background notifcation",
      message: "Auto fixed!",
    };
    chrome.notifications.create("", notifOptions, function () {
      console.log("Error:", chrome.runtime.lastError);
    });
  });

}




function convertIntoCss(url) {
  const css = document.createElement(url);
  css.href = testing[i];
 css.rel = "stylesheet";
 css.type = "text/css";
 css.id = "extension";
 return css;
}
