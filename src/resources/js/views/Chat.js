import React, {useState, useEffect, useRef} from 'react'
import ChatHeader from '../../../components/ChatHeader';
import firebaseApp from '../../../firebase/credenciales';
import Message from '../../../components/Message';
import  {getFirestore,doc,setDoc, collection, getDocs} from 'firebase/firestore'


import {AddCircle, EmojiEmotions} from "@material-ui/icons"


const firestore = getFirestore(firebaseApp);


function Chat({ActiveCanal, user}) {

  const [inputMensaje, setInputMensaje] = useState("");
  const [arrayMensajes, setarrayMensajes] = useState([]);

  function sendMessages(e){
    const docuRef = doc(firestore, `canales/${ActiveCanal}/messages/${new Date.getTime()}`);
    setDoc(docuRef, {
      foto:user.photoURL,
      useer:user.displayName,
      messsages:inputMensaje,
      id: new Date().getTime() ,

    });

    setInputMensaje("");
    getArrayMensajes();
  }

  async function getArrayMensajes(){
    const arrayMensajeTraer = [];

    const coleccionRef = collection(firestore, `canales/${ActiveCanal}/mensajes`);
    const mensajesCifrados = await getDocs(coleccionRef);
    mensajesCifrados.forEach(mensaje=> {
      arrayMensajeTraer.push(mensaje.data());
    })

    setarrayMensajes([...arrayMensajeTraer]);
  }

  useEffect(()=>{
    getArrayMensajes();
  }, [ActiveCanal]);

  return (
    <div className="chat">
      <ChatHeader nombreCanal={ActiveCanal}/>

      <div className="chat mensajes"></div>
        { arrayMensajes ?
        arrayMensajes.map((mensaje)=> {
          return <Message firebaseMessage={mensaje}/>
        })
        : null}

      <div className="chat__input"></div>
      <AddCircle fontSize="large" />
      <form onSubmit={sendMessages}>
        {/*El disabled se coloca para que cuando no halla un canal seleccionado, no se pueda escribir para mandar mensajes*/}
        <input type="text" disabled={ ActiveCanal ? false : true } 
        value={inputMensaje} onChange={(e)=>
        setInputMensaje(e.target.value)} placeholder={`Enviar Mensaje al canal # ${ActiveCanal || ""}`} />  
        {/*El disabled se coloca para que cuando no halla un canal seleccionado, no se pueda presionar el boton de enviar mensajes*/}
        <button disabled={ ActiveCanal ? false : true }  className="chat__inputButton" type="submit">
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