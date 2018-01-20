document.addEventListener('DOMContentLoaded', () => {
  var backBtn = document.getElementById('backBtn');
  var shortTermGoal = document.getElementById('shortTermGoalID');
  var longTermGoal = document.getElementById('longTermGoalID');
  var shortTermBtn = document.getElementById('shortTermComplete');
  var longTermBtn = document.getElementById('longTermComplete');

  backBtn.addEventListener('click', function(){
    window.location.href = "../reportCard/reportCard.html";
  });

  shortTermBtn.addEventListener('click', function(){
    //Find out what the current rank for this category is from cache
    //Increment it, then save it to cache again.
    var data = "financesStatus";
    chrome.storage.sync.get(data, function(item){
      console.log(item.financesStatus);
        var financesStatus = item.financesStatus;

        if(financesStatus < 4){
            financesStatus++;
        }

        chrome.storage.sync.set({"financesStatus": financesStatus.toString()});
    });

    shortTermGoal.value = "";

  });
});
