$(function(){
  console.log('scripts loaded');

  //UPDATE THE AJAX REQUEST EVERY FIVE SECONDS TO CONTINUOUSLY SEE WHERE THE ISS IS
  function updateFive(){
    //DECLARE VARIABLES
    var url = 'http://api.open-notify.org/iss-now.json';
    var url2 = '';
    var data = [];
    var geocodeData = [];
    var lat = '';
    var long = '';
    var html = '';

    //FIRST AJAX REQUEST
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
              html += ' somewhere over the ocean <br/>';
            }else{
              console.log(geocodeData.address.state + ', ' + geocodeData.address.country);
              html += ' over ' + geocodeData.address.state + ', ' + geocodeData.address.country + '<br/>';
            }//end of if/else statement
            $('#overwrite').html(html);
          }//end of success
        });//closing of reverse geocoding ajax
      }//closing of first AJAX success
    });//end of AJAX
    setTimeout(updateFive, 5000);
  }//closing of five second timeout function
  updateFive();
});//closing of document.ready
