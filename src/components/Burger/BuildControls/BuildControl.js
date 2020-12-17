import React from 'react';

const buildcontrol = (props) => {
    
    return (
            <li key={props.ingKey}>
                        {props.ingradient}
                        <button onClick={props.addIngradients}>+</button>
                        <button onClick={props.removeIngradients} disabled={props.disabled}>-</button>
                    </li>
    ); 
}

export default buildcontrol;