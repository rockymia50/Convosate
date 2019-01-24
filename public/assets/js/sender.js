$(function(){



//emit to sender
//emit 
const socket = io();
socket.on('smsText', function(messageRec){
   alert({messageRec});
   

});

});