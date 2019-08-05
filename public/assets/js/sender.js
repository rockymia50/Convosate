$(function(){

$( "#submitInfo" ).submit(function( event ) {
   event.preventDefault();
   var num = $('#phoneNum').val();
   var message = $('#messageSent').val();
   $.post('/sender', 
   { 
     number: num, 
     message: message
   }, function(result){
         $("span").html(result);
     });
 });











//emit to sender
const socket = io();
socket.on('smsText', function(messageRec){
   alert({messageRec});
   });
});