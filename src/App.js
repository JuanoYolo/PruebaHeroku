import React, {useState} from "react";

import Login from "./resources/js/views/Login";
import Bar from "./resources/js/views/Bar";
import Chat from "./resources/js/views/Chat";
import Socket from "./components/Socket"; 

//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";
import socket from "./components/Socket";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
    socket.emit('Conectado');

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
