import React from 'react'

import { Avatar } from "@material-ui/core";

function Message({firebaseMessage}) {
  return <div className="messages">
    <Avatar src={firebaseMessage.foto} />
    <div className="messages__info"></div>
    <h3>{firebaseMessage.useer}
    <span className="messages__hour">
        {new Date(firebaseMessage.id).toLocaleString}
    </span>
    </h3>

        <p>{firebaseMessage.messsages}</p>
  </div>
}

export default Message