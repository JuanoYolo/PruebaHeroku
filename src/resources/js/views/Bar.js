import React, { useState, useEffect } from "react"

import { Avatar } from "@material-ui/core";
import { ExpandMore, Add, Mic, Settings, Headset } from "@material-ui/icons";

import Canalbar from "../../../components/Canalbar";

import firebaseApp from "../../../firebase/credenciales";
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore"
import { async } from "@firebase/util";
const db = getFirestore(firebaseApp);

function Bar({ usuarioGeneral, setCanalActive }) {

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

    function addCanal() {

        const canalName = prompt("Pon un Nombre al canal");

        if (canalName) {
            const docuRef = doc(db, `canales/${canalName}`);
            setDoc(docuRef, {
                id: new Date().getTime(),
                nombre: canalName,
            });

            getCanales();
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

                    <Add className="bar__addChannel" onClick={addCanal}
                    />
                </div>

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


            <div className="bar__profile">
                <Avatar src={usuarioGeneral.photoURL} />
                <div className="bar__profileInfo">
                    <h3>{usuarioGeneral.displayName}</h3>
                    <p>{usuarioGeneral.uid.substring(0, 4)}</p>
                </div>
            </div>
        </div>
    );
}

export default Bar;