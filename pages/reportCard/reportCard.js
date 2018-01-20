document.addEventListener('DOMContentLoaded', () => {
  var mentalHealthBtn = document.getElementById('mentalHealthBtn');


  var fetchData = ["mentalHealthStatus", "nutritionStatus", "fitnessStatus",
                  "financesStatus", "socialCircleStatus"];

  //Create image objects.
  var mentalHealthImg = document.getElementById("mentalHealthImg");
  var nutritionImg = document.getElementById("nutritionImg");
  var fitnessImg = document.getElementById("fitnessImg");
  var financesImg = document.getElementById("financesImg");
  var socialCircleImg = document.getElementById("socialCircleImg");

  chrome.storage.sync.get(fetchData, function(items){
    if( items != null && items != undefined ){
      console.log(items.financesStatus);
      //Update the images in the user's report card to match their current state.
      switch(items.mentalHealthStatus){
        case "0":
          mentalHealthImg.src = "../../resources/rank0.png";
          break;
        case "1":
          mentalHealthImg.src = "../../resources/rank1.png";
          break;
        case "2":
          mentalHealthImg.src = "../../resources/rank2.png";
          break;
        case "3":
          mentalHealthImg.src = "../../resources/rank3.png";
          break;
        case "4":
          mentalHealthImg.src = "../../resources/rank4.png";
          break;
      }

      switch(items.nutritionStatus){
        case "0":
          nutritionImg.src = "../../resources/rank0.png";
          break;
        case "1":
          nutritionImg.src = "../../resources/rank1.png";
          break;
        case "2":
          nutritionImg.src = "../../resources/rank2.png";
          break;
        case "3":
          nutritionImg.src = "../../resources/rank3.png";
          break;
        case "4":
          nutritionImg.src = "../../resources/rank4.png";
          break;
      }

      switch(items.fitnessStatus){
        case "0":
          fitnessImg.src = "../../resources/rank0.png";
          break;
        case "1":
          fitnessImg.src = "../../resources/rank1.png";
          break;
        case "2":
          fitnessImg.src = "../../resources/rank2.png";
          break;
        case "3":
          fitnessImg.src = "../../resources/rank3.png";
          break;
        case "4":
          fitnessImg.src = "../../resources/rank4.png";
          break;
      }

      switch(items.financesStatus){
        case "0":
          financesImg.src = "../../resources/rank0.png";
          break;
        case "1":
          financesImg.src = "../../resources/rank1.png";
          break;
        case "2":
          financesImg.src = "../../resources/rank2.png";
          break;
        case "3":
          financesImg.src = "../../resources/rank3.png";
          break;
        case "4":
          financesImg.src = "../../resources/rank4.png";
          break;
      }

      switch(items.socialCircleStatus){
        case "0":
          socialCircleImg.src = "../../resources/rank0.png";
          break;
        case "1":
          socialCircleImg.src = "../../resources/rank1.png";
          break;
        case "2":
          socialCircleImg.src = "../../resources/rank2.png";
          break;
        case "3":
          socialCircleImg.src = "../../resources/rank3.png";
          break;
        case "4":
          socialCircleImg.src = "../../resources/rank4.png";
          break;
      }

    }
  });

  mentalHealthBtn.addEventListener('click', function(){
    window.location.href = "../mentalHealth/mentalHealth.html";
  });

  var nutritionBtn = document.getElementById('nutritionBtn');

  nutritionBtn.addEventListener('click', function(){
    window.location.href = "../nutrition/nutrition.html";
  });

  var fitnessBtn = document.getElementById('fitnessBtn');

  fitnessBtn.addEventListener('click', function(){
    window.location.href = "../fitness/fitness.html";
  });

  var financesBtn = document.getElementById('financesBtn');

  financesBtn.addEventListener('click', function(){
    window.location.href = "../finances/finances.html";
  });

  var socialCircleBtn = document.getElementById('socialCircleBtn');

  socialCircleBtn.addEventListener('click', function(){
    window.location.href = "../socialCircle/socialCircle.html";
  });

  var settingsBtn = document.getElementById('settingsBtn');

  settingsBtn.addEventListener('click', function(){
    chrome.storage.sync.set({'signedIn': false});
    window.location.href = "../../popup.html";
  });
});
