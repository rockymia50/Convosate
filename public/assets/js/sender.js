$(function(){
//emit to sender
const socket = io();
socket.on('smsText', function(messageRec){
   alert({messageRec});
   });
});