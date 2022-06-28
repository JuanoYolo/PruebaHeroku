import React from 'react'

function Canalbar({nombre, id}) {
  return (
    <div className="sidebarChannel">
        <h4>
            <span className="sidebarChannel__hash">#</span>
            {nombre}
        </h4>
    </div>
  );
}

export default Canalbar;
