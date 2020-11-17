import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'auto', border:'none'}}>
            {props.children}
        </div>
    );
};

export default Scroll;