const express = require('express');
const http = require('http');
const app = express();
const servver = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(servver);

io.on('Conexion', socket =>{
    let user;

    socket.on('Mensaje', (user, inputMensaje) => {
        io.emit("Mensajes", {user, inputMensaje});
    })

});

servver.listen(3000, () => console.log("Encendido"))