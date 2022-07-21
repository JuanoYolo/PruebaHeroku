const express = require('express');
const http = require('http');
const app = express();
const servver = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(servver);

io.on('Conexion', socket =>{
    let user;

    socket.on("conectado", (nomb) => {
        user = nomb;
        //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
        socket.broadcast.emit("mensajes", {
            user: user,
            inputMensaje: `${user} ha entrado en la sala del chat`,
        });
    });

    socket.on('Mensaje', (user, inputMensaje) => {
        io.emit("Mensajes", {user, inputMensaje});
        console.log("mensaje en server.js");
    });

    socket.on("disconnect", () => {
        io.emit("Mensajes", {
            servidor: "Servidor",
            mensaje: `${nombre} ha abandonado la sala`,
        });
    });
});

const port = process.env.PORT || 3000;
servver.listen(PORT, () => console.log("Encendido"))