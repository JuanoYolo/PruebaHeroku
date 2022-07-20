import io from 'socket.io-client';

let socket = io("//192.168.0.8:5000");

export default socket;