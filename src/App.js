import React, {useState} from "react";

import Login from "./resources/js/views/Login";
import Bar from "./resources/js/views/Bar";
import Chat from "./resources/js/views/Chat";

//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";
import socket from "./components/Socket";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:
//getAuth: Variable usada para la autenticación con FireBase
//onAuthStateChanged: Observar cambios de inicio de Sesión
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function App() {
    //Se hace uso de Socket para emitir la conexión satisfactoria
    socket.emit('Conectado');

    /*
    * usuarioGeneral: Constante donde se guardara info del usuario que accedio por firebase
    * ActiveCanal: Canal que tiene seleccionado el usuario, osea el canal activo
    */
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
                {/*Agregamos el siguiente codigo para que el componente Bar pueda tener acceso al estado usario general */}
                {/*y asi poder traer la info del usuario de FireBase al componente Bar"*/}
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
