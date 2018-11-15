$(function(){
  console.log('scripts loaded');

  var url = 'http://api.open-notify.org/iss-now.json';
  var data = [];
  var lat = '';
  var long = '';
  var i = '';
  var html = '<p>The International Space Station is currently at ';

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
        html += lat + ' ' + long + '<br/>';
        $('#results').append(html);
      }
    });//end of AJAX
    setTimeout(updateFive, 5000);
  }//closing of five second timeout function
  updateFive();




});//closing of document.ready
