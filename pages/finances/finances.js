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
  var completedFinanceGoals = [];
  var uncompletedFinanceGoals = [];
  var financeGoals = {"shortTermGoal": shortTermGoal.value, "longTermGoal": longTermGoal.value};


  //TODO: DELETE THIS.
  var testBtn = document.getElementById('test');

  testBtn.addEventListener('click', function(){
    console.log(financeGoals);
    chrome.storage.sync.remove("completedFinanceGoals");
    chrome.storage.sync.remove("uncompletedFinanceGoals");
  });

  var loadData = ["completedFinanceGoals", "uncompletedFinanceGoals", "financeGoals"];

  //Save all data to cache, if it is not null.
  chrome.storage.sync.get(loadData, function(item){
    if(item != null && item != undefined){
      if(item.completedFinanceGoals != undefined && item.completedFinanceGoals != null){
        completedFinanceGoals = item.completedFinanceGoals;
        for(var index = 0; index < completedFinanceGoals.length; index++){
          completedGoalsList.innerHTML += "<li><h3>" + completedFinanceGoals[index] + "</h3></li>";
        }
        completedGoalsDiv.style.display = "block";
      }
      if(item.uncompletedFinanceGoals != undefined && item.uncompletedFinanceGoals != null){
        uncompletedFinanceGoals = item.uncompletedFinanceGoals;
        for(var index = 0; index < uncompletedFinanceGoals.length; index++){
          uncompletedGoalsList.innerHTML += "<li><h3>" + uncompletedFinanceGoals[index] + "</h3></li>";
        }
        uncompletedGoalsDiv.style.display = "block";
      }
      if(item.financeGoals != undefined && item.financeGoals != null){
        financeGoals = item.financeGoals;
      }

      shortTermGoal.value = financeGoals["shortTermGoal"];
      longTermGoal.value = financeGoals["longTermGoal"];
    }
  });


  //Updates the currently tracked short-term goal.
  shortTermGoal.addEventListener("change", function(){
    financeGoals["shortTermGoal"] = shortTermGoal.value;
    chrome.storage.sync.set({"financeGoals": financeGoals});
  });

  //Updates the currently tracked long-term goal.
  longTermGoal.addEventListener("change", function(){
    financeGoals["longTermGoal"] = longTermGoal.value;
    chrome.storage.sync.set({"financeGoals": financeGoals});
  });

  backBtn.addEventListener('click', function(){
    window.location.href = "../reportCard/reportCard.html";
  });

  shortTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      var data = "financesStatus";
      chrome.storage.sync.get(data, function(item){
          var financesStatus = item.financesStatus;

          if(financesStatus < 4){
              financesStatus++;
          }

          chrome.storage.sync.set({"financesStatus": financesStatus.toString()});
      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedFinanceGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"completedFinanceGoals": completedFinanceGoals});
    }

  });


  shortTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( shortTermGoal.value != "" && shortTermGoal.value != null && shortTermGoal.value != undefined){
      uncompletedFinanceGoals.push(shortTermGoal.value);
      shortTermGoal.value = "";
      chrome.storage.sync.remove("shortTermGoal");
      chrome.storage.sync.set({"uncompletedFinanceGoals": uncompletedFinanceGoals});

      //Reduce the current status by a factor of one.
      var data = "financesStatus";
      chrome.storage.sync.get(data, function(item){
          var financesStatus = item.financesStatus;

          if(financesStatus > 0){
              financesStatus--;
          }

          chrome.storage.sync.set({"financesStatus": financesStatus.toString()});
      });
    }
  });

  longTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      var data = "financesStatus";
      chrome.storage.sync.get(data, function(item){
          var financesStatus = item.financesStatus;

          if(financesStatus < 4){
              financesStatus+=2;
          }

          if(financesStatus > 4){
            financesStatus = 4;
          }

          chrome.storage.sync.set({"financesStatus": financesStatus.toString()});
      });

      //Save the current goal to the list of all goals completed, store in cache.
      completedFinanceGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"completedFinanceGoals": completedFinanceGoals});
    }

  });

  longTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    if( longTermGoal.value != "" && longTermGoal.value != null && longTermGoal.value != undefined){
      uncompletedFinanceGoals.push(longTermGoal.value);
      longTermGoal.value = "";
      chrome.storage.sync.remove("longTermGoal");
      chrome.storage.sync.set({"uncompletedFinanceGoals": uncompletedFinanceGoals});
    }
  });

});
