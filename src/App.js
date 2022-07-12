import React, {useState} from "react";

import Login from "./resources/js/views/Login"
import Bar from "./resources/js/views/Bar"
import Chat from "./resources/js/views/Chat"

//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

// WebSocket
// Retorna la url del servicio. Es una función de configuración.
function ChatServiceURL() {
    var host = window.location.host;
    //Para probar en local es ws, para subir a Heroku es wss
    var url = 'ws://' + (host) + '/chatservice';
    console.log("URL Calculada: " + url);
    return url;
}
class WSBBChannel {
    constructor(URL, callback) {
        this.URL = URL;
        this.wsocket = new WebSocket(URL);
        this.wsocket.onopen = (evt) => this.onOpen(evt);
        this.wsocket.onmessage = (evt) => this.onMessage(evt);
        this.wsocket.onerror = (evt) => this.onError(evt);
        this.receivef = callback;
    }
    onOpen(evt) {
        console.log("In onOpen", evt);
    }
    onMessage(evt) {
        console.log("In onMessage", evt);
        // Este if permite que el primer mensaje del servidor no se tenga encuenta.
        // El primer mensaje solo confirma que se estableció la conexión.
        // De ahí en adelante intercambiaremos solo puntos(x,y) con el servidor
        if (evt.data != "Connection established.") {
            this.receivef(evt.data);
        }
    }
    onError(evt) {
        console.error("In onError", evt);
    }
}
// WebSocket



function App() {
    this.comunicationWS =
        new WSBBChannel(ChatServiceURL(),
            (msg) => {
                var obj = JSON.parse(msg);
                console.log("On func call back ", msg);
            });

    const [usuarioGeneral, setUsuarioGeneral] = useState(null);
    const [ActiveCanal, setCanalActive] = useState(null);

    onAuthStateChanged(auth, (usuarioFirebase)=>{
//Saber si se inicio o se finalizo la sesion
if(usuarioFirebase){
    setUsuarioGeneral(usuarioFirebase);
    console.log("Sesion abierta")
}else{
    setUsuarioGeneral(null);

}
    })
    
  return (
    <div className="app">
        {usuarioGeneral ? (
            <>
            {" "}
                <Bar usuarioGeneral={usuarioGeneral} 
                setCanalActive={setCanalActive}/> <Chat ActiveCanal={ActiveCanal} user={usuarioGeneral}/>{" "}
            </>
        ) : (
            <Login />
        )}
    </div>
  );
}

export default App;
