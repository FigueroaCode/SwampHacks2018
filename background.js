function getRandomGoals(){
  var ran = Math.floor(Math.random() * 5);//5 topics in total
  //Choose a random topic
  //ran == 0 then financeGoals
  var topic = "financeGoals";
  // if(ran == 1){
  //   //Mental Health
  //   topic = "mentalHealthGoals";
  // }else if(ran == 2){
  //   //Nutrition
  //   topic = "nutritionGoals";
  // }else if(ran == 3){
  //   //Fitness
  //   topic = "fitnessGoals";
  // }else if(ran == 4){
  //   //Social Circle
  //   topic = "socialCircleGoals";
  // }

  return topic;
}

chrome.alarms.onAlarm.addListener(function(alarm){
    var topic = getRandomGoals();
    chrome.storage.sync.get(topic, function(items){
      console.log(items[topic].shortTermGoal);
      if(items != null && items != undefined && items[topic].shortTermGoal != undefined && items[topic].longTermGoal != undefined){
        //display the users goals
        var opt = {
          type: 'list',
          iconUrl: '../../resources/icon.png',
          title: 'Things to work for!',
          message: 'Don\'t forget you were trying to achieve this.',
          items: [{title: 'Short Term Goal', message: items[topic].shortTermGoal},{title: 'Long Term Goal', message: items[topic].longTermGoal}]
        };
        chrome.notifications.create('goalNotification',opt);
      }
    });
});


console.log('running')
