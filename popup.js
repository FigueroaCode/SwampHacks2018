  function updateSliderUnits(checkUpVal,slider,sliderValue){
    var sliderUnits = document.getElementById('sliderUnit');

    if(checkUpVal.innerHTML == "Daily"){
      sliderUnit.innerHTML = "Hour(s)";
      slider.min = 0;
      slider.max = 24;
    }else if(checkUpVal.innerHTML == "Weekly"){
      sliderUnit.innerHTML = "Day(s)";
      slider.min = 0;
      slider.max = 7;
    }else{
      //Monhtly
      sliderUnit.innerHTML = "Week(s)";
      slider.min = 0;
      slider.max = 4;
    }
    var val = Number.parseInt(slider.max / 2);
    slider.value = val;
    sliderValue.innerHTML = val;
  };

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

  var slider = document.getElementById('myRange');
  var sliderValue = document.getElementById('sliderValue');
  var sliderUnits = document.getElementById('sliderUnit');
  //Set the default Value
  sliderValue.innerHTML = slider.value;

  nextBtn.addEventListener('click', function(){
    if( nameInput.value != null && nameInput.value != "" ){
        // Save the user's name to the local database.
        var data = {'name': nameInput.value,
        'timePeriod': sliderValue.innerHTML + " " + sliderUnits.innerHTML,'checkUp': checkUpVal.innerHTML};
        chrome.storage.sync.set(data);
        window.location.href = "pages/firstReportCard/firstReportCard.html";
    }
  });

  leftArrowBtn.addEventListener('click', function(){
    if( checkUpVal.innerHTML != "Daily" ){
      //Change to the next greatest value.
      checkUpIndex--;
      checkUpVal.innerHTML = possibleCheckUpValues[checkUpIndex];
      updateSliderUnits(checkUpVal,slider,sliderValue);
    }
  });

  rightArrowBtn.addEventListener('click', function(){
    if( checkUpVal.innerHTML != "Monthly" ){
      //Change to the next lowest value.
      checkUpIndex++;
      checkUpVal.innerHTML = possibleCheckUpValues[checkUpIndex];
      updateSliderUnits(checkUpVal,slider,sliderValue);
    }
  });

  slider.oninput = function(){
    sliderValue.innerHTML = this.value;
  }

});
