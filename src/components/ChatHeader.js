import React from 'react'

function ChatHeader({nombreCanal}) {
    return (
        <div className="chatHeaader">

            <div className="chatHeaader__left">
                <h3>
                    <span className="chatHeaader__hash">#</span>
                   {nombreCanal}
                </h3>
            </div>

        </div>
    )
}

export default ChatHeader