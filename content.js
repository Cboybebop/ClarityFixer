function fixCss(){
setTimeout(function() {
  var test = document.querySelectorAll('iframe')[0].contentDocument.styleSheets;
var testing =[];

for (let i = 0; i < test.length; i++) {
  if(test.item(i).href) {
testing.push(test.item(i).href.substr(0, test.item(i).href.lastIndexOf("&")));
//console.log(test.item(i).href.substr(0, test.item(i).href.lastIndexOf("&")));
console.log("Stylesheet pushed");
}
}

for (let i = 0; i < testing.length; i++) {
let link = document.createElement("link");
  link.href = testing[i];
  link.rel = "stylesheet";
  link.type = "text/css";
  link.id = "extension";
  frames[0].document.head.appendChild(link);
  console.log("Stylesheet linked");
}
}, 500);
//End of fixCss
}


function loadCSS(css) {
  frames[0].document.head.appendChild(css);
}

function unloadCSS() {
  //var forCss = document.getElementById("extension");
  //forCss?.parentNode?.removeChild(cssNode);
}

function setCss(css) {
  unloadCSS();
  setTimeout(() => loadCSS(css));
}

chrome.runtime.onMessage.addListener((req, p1, p2) => {
  if (req.cmd === "setCss") {
    //Adding stylesheet manually
    setCss(req.css);
  } else if (req.cmd === "clearCss") {
    //Reseting all changes
    unloadCSS();
  } else if (req.cmd === "fetchCss") {
    chrome.storage.sync.get("image", (url) => {
     if (url.image) {
       setCss(convertIntoCss(url.image));
     }
   });
 } else if (req.cmd === "fixCss") {
//Attempt autofix
// Recordings
if (window.location.href.indexOf("impressions") > -1) {
document.getElementById("clarity-snapshot-iframe").addEventListener("load", fixCss);
fixCss();
console.log("Attempted recording fix");
} else if (window.location.href.indexOf("heatmaps") > -1) {
  const buttons = document.querySelectorAll('.ms-Button')
buttons.forEach(function(crntBtn){
  crntBtn.addEventListener('click', fixCss)
})
  fixCss();
  console.log("Attempted heatmap fix");
} else {fixCss();}
  }
});

function convertIntoCss(url) {
  const css = document.createElement(url);
  css.href = testing[i];
  css.rel = "stylesheet";
  css.type = "text/css";
  css.id = "extension";
  return css;
}
