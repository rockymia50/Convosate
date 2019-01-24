$(function(){
$( "#submitInfo" ).submit(function( event ) {
    event.preventDefault();
    var num = $('#phoneNum').val();
    var message = $('#messageSent').val();
    $.post('/client', 
    { 
      number: num, 
      message: message
    }, function(result){
          $("span").html(result);
      });
  });


  //emit 
  const socket = io();
socket.on('smsText', function(messageSent){
   alert({messageSent});
   
   

});

});