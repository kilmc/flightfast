$(document).ready(function() {
  // Set filepate for timezoneJS and initialise it
  timezoneJS.timezone.zoneFileBasePath = 'tz';
  timezoneJS.timezone.init();

  // Strips spaces and converts to underscores
  function stripSpaces (city) {
    var strippedLoc = city.replace(/ /g, "_");
    return strippedLoc
  }

  // TODO: Set correctly formatted region for TZ
  function setRegion (location) {
    return location;
  }

  // Get date for a given location
  function getDateForLocation (date, location) {
    return new timezoneJS.Date(
      date.getFullYear(),
      date.getMonth()+1,
      date.getDate()+1,
      date.getHours(),
      date.getMinutes(),
      location
    );
  }

  function formatTime (dt) {
    var hours = ("0" + dt.getHours()).slice(-2);
    var minutes = ("0" + dt.getMinutes()).slice(-2);    
    
    return hours + ":" + minutes;
  }
  
  function onSubmit (submit){
    // Prevents page from doing default submit action
    submit.preventDefault();
    
    // Scrape forms for inputs
    var departureLoc = $("#departureLoc").val();
    var arrivalLoc = $("#arrivalLoc").val();
    var arrivalTime = new Date().toDateString() + " " + $("#arrivalTime").val();

    // Reset values for departure and arrival to correctly formatted
    // text for the timezoneJS.data
    departureLoc = setRegion(stripSpaces(departureLoc));
    arrivalLoc = setRegion(stripSpaces(arrivalLoc));

    // TODO: have this user configurable?
    var breakfastHour = 9;

    var dt = new timezoneJS.Date(arrivalTime, arrivalLoc);
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    if(hours < 17 || (hours == 17 && minutes == 0)) {
      alert("Don't eat after 17:00 in " + arrivalLoc);
    }
    else {
      // Breakfast datetime
      dt.setDate(dt.getDate() + 1);
      dt.setHours(breakfastHour);
      dt.setMinutes(0);
      dt.setSeconds(0);
      
      // Subtract 16 hours to get fasting start time
      if(breakfastHour < 16) {
        // Need to do this ourselves as timezoneJS.Date
        // doesn't handle it automatically like Date does
      	dt.setDate(dt.getDate() - 1);
      }
      dt.setHours(dt.getHours() - 16);
      dt.setTimezone(departureLoc);
      
      alert("Don't eat after " + formatTime(dt) + " in " + departureLoc);
    }

    // Return false, beacuse you have to :)
    return false
  }

  $(".timer-form").submit(onSubmit);

});
