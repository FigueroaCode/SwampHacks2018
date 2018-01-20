document.addEventListener('DOMContentLoaded', () => {

  var nextBtn = document.getElementById("nextBtn");
  var nameInput = document.getElementById("nameInput");
  var studentCheckBox = document.getElementById("studentCheckBox");
  var checkUpVal = document.getElementById("checkUpVal");
  var leftArrowBtn = document.getElementById("leftArrowBtn");
  var rightArrowBtn = document.getElementById("rightArrowBtn");

  var possibleCheckUpValues = ["Daily","Weekly","Monthly"];
  var checkUpIndex = 0;

  nextBtn.addEventListener('click', function(){
    if( nameInput.value != null && nameInput.value != "" ){
        //TODO: Save the user's name to the local database.
        StorageArea.set()
        window.location.href = "pages/reportCard/reportCard.html";
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
