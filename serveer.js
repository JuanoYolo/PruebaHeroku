const express = require('express');
const http = require('http');
const app = express();
const servver = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(servver);

io.on('Conexion', socket =>{

    socket.on('Conectado', () => {
        console.log('Conectado satisfactoriamente');
    });

    socket.on('Mensaje', (user, Message) => {
        io.emit("Mensajes", {user, Message});
    })

});

servver.listen(3000, () => console.log("Encendido"))