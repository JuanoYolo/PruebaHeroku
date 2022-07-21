// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyD4iCAbuDABM-oWpJe4-OtrmkTFfLV3Ec4",
  authDomain: "slackarsw-ce9c3.firebaseapp.com",
  projectId: "slackarsw-ce9c3",
  storageBucket: "slackarsw-ce9c3.appspot.com",
  messagingSenderId: "397950750502",
  appId: "1:397950750502:web:f97fd440fb8bc6356e3be7"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;

