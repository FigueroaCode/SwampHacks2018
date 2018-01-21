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
  var completedFitnessGoals = [];
  var uncompletedFitnessGoals = [];
  var fitnessGoals = {"shortTermGoal": shortTermGoal.value, "longTermGoal": longTermGoal.value};


  //TODO: DELETE THIS.
  var testBtn = document.getElementById('test');

  var loadData = ["completedFitnessGoals", "uncompletedFitnessGoals", "fitnessGoals"];

  //Save all data to cache, if it is not null.
  chrome.storage.sync.get(loadData, function(item){
    if(item != null && item != undefined){
      if(item.completedFitnessGoals != undefined && item.completedFitnessGoals != null){
        completedFitnessGoals = item.completedFitnessGoals;
        for(var index = 0; index < completedFitnessGoals.length; index++){
          completedGoalsList.innerHTML += "<li><h3>" + completedFitnessGoals[index] + "</h3></li>";
        }
        completedGoalsDiv.style.display = "block";
      }
      if(item.uncompletedFitnessGoals != undefined && item.uncompletedFitnessGoals != null){
        uncompletedFitnessGoals = item.uncompletedFitnessGoals;
        for(var index = 0; index < uncompletedFitnessGoals.length; index++){
          uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedFitnessGoals[index] + "</h3></li>";
        }
        uncompletedGoalsDiv.style.display = "block";
      }
      if(item.fitnessGoals != undefined && item.fitnessGoals != null){
        fitnessGoals = item.fitnessGoals;
      }

      shortTermGoal.value = fitnessGoals["shortTermGoal"];
      longTermGoal.value = fitnessGoals["longTermGoal"];
    }
  });

  clearCompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("completedFitnessGoals");
    completedGoalsDiv.style.display = "none";
    completedGoalsDiv.hide();
  });

  clearUncompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("uncompletedFitnessGoals");
    uncompletedGoalsDiv.style.display = "none";
    uncompletedGoalsDiv.hide();
  });

  //Updates the currently tracked short-term goal.
  shortTermGoal.addEventListener("change", function(){
    fitnessGoals["shortTermGoal"] = shortTermGoal.value;
    chrome.storage.sync.set({"fitnessGoals": fitnessGoals});
  });

  //Updates the currently tracked long-term goal.
  longTermGoal.addEventListener("change", function(){
    fitnessGoals["longTermGoal"] = longTermGoal.value;
    chrome.storage.sync.set({"fitnessGoals": fitnessGoals});
  });

  backBtn.addEventListener('click', function(){
    window.location.href = "../reportCard/reportCard.html";
  });

  shortTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      var data = "fitnessStatus";
      chrome.storage.sync.get(data, function(item){
          var fitnessStatus = item.fitnessStatus;

          if(fitnessStatus < 4){
              fitnessStatus++;
          }

          chrome.storage.sync.set({"fitnessStatus": fitnessStatus.toString()});
      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedFitnessGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"completedFitnessGoals": completedFitnessGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedFitnessGoals[completedFitnessGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });


  shortTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      uncompletedFitnessGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"uncompletedFitnessGoals": uncompletedFitnessGoals});

      //Reduce the current status by a factor of one.
      var data = "fitnessStatus";
      chrome.storage.sync.get(data, function(item){
          var fitnessStatus = item.fitnessStatus;

          if(fitnessStatus > 0){
              fitnessStatus--;
          }

          chrome.storage.sync.set({"fitnessStatus": fitnessStatus.toString()});
      });

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedFitnessGoals[uncompletedFitnessGoals.length - 1] + "</h3></li>"
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
      var data = "fitnessStatus";
      chrome.storage.sync.get(data, function(item){
          var fitnessStatus = item.fitnessStatus;

          if(fitnessStatus < 4){
              fitnessStatus+=2;
          }

          if(fitnessStatus > 4){
            fitnessStatus = 4;
          }

          chrome.storage.sync.set({"fitnessStatus": fitnessStatus.toString()});

      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedFitnessGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"completedFitnessGoals": completedFitnessGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedFitnessGoals[completedFitnessGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });

  longTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      uncompletedFitnessGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"uncompletedFitnessGoals": uncompletedFitnessGoals});

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedFitnessGoals[uncompletedFitnessGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(uncompletedGoalsDiv.style.display == null || uncompletedGoalsDiv.style.display == "" || uncompletedGoalsDiv.style.display == undefined ){
        uncompletedGoalsDiv.style.display = "block";
      }
    }
  });

});
