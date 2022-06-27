import React, {useState} from "react";

import Login from "./views/Login"
import Sidebar from "./views/Sidebar"
import ChatScreen from "./views/ChatScreen"

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
    console.log("Sesion abierto")
}else{
    setUsuarioGeneral(null);

}
    })
    
  return (
    <div>
        {usuarioGeneral ? (
            <>
            {" "}
                <Sidebar/> <ChatScreen />{" "}
            </>
        ) : (
            <Login />
        )}
    </div>
  );
}

export default App;
