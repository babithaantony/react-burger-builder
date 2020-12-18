import React from 'react';

import classes from './Modal.module.css'


const modal = (props) =>(
    <div 
        className={classes.Modal} 
        style={{
            
            display: props.show? 'block' : 'none',
            transform: props.show? 'transformY(0)':'transformY(-100vh)',
            opacity: props.show? '1': '0',
        }}>
        <div className={classes.ModalContent}>  
            <span className={classes.Close}
             onClick={props.handleCloseClick}
            >&times;</span>        
            {props.children}
        </div>
    </div>
);

export default modal;