import React, { useState, useEffect } from "react"

import { Avatar } from "@material-ui/core";
import { ExpandMore, Add, Mic, Settings, Headset } from "@material-ui/icons";

function Sidebar() {
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

                    <Add className="sidebar__addChannel" onClick={console.log(
                        "Canal creado"
                    )} />
                </div>

                <div className="sidebar__channelsList">
                    {/*Mapear canales mas adelante*/}

                </div>

            </div>
        </div>
    );
}

export default Sidebar;