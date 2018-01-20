// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     if(changeInfo && changeInfo.status == "complete"){
//         chrome.tabs.executeScript(tabId, {file: "jquery.js"}, function(){
//             chrome.tabs.executeScript(tabId, {file: "script.js"});
//         });
//     }
// });
// document.addEventListener('DOMContentLoaded', function(){
//   $('body').append('<h1 id="test">Testing</h1>');
//   $('#test').css({'position': 'absolute', 'margin-top': '50%', 'margin-bottom': '50%', 'font-size': '500px', 'z-index': '-1'});
// });
