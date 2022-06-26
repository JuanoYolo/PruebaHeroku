// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDhQLNnNfE3AwM0pgjOp4kxH6MO2leM66M",
  authDomain: "slackarsw.firebaseapp.com",
  projectId: "slackarsw",
  storageBucket: "slackarsw.appspot.com",
  messagingSenderId: "455848691282",
  appId: "1:455848691282:web:dc9b97dfd7fc52e59c818b"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
