import React, { useState, useEffect } from "react"

import { Avatar } from "@material-ui/core";
import { ExpandMore, Add,Settings} from "@material-ui/icons";

import Canalbar from "../../../components/Canalbar";

import firebaseApp from "../../../firebase/credenciales";
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore"
import { async } from "@firebase/util";
import { getAuth, gethAuth, signOut } from "firebase/auth";
import Socket from '../../../components/Socket';
import socket from '../../../components/Socket';

//Guardamos las credenciales de firebase en la constante db
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

//Como desde App configuramos que el componente Bar pueda traer Usuario general, lo podemos usar dentro de nuestra function aqui
function Bar({ usuarioGeneral, setCanalActive }) {

    //De esta manera podremos ver en el navegador la informacion que proviene del usuario y la cual usamos para retornar su info en pantalla
    //console.log(usuarioGeneral)

    const [ListaCanales, setListaCanales] = useState([]);

    async function getCanales() {
        const listCanales = [];
        const collectionRef = collection(db, "canales");
        const canalesCifrados = await getDocs(collectionRef);
        canalesCifrados.forEach(canalCifrado => {
            listCanales.push(canalCifrado.data());
        });
        setListaCanales(listCanales);
        
    }

    /*
    * Función que crea una entrada en nuestra base de datos para agregar el canal
    */
    function addCanal() {
        //Le pedimos al usuario que le ponga un nombre al canal y lo cree
        const canalName = prompt("Pon un Nombre al canal");

        if (canalName) {
            //Usamos doc para poder crear una referencia al documento que queremos entrar, en este caso a la coleccion canales
            //para que se cree el canal dentro de esta
            //Hacemos uso de las comillas invertidas(Template Strings) para poder almacenar información dinamica
            const docuRef = doc(db, `canales/${canalName}`);
            //Usamos setDoc para añadir la informacion a la referencia que creamos anteriormente, alli guardamos el canal creado
            setDoc(docuRef, {
                id: new Date().getTime(),
                nombre: canalName,
            });

            getCanales().then(r => socket.emit('Canal', usuarioGeneral, canalName));

        }

    }

    useEffect(() => {
        getCanales();
    }, []);

    return (
        <div className="bar">
            <div className="bar__top">
            </div>
            <div className="bar__channels">
                <div className="bar__channelsHeader">
                    <div className="bar__header">
                        <ExpandMore />
                        <h4>Canales de texto</h4>
                    </div>

                    {/*Boton para añadir canales, el cual redirige y ejecuta la Funcion JS addCanal*/}
                    <Add className="bar__addChannel" onClick={addCanal}/>
                </div>

                {/*Funcion que mapea los canales, */}
                <div className="bar__channelsList">
                    {ListaCanales ? ListaCanales.map((canal) => {
                        return(
                        <div onClick={()=> setCanalActive(canal.nombre)}>
                            <Canalbar nombre={canal.nombre} id={canal.id}/>
                        </div>
                        );
                    })
                         : null}

                </div>

            </div>

            {/*Div donde dentro de este se trae la info del usuario para mostrarlo en pantalla*/}
            <div className="bar__profile">
                <Avatar src={usuarioGeneral.photoURL} />
                <div className="bar__profileInfo">
                    <h3>{usuarioGeneral.displayName}</h3>
                    {/*Hacemos uso del metodo substring para recortar el codigo del usuario e imprimir solo cuatro caracteres*/}
                    <p>{usuarioGeneral.uid.substring(0, 4)}</p>
                </div>
                <div className="bar__profileIcons">
                <Settings onClick={ ()=> signOut(auth)}/>
                </div>
            </div>
        </div>
    );
}

export default Bar;