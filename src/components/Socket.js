import io from 'socket.io-client';

var host = window.location.host;
var url = "ws://" + host;
console.log("URL Calculada: " + url);

let socket = io(url);

export default socket;