document.addEventListener('DOMContentLoaded', () => {

  chrome.storage.sync.get('signedIn', function(items){
    if(items != null || items != undefined){
      if(items.signedIn){
        //if signed in go to report card
        window.location.href = "pages/reportCard/reportCard.html";
      }
    }
  });

  var nextBtn = document.getElementById("nextBtn");
  var nameInput = document.getElementById("nameInput");
  var checkUpVal = document.getElementById("checkUpVal");
  var leftArrowBtn = document.getElementById("leftArrowBtn");
  var rightArrowBtn = document.getElementById("rightArrowBtn");

  var possibleCheckUpValues = ["Daily","Weekly","Monthly"];
  var checkUpIndex = 0;

  nextBtn.addEventListener('click', function(){
    if( nameInput.value != null && nameInput.value != "" ){
        // Save the user's name to the local database.
        var data = {'signedIn': true,'name': nameInput.value, 'student': studentCheckBox.checked,
         'checkUp': checkUpVal.innerHTML};
        chrome.storage.sync.set(data);
        window.location.href = "pages/firstReportCard/firstReportCard.html";
    }
  });

  leftArrowBtn.addEventListener('click', function(){
    if( checkUpVal.innerHTML != "Daily" ){
      //Change to the next greatest value.
      checkUpIndex--;
      checkUpVal.innerHTML = possibleCheckUpValues[checkUpIndex];
    }
  });

  rightArrowBtn.addEventListener('click', function(){
    if( checkUpVal.innerHTML != "Monthly" ){
      //Change to the next lowest value.
      checkUpIndex++;
      checkUpVal.innerHTML = possibleCheckUpValues[checkUpIndex];
    }
  });

});
