document.addEventListener('DOMContentLoaded', () => {
  var backBtn = document.getElementById('backBtn');
  var shortTermGoal = document.getElementById('shortTermGoalID');
  var longTermGoal = document.getElementById('longTermGoalID');
  var shortTermBtn = document.getElementById('shortTermComplete');
  var longTermBtn = document.getElementById('longTermComplete');
  var shortTermLaterBtn = document.getElementById('shortTermCompleteLater');
  var longTermLaterBtn = document.getElementById('longTermCompleteLater');
  var completedFinanceGoals = [];
  var uncompletedGoals = [];
  var financeGoals = {"shortTermGoal": shortTermGoal.value, "longTermGoal": longTermGoal.value};


  //TODO: DELETE THIS.
  var testBtn = document.getElementById('test');

  testBtn.addEventListener('click', function(){
    console.log(financeGoals);
  });

  var loadData = ["completedFinanceGoals", "uncompletedGoals", "financeGoals"];

  //Save all data to cache, if it is not null.
  chrome.storage.sync.get(loadData, function(item){
    if(item != null && item != undefined){
      if(item.completedFinanceGoals != undefined && item.completedFinanceGoals != null)
        completedFinanceGoals = item.completedFinanceGoals;
      if(item.uncompletedGoals != undefined && item.uncompletedGoals != null)
        uncompletedGoals = item.uncompletedGoals;
      if(item.financeGoals != undefined && item.financeGoals != null)
        financeGoals = item.financeGoals;

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
    chrome.storage.sync.set({"completedFinanceGoals": completedFinanceGoals});

  });


  shortTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    uncompletedGoals.push(ShortTermGoal.value);
    shortTermGoal.value = "";
    chrome.storage.sync.set({"uncompletedGoals": uncompletedGoals});

    //Reduce the current status by a factor of one.
    var data = "financesStatus";
    chrome.storage.sync.get(data, function(item){
        var financesStatus = item.financesStatus;

        if(financesStatus > 0){
            financesStatus--;
        }

        chrome.storage.sync.set({"financesStatus": financesStatus.toString()});
    });
  });

  longTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
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
    completedFinanceGoals.push(shortTermGoal.value);
    shortTermGoal.value = "";
    chrome.storage.sync.set({"completedFinanceGoals": completedFinanceGoals});

  });

  longTermLaterBtn.addEventListener('click', function(){
    //Store the current goal to the list of goals to be completed later.
    uncompletedGoals.push(ShortTermGoal.value);
    shortTermGoal.value = "";
    chrome.storage.sync.set({"uncompletedGoals": uncompletedGoals});
  });

});
