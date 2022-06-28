import React, {useState, useEffect, useRef} from 'react'
import ChatHeader from '../../../components/ChatHeader';

import {AddCircle, EmojiEmotions} from "@material-ui/icons"

function Chat({ActiveCanal}) {

  const [inputMensaje, setInputMensaje] = useState("");

  return (
    <div className="chat">
      <ChatHeader nombreCanal={ActiveCanal}/>

      <div className="chat mensajes"></div>
        {/*Mapear mensajes*/}

      <div className="chat__input"></div>
      <AddCircle fontSize="large" />
      <form>
        <input type="text" disabled value={inputMensaje} onChange={(e)=>
        setInputMensaje(e.target.value)} placeholder={`Enviar Mensaje al canal # ${ActiveCanal}
        `} />  
        <button disabled className="chat__inputButton" type="submit">
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