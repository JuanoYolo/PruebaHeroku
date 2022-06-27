import React from 'react'
import {Button} from "@material-ui/core"

//Para poder usar las credenciales de Firebase importamos las credenciales
import firebaseApp from '../firebase/credenciales';
//Para usar los servicios importamos lo siguiente

//La funcion getAuth inicia el servicio, con las credenciales que traemos de firebase
//como argumento
import {getAuth, GoogleAuthProvider, signInWithRedirect} from "firebase/auth";

//Guardamos en una constante, con esto ya podremos acceder a todos los servicios
//que tengan que ver con la autenticacion
const auth = getAuth(firebaseApp);
//Con esta podremos iniciar sesion
const gProvider = new GoogleAuthProvider();

function Login() {

function logInConGoogle(){
    //Con esto ya podremos iniciar sesion con google
    signInWithRedirect(auth, gProvider);
}
  return (
  <div className="login"> 

    <div className="login__logo" >
        <img src="https://media.istockphoto.com/vectors/startup-banner-vector-id1081882844?s=612x612" alt=""></img>
    </div>
        <Button onClick={logInConGoogle}>Acceder con Google</Button>
    </div>
    );
  
}

export default Login