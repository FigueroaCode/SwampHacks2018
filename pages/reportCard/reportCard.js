document.addEventListener('DOMContentLoaded', () => {
  var mentalHealthBtn = document.getElementById('mentalHealthBtn');

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
