import React, { useState, useEffect, useRef } from 'react'
import ChatHeader from '../../../components/ChatHeader';
import firebaseApp from '../../../firebase/credenciales';
import Message from '../../../components/Message';
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";


import { AddCircle, EmojiEmotions } from "@material-ui/icons";
import Socket from '../../../components/Socket';
import socket from '../../../components/Socket';

const firestore = getFirestore(firebaseApp);


function Chat({ ActiveCanal, user }) {

  const [inputMensaje, setInputMensaje] = useState("");
  const [arrayMensajes, setarrayMensajes] = useState([]);

  useEffect(() => {
    socket.on('mensajes', (inputMensaje) => {
      setarrayMensajes([...arrayMensajes, inputMensaje]);
    });

    return () => {
      socket.off();
    };
  }, [arrayMensajes]);

  /*const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });*/

  function sendMessages(e) {
    e.preventDefault();
    socket.emit('Mensaje', inputMensaje);
    //Hacemos uso de las comillas invertidas(Template Strings) para poder almacenar información dinamica
    const docuRef = doc(firestore, `canales/${ActiveCanal}/messages/${new Date().getTime()}`);
    setDoc(docuRef, {
      foto: user.photoURL,
      useer: user.displayName,
      messsages: inputMensaje,
      id: new Date().getTime(),
    });
    getArrayMensajes();
    //window.alert(inputMensaje);
    setInputMensaje("");
  }

  async function getArrayMensajes() {
    const arrayMensajeTraer = [];

    //Hacemos uso de las comillas invertidas(Template Strings) para poder almacenar información dinamica
    const coleccionRef = collection(firestore, `canales/${ActiveCanal}/messages`);
    const mensajesCifrados = await getDocs(coleccionRef);
    mensajesCifrados.forEach(mensaje => {
      arrayMensajeTraer.push(mensaje.data());
    })

    setarrayMensajes([...arrayMensajeTraer]);
  }



  useEffect(() => {
    socket.on('Mensajes', getArrayMensajes());
    return () => { socket.off() }
  }, [arrayMensajes]);



  useEffect(() => {
    socket.emit('conectado', user);
  }, [user]);

  return (
    <div className="chat">
      <ChatHeader nombreCanal={ActiveCanal} />

      <div className="chat__mensajes">
        {arrayMensajes ?
            arrayMensajes.map((mensaje) => {
              return <Message firebaseMessage={mensaje} />
            })
            : null}
      </div>
      <div className="chat__input"></div>
      <AddCircle fontSize="large" />
      <form onSubmit={sendMessages}>
        {/*El disabled se coloca para que cuando no halla un canal seleccionado, no se pueda escribir para mandar mensajes*/}
        <input type="text" disabled={ActiveCanal ? false : true}
          value={inputMensaje} onChange={(e) => setInputMensaje(e.target.value)} placeholder={`Enviar Mensaje al canal # ${ActiveCanal || ""}`} />
        {/*El disabled se coloca para que cuando no halla un canal seleccionado, no se pueda presionar el boton de enviar mensajes*/}
        <button disabled={ActiveCanal ? false : true} className="chat__inputButton" type="submit">
          Enviar
        </button>
      </form>

      <div className="chat__inputIcons">

        <EmojiEmotions fontSize="large" />
      </div>
    </div>
  )
}

export default Chat