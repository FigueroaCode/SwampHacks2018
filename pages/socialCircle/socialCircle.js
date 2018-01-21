document.addEventListener('DOMContentLoaded', () => {
  var backBtn = document.getElementById('backBtn');
  var shortTermGoal = document.getElementById('shortTermGoalID');
  var longTermGoal = document.getElementById('longTermGoalID');
  var shortTermBtn = document.getElementById('shortTermComplete');
  var longTermBtn = document.getElementById('longTermComplete');
  var shortTermLaterBtn = document.getElementById('shortTermCompleteLater');
  var longTermLaterBtn = document.getElementById('longTermCompleteLater');
  var completedGoalsDiv = document.getElementById('completedGoals');
  var completedGoalsList = document.getElementById('completedGoalsList');
  var uncompletedGoalsDiv = document.getElementById('uncompletedGoals');
  var uncompletedGoalsList = document.getElementById('uncompletedGoalsList');
  var clearCompletedGoals = document.getElementById('clearCompletedGoals');
  var clearUncompletedGoals = document.getElementById('clearUncompletedGoals');
  var completedSocialCircleGoals = [];
  var uncompletedSocialCircleGoals = [];
  var socialCircleGoals = {"shortTermGoal": shortTermGoal.value, "longTermGoal": longTermGoal.value};


  //TODO: DELETE THIS.
  var testBtn = document.getElementById('test');

  var loadData = ["completedSocialCircleGoals", "uncompletedSocialCircleGoals", "socialCircleGoals"];

  //Save all data to cache, if it is not null.
  chrome.storage.sync.get(loadData, function(item){
    if(item != null && item != undefined){
      if(item.completedSocialCircleGoals != undefined && item.completedSocialCircleGoals != null){
        completedSocialCircleGoals = item.completedSocialCircleGoals;
        for(var index = 0; index < completedSocialCircleGoals.length; index++){
          completedGoalsList.innerHTML += "<li><h3>" + completedSocialCircleGoals[index] + "</h3></li>";
        }
        completedGoalsDiv.style.display = "block";
      }
      if(item.uncompletedSocialCircleGoals != undefined && item.uncompletedSocialCircleGoals != null){
        uncompletedSocialCircleGoals = item.uncompletedSocialCircleGoals;
        for(var index = 0; index < uncompletedSocialCircleGoals.length; index++){
          uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedSocialCircleGoals[index] + "</h3></li>";
        }
        uncompletedGoalsDiv.style.display = "block";
      }
      if(item.socialCircleGoals != undefined && item.socialCircleGoals != null){
        socialCircleGoals = item.socialCircleGoals;
      }

      shortTermGoal.value = socialCircleGoals["shortTermGoal"];
      longTermGoal.value = socialCircleGoals["longTermGoal"];
    }
  });

  clearCompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("completedSocialCircleGoals");
    completedGoalsDiv.style.display = "none";
    completedGoalsDiv.hide();
  });

  clearUncompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("uncompletedSocialCircleGoals");
    uncompletedGoalsDiv.style.display = "none";
    uncompletedGoalsDiv.hide();
  });

  //Updates the currently tracked short-term goal.
  shortTermGoal.addEventListener("change", function(){
    socialCircleGoals["shortTermGoal"] = shortTermGoal.value;
    chrome.storage.sync.set({"socialCircleGoals": socialCircleGoals});
  });

  //Updates the currently tracked long-term goal.
  longTermGoal.addEventListener("change", function(){
    socialCircleGoals["longTermGoal"] = longTermGoal.value;
    chrome.storage.sync.set({"socialCircleGoals": socialCircleGoals});
  });

  backBtn.addEventListener('click', function(){
    window.location.href = "../reportCard/reportCard.html";
  });

  shortTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      var data = "socialCircleStatus";
      chrome.storage.sync.get(data, function(item){
          var socialCircleStatus = item.socialCircleStatus;

          if(socialCircleStatus < 4){
              socialCircleStatus++;
          }

          chrome.storage.sync.set({"socialCircleStatus": socialCircleStatus.toString()});
      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedSocialCircleGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"completedSocialCircleGoals": completedSocialCircleGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedSocialCircleGoals[completedSocialCircleGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });


  shortTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      uncompletedSocialCircleGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"uncompletedSocialCircleGoals": uncompletedSocialCircleGoals});

      //Reduce the current status by a factor of one.
      var data = "socialCircleStatus";
      chrome.storage.sync.get(data, function(item){
          var socialCircleStatus = item.socialCircleStatus;

          if(socialCircleStatus > 0){
              socialCircleStatus--;
          }

          chrome.storage.sync.set({"socialCircleStatus": socialCircleStatus.toString()});
      });

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedSocialCircleGoals[uncompletedSocialCircleGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(uncompletedGoalsDiv.style.display == null || uncompletedGoalsDiv.style.display == "" || uncompletedGoalsDiv.style.display == undefined ){
        uncompletedGoalsDiv.style.display = "block";
      }
    }
  });

  longTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      var data = "socialCircleStatus";
      chrome.storage.sync.get(data, function(item){
          var socialCircleStatus = item.socialCircleStatus;

          if(socialCircleStatus < 4){
              socialCircleStatus+=2;
          }

          if(socialCircleStatus > 4){
            socialCircleStatus = 4;
          }

          chrome.storage.sync.set({"socialCircleStatus": socialCircleStatus.toString()});

      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedSocialCircleGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"completedSocialCircleGoals": completedSocialCircleGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedSocialCircleGoals[completedSocialCircleGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });

  longTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      uncompletedSocialCircleGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"uncompletedSocialCircleGoals": uncompletedSocialCircleGoals});

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedSocialCircleGoals[uncompletedSocialCircleGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(uncompletedGoalsDiv.style.display == null || uncompletedGoalsDiv.style.display == "" || uncompletedGoalsDiv.style.display == undefined ){
        uncompletedGoalsDiv.style.display = "block";
      }
    }
  });

});
