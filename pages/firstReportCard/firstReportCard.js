function getTimeInMinutes(time){
  //format of time: #_unit(s)
  var spaceIndex = time.indexOf(' ');
  var number = Number.parseInt(time.substr(0,spaceIndex).trim());
  var unit = time.substr(spaceIndex + 1,time.length-5).trim();
  //Hour,Day,Week
  if(unit == "Hour"){
    //60 minutes in an Hour
    return number * 60;
  }else if(unit == "Day"){
    //1440 minutes in a day
    return number * 1440;
  }else if(unit == "Week"){
    //10080 minutes in a Week
    return number * 10080;
  }else{
    console.log('something went wrong.');
  }
}

function setupAlarm(){
  chrome.storage.sync.get('timePeriod', function(items){
    var period = getTimeInMinutes(items.timePeriod);
    chrome.alarms.create('goalAlarm', {delayInMinutes: 1, periodInMinutes: period});
  });
}

document.addEventListener('DOMContentLoaded', () => {

  var mentalHealthStatus = "";
  var nutritionStatus = "";
  var fitnessStatus = "";
  var financesStatus = "";
  var socialCircleStatus = "";

  var welcomeTitle = document.getElementById('welcomeTitle');
  //get username
  chrome.storage.sync.get('name', function(items){
    if(items != null && items != undefined){
      welcomeTitle.innerHTML = items.name;
    }
  });

  //Next/Home Page Button
  var nextBtn = document.getElementById("nextBtn");

  //Mental Health Buttons
  var mhs0 = document.getElementById("mhs0");
  var mhs1 = document.getElementById("mhs1");
  var mhs2 = document.getElementById("mhs2");
  var mhs3 = document.getElementById("mhs3");
  var mhs4 = document.getElementById("mhs4");

  //Nutrition Buttons
  var ns0 = document.getElementById("ns0");
  var ns1 = document.getElementById("ns1");
  var ns2 = document.getElementById("ns2");
  var ns3 = document.getElementById("ns3");
  var ns4 = document.getElementById("ns4");

  //Fitness Buttons
  var fts0 = document.getElementById("fts0");
  var fts1 = document.getElementById("fts1");
  var fts2 = document.getElementById("fts2");
  var fts3 = document.getElementById("fts3");
  var fts4 = document.getElementById("fts4");

  //Finances
  var fcs0 = document.getElementById("fcs0");
  var fcs1 = document.getElementById("fcs1");
  var fcs2 = document.getElementById("fcs2");
  var fcs3 = document.getElementById("fcs3");
  var fcs4 = document.getElementById("fcs4");

  //Social Circle
  var scs0 = document.getElementById("scs0");
  var scs1 = document.getElementById("scs1");
  var scs2 = document.getElementById("scs2");
  var scs3 = document.getElementById("scs3");
  var scs4 = document.getElementById("scs4");

  //nextBtn On-Click Listener
  nextBtn.addEventListener('click', function(){

    if( mentalHealthStatus != "" && nutritionStatus != "" && fitnessStatus != "" && financesStatus != "" && socialCircleStatus != "" ){
      var data = {'signedIn': true,'mentalHealthStatus': mentalHealthStatus, 'nutritionStatus': nutritionStatus,
        'fitnessStatus': fitnessStatus, 'financesStatus': financesStatus,
         'socialCircleStatus': socialCircleStatus}
      chrome.storage.sync.set(data);
      setupAlarm();
      window.location.href = "../reportCard/reportCard.html";
    }else{
      //TODO: Add snackbar telling user that they need to select one status for
      //every category.
    }

  });

  //Mental Health On-Click Listeners
  mhs0.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( mentalHealthStatus != "" ){
      var previousSelection = "mhs" + mentalHealthStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    mentalHealthStatus = "0";
    mhs0.style.backgroundColor = "green";
  });

  mhs1.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( mentalHealthStatus != "" ){
      var previousSelection = "mhs" + mentalHealthStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    mentalHealthStatus = "1";
    mhs1.style.backgroundColor = "green";
  });

  mhs2.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( mentalHealthStatus != "" ){
      var previousSelection = "mhs" + mentalHealthStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    mentalHealthStatus = "2";
    mhs2.style.backgroundColor = "green";
  });

  mhs3.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( mentalHealthStatus != "" ){
      var previousSelection = "mhs" + mentalHealthStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    mentalHealthStatus = "3";
    mhs3.style.backgroundColor = "green";
  });

  mhs4.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( mentalHealthStatus != "" ){
      var previousSelection = "mhs" + mentalHealthStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    mentalHealthStatus = "4";
    mhs4.style.backgroundColor = "green";
  });

  //Nutrition On-Click Listeners
  ns0.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( nutritionStatus != "" ){
      var previousSelection = "ns" + nutritionStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    nutritionStatus = "0";
    ns0.style.backgroundColor = "green";
  });

  ns1.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( nutritionStatus != "" ){
      var previousSelection = "ns" + nutritionStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    nutritionStatus = "1";
    ns1.style.backgroundColor = "green";
  });

  ns2.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( nutritionStatus != "" ){
      var previousSelection = "ns" + nutritionStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    nutritionStatus = "2";
    ns2.style.backgroundColor = "green";
  });

  ns3.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( nutritionStatus != "" ){
      var previousSelection = "ns" + nutritionStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    nutritionStatus = "3";
    ns3.style.backgroundColor = "green";
  });

  ns4.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( nutritionStatus != "" ){
      var previousSelection = "ns" + nutritionStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    nutritionStatus = "4";
    ns4.style.backgroundColor = "green";
  });


  //Fitness On-Click Listeners
  fts0.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( fitnessStatus != "" ){
      var previousSelection = "fts" + fitnessStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    fitnessStatus = "0";
    fts0.style.backgroundColor = "green";
  });

  fts1.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( fitnessStatus != "" ){
      var previousSelection = "fts" + fitnessStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    fitnessStatus = "1";
    fts1.style.backgroundColor = "green";
  });

  fts2.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( fitnessStatus != "" ){
      var previousSelection = "fts" + fitnessStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    fitnessStatus = "2";
    fts2.style.backgroundColor = "green";
  });

  fts3.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( fitnessStatus != "" ){
      var previousSelection = "fts" + fitnessStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    fitnessStatus = "3";
    fts3.style.backgroundColor = "green";
  });

  fts4.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( fitnessStatus != "" ){
      var previousSelection = "fts" + fitnessStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    fitnessStatus = "4";
    fts4.style.backgroundColor = "green";
  });

  //Finances On-Click Listeners
  fcs0.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( financesStatus != "" ){
      var previousSelection = "fcs" + financesStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    financesStatus = "0";
    fcs0.style.backgroundColor = "green";
  });

  fcs1.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( financesStatus != "" ){
      var previousSelection = "fcs" + financesStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    financesStatus = "1";
    fcs1.style.backgroundColor = "green";
  });

  fcs2.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( financesStatus != "" ){
      var previousSelection = "fcs" + financesStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    financesStatus = "2";
    fcs2.style.backgroundColor = "green";
  });

  fcs3.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( financesStatus != "" ){
      var previousSelection = "fcs" + financesStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    financesStatus = "3";
    fcs3.style.backgroundColor = "green";
  });

  fcs4.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( financesStatus != "" ){
      var previousSelection = "fcs" + financesStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    financesStatus = "4";
    fcs4.style.backgroundColor = "green";
  });

  //Social Circle On-Click Listeners
  scs0.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( socialCircleStatus != "" ){
      var previousSelection = "scs" + socialCircleStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    socialCircleStatus = "0";
    scs0.style.backgroundColor = "green";
  });

  scs1.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( socialCircleStatus != "" ){
      var previousSelection = "scs" + socialCircleStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    socialCircleStatus = "1";
    scs1.style.backgroundColor = "green";
  });

  scs2.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( socialCircleStatus != "" ){
      var previousSelection = "scs" + socialCircleStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    socialCircleStatus = "2";
    scs2.style.backgroundColor = "green";
  });

  scs3.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( socialCircleStatus != "" ){
      var previousSelection = "scs" + socialCircleStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    socialCircleStatus = "3";
    scs3.style.backgroundColor = "green";
  });

  scs4.addEventListener('click', function(){
    //If this is not the first button they've clicked, clear the background color change.
    if( socialCircleStatus != "" ){
      var previousSelection = "scs" + socialCircleStatus;
      var previousBtn = document.getElementById(previousSelection);
      previousBtn.style.backgroundColor = null;
    }
    //Save the current selection and change the backgroundColor.
    socialCircleStatus = "4";
    scs4.style.backgroundColor = "green";
  });
});
