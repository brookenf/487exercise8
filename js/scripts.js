$(function(){
  console.log('scripts loaded');

  var url = 'http://api.open-notify.org/iss-now.json';
  var data = [];
  var geocodeData = [];
  var lat = '';
  var long = '';
  var i = '';
  var html = '<p>The International Space Station is currently at ';

  //UPDATE THE AJAX REQUEST EVERY FIVE SECONDS TO CONTINUOUSLY SEE WHERE THE ISS IS
  function updateFive(){
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      async: true,
      data: data,
      success: function(data){
        lat = data.iss_position.latitude;
        long = data.iss_position.longitude;
        console.log(lat + ' ' + long);
        var url2 = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + long + '';
        $.ajax({
          type: 'GET',
          dataType: 'json',
          data: geocodeData,
          url: url2,
          async: true,
          success: function(geocodeData){
            if(url2 = geocodeData.error){
              console.log('ISS is over ocean');
            }else{
              console.log(geocodeData.address.country);
            }
          }


        });//closing of reverse geocoding ajax
      }
    });//end of AJAX
    setTimeout(updateFive, 5000);
  }//closing of five second timeout function
  updateFive();




});//closing of document.ready
