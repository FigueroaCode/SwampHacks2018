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
  var completedNutritionGoals = [];
  var uncompletedNutritionGoals = [];
  var nutritionGoals = {"shortTermGoal": shortTermGoal.value, "longTermGoal": longTermGoal.value};


  //TODO: DELETE THIS.
  var testBtn = document.getElementById('test');

  var loadData = ["completedNutritionGoals", "uncompletedNutritionGoals", "nutritionGoals"];

  //Save all data to cache, if it is not null.
  chrome.storage.sync.get(loadData, function(item){
    if(item != null && item != undefined){
      if(item.completedNutritionGoals != undefined && item.completedNutritionGoals != null){
        completedNutritionGoals = item.completedNutritionGoals;
        for(var index = 0; index < completedNutritionGoals.length; index++){
          completedGoalsList.innerHTML += "<li><h3>" + completedNutritionGoals[index] + "</h3></li>";
        }
        completedGoalsDiv.style.display = "block";
      }
      if(item.uncompletedNutritionGoals != undefined && item.uncompletedNutritionGoals != null){
        uncompletedNutritionGoals = item.uncompletedNutritionGoals;
        for(var index = 0; index < uncompletedNutritionGoals.length; index++){
          uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedNutritionGoals[index] + "</h3></li>";
        }
        uncompletedGoalsDiv.style.display = "block";
      }
      if(item.nutritionGoals != undefined && item.nutritionGoals != null){
        nutritionGoals = item.nutritionGoals;
      }

      shortTermGoal.value = nutritionGoals["shortTermGoal"];
      longTermGoal.value = nutritionGoals["longTermGoal"];
    }
  });

  clearCompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("completedNutritionGoals");
    completedGoalsDiv.style.display = "none";
    completedGoalsDiv.hide();
  });

  clearUncompletedGoals.addEventListener('click', function(){
    chrome.storage.sync.remove("uncompletedNutritionGoals");
    uncompletedGoalsDiv.style.display = "none";
    uncompletedGoalsDiv.hide();
  });

  //Updates the currently tracked short-term goal.
  shortTermGoal.addEventListener("change", function(){
    nutritionGoals["shortTermGoal"] = shortTermGoal.value;
    chrome.storage.sync.set({"nutritionGoals": nutritionGoals});
  });

  //Updates the currently tracked long-term goal.
  longTermGoal.addEventListener("change", function(){
    nutritionGoals["longTermGoal"] = longTermGoal.value;
    chrome.storage.sync.set({"nutritionGoals": nutritionGoals});
  });

  backBtn.addEventListener('click', function(){
    window.location.href = "../reportCard/reportCard.html";
  });

  shortTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      var data = "nutritionStatus";
      chrome.storage.sync.get(data, function(item){
          var nutritionStatus = item.nutritionStatus;

          if(nutritionStatus < 4){
              nutritionStatus++;
          }

          chrome.storage.sync.set({"nutritionStatus": nutritionStatus.toString()});
      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedNutritionGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"completedNutritionGoals": completedNutritionGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedNutritionGoals[completedNutritionGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });


  shortTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      uncompletedNutritionGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"uncompletedNutritionGoals": uncompletedNutritionGoals});

      //Reduce the current status by a factor of one.
      var data = "nutritionStatus";
      chrome.storage.sync.get(data, function(item){
          var nutritionStatus = item.nutritionStatus;

          if(nutritionStatus > 0){
              nutritionStatus--;
          }

          chrome.storage.sync.set({"nutritionStatus": nutritionStatus.toString()});
      });

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedNutritionGoals[uncompletedNutritionGoals.length - 1] + "</h3></li>"
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
      var data = "nutritionStatus";
      chrome.storage.sync.get(data, function(item){
          var nutritionStatus = item.nutritionStatus;

          if(nutritionStatus < 4){
              nutritionStatus+=2;
          }

          if(nutritionStatus > 4){
            nutritionStatus = 4;
          }

          chrome.storage.sync.set({"nutritionStatus": nutritionStatus.toString()});

      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedNutritionGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"completedNutritionGoals": completedNutritionGoals});

      //Add the latest completed goal to the inner html.
      completedGoalsList.innerHTML += "<li><h3>" + completedNutritionGoals[completedNutritionGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(completedGoalsDiv.style.display == null || completedGoalsDiv.style.display == "" || completedGoalsDiv.style.display == undefined ){
        completedGoalsDiv.style.display = "block";
      }
    }

  });

  longTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      uncompletedNutritionGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"uncompletedNutritionGoals": uncompletedNutritionGoals});

      //Add the latest uncompleted goal to the inner html.
      uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedNutritionGoals[uncompletedNutritionGoals.length - 1] + "</h3></li>"
      console.log(completedGoalsDiv.style.display);
      if(uncompletedGoalsDiv.style.display == null || uncompletedGoalsDiv.style.display == "" || uncompletedGoalsDiv.style.display == undefined ){
        uncompletedGoalsDiv.style.display = "block";
      }
    }
  });

});
