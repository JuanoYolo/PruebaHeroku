import React, {useState} from "react";

import Login from "./resources/js/views/Login"
import Sidebar from "./resources/js/views/Sidebar"
import ChatScreen from "./resources/js/views/ChatScreen"

//Importamos la aplicación/credenciales
import firebaseApp from "./firebase/credenciales";

// Conforme se necesite, importar los demás servicios y funciones. Por ejemplo:

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp); 

function App() {

    const [usuarioGeneral, setUsuarioGeneral] = useState(null);

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
    <div>
        {usuarioGeneral ? (
            <>
            {" "}
                <Sidebar usuarioGeneral={usuarioGeneral}/> <ChatScreen />{" "}
            </>
        ) : (
            <Login />
        )}
    </div>
  );
}

export default App;
