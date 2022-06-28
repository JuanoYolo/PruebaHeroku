import React from 'react'

import { Notifications, Search, Send } from "@material-ui/icons"

function ChatHeader({nombreCanal}) {
    return (
        <div className="chatHeaader">

            <div className="chatHeaader__left">
                <h3>
                    <span className="chatHeaader__hash">#</span>
                   {nombreCanal}
                </h3>
            </div>

        <div className="chatHeaader__right">
            <Notifications />

            <div className="chatHeaader__search">
                <input placeholder="Search" />
                <Search />
            </div>

            <Send />
            </div>
        </div>
    )
}

export default ChatHeader