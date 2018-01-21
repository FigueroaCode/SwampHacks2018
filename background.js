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
function getRandomGoals(){
  var ran = Math.floor(Math.random() * 4);//5 topics in total
  if()
  chrome.storage.sync.get('', function(items){
    if(items != null && items != undefined){
      console.log('goal items', items);

    }
  });
}

chrome.alarms.onAlarm.addListener(function(alarm){
    var goals = getRandomGoals();
    //display the users goals
    var opt = {
      type: 'list',
      title: 'Things to work for!',
      message: 'Don\'t forget you were trying to achieve this.',
      items: goals
    };
    //chrome.notifications.create('goalNotification', opt);
});
