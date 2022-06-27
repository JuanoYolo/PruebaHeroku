import React, { useState, useEffect } from "react"

import { Avatar } from "@material-ui/core";
import { ExpandMore, Add, Mic, Settings, Headset } from "@material-ui/icons";

import firebaseApp from "../../../firebase/credenciales";
import { getFirestore, collection, doc, setDoc, getDocs} from "firebase/firestore"
import { async } from "@firebase/util";
const db = getFirestore(firebaseApp);

function Sidebar({usuarioGeneral}) {

    const [ListaCanales, setListaCanales] = useState([]);

async function getCanales(){
    const canalesArr = [];
    const collectionRef = collection (db, "canales");
    const canalesCifrados = await getDocs(collectionRef);
    canalesCifrados.forEach(canalCifrado=>{
        canalesArr.push(canalCifrado.data());
    });
    setListaCanales(canalesArr);
}

function agregarCanal(){

    const nombreCanal = prompt("Pon un Nombre al canal");

    if(nombreCanal){
        const docuRef = doc(db, `canales/${nombreCanal}`);
        setDoc(docuRef, {
            id: new Date().getTime(),
            nombre: nombreCanal,
        });
    }

}

useEffect( ()=> {
    getCanales();
}, []);

    return (
        <div className="sidebar">
            <div className="sidebar__top">
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMore />
                        <h4>Canales de texto</h4>
                    </div>

                    <Add className="sidebar__addChannel" onClick={agregarCanal}
                     />
                </div>

                <div className="sidebar__channelsList">
                    { ListaCanales ? ListaCanales.map((canal)=>{
                       return <div> {canal.nombre} </div>;
                    })
                : null}

                </div>

            </div>


            <div className="sidebar__profile">
                <Avatar src={usuarioGeneral.photoURL} />
                <div className="sidebar__profileInfo">
                <h3>{usuarioGeneral.displayName}</h3>
                <p>{usuarioGeneral.uid.substring(0,4)}</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;