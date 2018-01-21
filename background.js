function getRandomGoals(){
  var ran = Math.floor(Math.random() * 5);//5 topics in total
  //Choose a random topic
  //ran == 0 then financeGoals
  var topic = "financeGoals";
  if(ran == 1){
    //Mental Health
    topic = "mentalHealthGoals";
  }else if(ran == 2){
    //Nutrition
    topic = "nutritionGoals";
  }else if(ran == 3){
    //Fitness
    topic = "fitnessGoals";
  }else if(ran == 4){
    //Social Circle
    topic = "socialCircleGoals";
  }
  chrome.storage.sync.get(topic, function(items){
    if(items != null && items != undefined){
      console.log('goal items', items);
      return items;
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
    chrome.notifications.create('goalNotification', opt);
});
