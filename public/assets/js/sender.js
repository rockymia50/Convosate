$(function(){
event.preventDefault();
//emit to sender
const socket = io();
socket.on('smsText', function(messageRec){
   alert({messageRec});
   });
});