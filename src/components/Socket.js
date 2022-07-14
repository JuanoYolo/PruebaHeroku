import io from 'socket.io-client';

let socket = io("//192.168.0.8:3000");

export default socket;