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
  var completedMentalHealthGoals = [];
  var uncompletedMentalHealthGoals = [];
  var mentalHealthGoals = {"shortTermGoal": shortTermGoal.value, "longTermGoal": longTermGoal.value};


  //TODO: DELETE THIS.
  var testBtn = document.getElementById('test');

  var loadData = ["completedMentalHealthGoals", "uncompletedMentalHealthGoals", "mentalHealthGoals"];

  //Save all data to cache, if it is not null.
  chrome.storage.sync.get(loadData, function(item){
    if(item != null && item != undefined){
      if(item.completedMentalHealthGoals != undefined && item.completedMentalHealthGoals != null){
        completedMentalHealthGoals = item.completedMentalHealthGoals;
        for(var index = 0; index < completedMentalHealthGoals.length; index++){
          completedGoalsList.innerHTML += "<li><h3>" + completedMentalHealthGoals[index] + "</h3></li>";
        }
        completedGoalsDiv.style.display = "block";
      }
      if(item.uncompletedMentalHealthGoals != undefined && item.uncompletedMentalHealthGoals != null){
        uncompletedMentalHealthGoals = item.uncompletedMentalHealthGoals;
        for(var index = 0; index < uncompletedMentalHealthGoals.length; index++){
          uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedMentalHealthGoals[index] + "</h3></li>";
        }
        uncompletedGoalsDiv.style.display = "block";
      }
      if(item.mentalHealthGoals != undefined && item.mentalHealthGoals != null){
        mentalHealthGoals = item.mentalHealthGoals;
      }

      shortTermGoal.value = mentalHealthGoals["shortTermGoal"];
      longTermGoal.value = mentalHealthGoals["longTermGoal"];
    }
  });

  clearCompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("completedMentalHealthGoals");
    completedGoalsDiv.style.display = "none";
    completedGoalsDiv.hide();
  });

  clearUncompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("uncompletedMentalHealthGoals");
    uncompletedGoalsDiv.style.display = "none";
    uncompletedGoalsDiv.hide();
  });

  //Updates the currently tracked short-term goal.
  shortTermGoal.addEventListener("change", function(){
    mentalHealthGoals["shortTermGoal"] = shortTermGoal.value;
    chrome.storage.sync.set({"mentalHealthGoals": mentalHealthGoals});
  });

  //Updates the currently tracked long-term goal.
  longTermGoal.addEventListener("change", function(){
    mentalHealthGoals["longTermGoal"] = longTermGoal.value;
    chrome.storage.sync.set({"mentalHealthGoals": mentalHealthGoals});
  });

  backBtn.addEventListener('click', function(){
    window.location.href = "../reportCard/reportCard.html";
  });

  shortTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      var data = "mentalHealthStatus";
      chrome.storage.sync.get(data, function(item){
          var mentalHealthStatus = item.mentalHealthStatus;

          if(mentalHealthStatus < 4){
              mentalHealthStatus++;
          }

          chrome.storage.sync.set({"mentalHealthStatus": mentalHealthStatus.toString()});
      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedMentalHealthGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"completedMentalHealthGoals": completedMentalHealthGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedMentalHealthGoals[completedMentalHealthGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });


  shortTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      uncompletedMentalHealthGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"uncompletedMentalHealthGoals": uncompletedMentalHealthGoals});

      //Reduce the current status by a factor of one.
      var data = "mentalHealthStatus";
      chrome.storage.sync.get(data, function(item){
          var mentalHealthStatus = item.mentalHealthStatus;

          if(mentalHealthStatus > 0){
              mentalHealthStatus--;
          }

          chrome.storage.sync.set({"mentalHealthStatus": mentalHealthStatus.toString()});
      });

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedMentalHealthGoals[uncompletedMentalHealthGoals.length - 1] + "</h3></li>"
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
      var data = "mentalHealthStatus";
      chrome.storage.sync.get(data, function(item){
          var mentalHealthStatus = item.mentalHealthStatus;

          if(mentalHealthStatus < 4){
              mentalHealthStatus+=2;
          }

          if(mentalHealthStatus > 4){
            mentalHealthStatus = 4;
          }

          chrome.storage.sync.set({"mentalHealthStatus": mentalHealthStatus.toString()});

      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedMentalHealthGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"completedMentalHealthGoals": completedMentalHealthGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedMentalHealthGoals[completedMentalHealthGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });

  longTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      uncompletedMentalHealthGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"uncompletedMentalHealthGoals": uncompletedMentalHealthGoals});

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedMentalHealthGoals[uncompletedMentalHealthGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(uncompletedGoalsDiv.style.display == null || uncompletedGoalsDiv.style.display == "" || uncompletedGoalsDiv.style.display == undefined ){
        uncompletedGoalsDiv.style.display = "block";
      }
    }
  });

});
