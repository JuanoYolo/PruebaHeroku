// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyC2LcahYSQnWJAYZIGpQt0JzzExlU4emdQ",
  authDomain: "slackarsw-e408d.firebaseapp.com",
  projectId: "slackarsw-e408d",
  storageBucket: "slackarsw-e408d.appspot.com",
  messagingSenderId: "670552705111",
  appId: "1:670552705111:web:f472e56d2c515b3c99bb12"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

