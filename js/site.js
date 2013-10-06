$(document).ready(function() {
  // Set filepate for timezoneJS and initialise it
  timezoneJS.timezone.zoneFileBasePath = 'tz';
  timezoneJS.timezone.init();

  // Strips spaces and converts to underscores
  function stripSpaces (city) {
    var strippedLoc = city.replace(" ", "_");
    return strippedLoc
  }

  // Set correctly formatted region for TZ
  function setRegion (location) {
    return "America/" + location;
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

  function onSubmit (submit){
    // Prevents page from doing default submit action
    submit.preventDefault();
    
    // Scrape forms for inputs
    var departureLoc = $("#departureLoc").val();
    var arrivalLoc = $("#arrivalLoc").val();
    var arrivalTime = $("#arrivalTime").val();

    // Reset values for departure and arrival to correctly formatted
    // text for the timezoneJS.data
    departureLoc = setRegion(stripSpaces(departureLoc));
    arrivalLoc = setRegion(stripSpaces(arrivalLoc));

    // Set current date
    var currentDate = new Date();

    // Set departure and arrival date based on defined locations
    var departureDate = getDateForLocation(currentDate, departureLoc);
    var arrivalDate = getDateForLocation(currentDate, arrivalLoc);

    // Set timezones
    var departureTZ = departureDate.getTimezoneOffset();
    var arrivalTZ = arrivalDate.getTimezoneOffset();

    // Calculate timezone difference
    var tzOffset = arrivalTZ - departureTZ;
    console.log(tzOffset);

    // Return false, beacuse you have to :)
    return false
  }

  $(".timer-form").submit(onSubmit);

});
