import React from 'react'

function Canalbar({nombre, id}) {
  return (
    <div className="barChannel">
        <h4>
            <span className="barChannel__hash">#</span>
            {nombre}
        </h4>
    </div>
  );
}

export default Canalbar;
