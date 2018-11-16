$(function(){
  console.log('scripts loaded');

  var url = 'http://api.open-notify.org/iss-now.json';
  var url2 = '';
  var data = [];
  var geocodeData = [];
  var lat = '';
  var long = '';
  var html = '<p>The International Space Station is currently';
  var i;


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
        //the var url for reverse geocoding
        url2 = ' https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + long + '';
        $.ajax({
          type: 'GET',
          dataType: 'json',
          data: geocodeData,
          url: url2,
          async: true,
          success: function(geocodeData){
            if(url2 = geocodeData.error){
              console.log('ISS is over ocean');
              html += ' somewhere over the ocean';
            }else{
              console.log(geocodeData.address.state + ', ' + geocodeData.address.country);
              html += ' at ' + geocodeData.address.state + ', ' + geocodeData.address.country;
            }//end of if/else statement
            $('#results').replaceWith(html);
            setTimeout(updateFive, 5000);
          }//end of success
        });//closing of reverse geocoding ajax
      }//closing of first AJAX success
    });//end of AJAX
  }//closing of five second timeout function
  updateFive();


});//closing of document.ready
