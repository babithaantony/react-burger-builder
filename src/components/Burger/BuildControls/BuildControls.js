import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl';

const buildcontrols = (props) => {
    let ingradients = Object.keys(props.ingradients);
    let totalPrice  = props.totalPrice;
     totalPrice  = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(totalPrice);

    let ingradientControls = ingradients.map((ing,ingKey) => {
            return <BuildControl key={ingKey} 
                        ingKey={ingKey} 
                        ingradient={ing} 
                        addIngradients={() => props.addIngradients(ing)}
                        removeIngradients = {() => props.removeIngradients(ing)}
                        disabled={props.disabled[ing]}/>
                 
        });

    return (
            <ul className={classes.contolsController}>
                <li>Total Price: {totalPrice}</li>
                {ingradientControls}
                <li>
                    <button 
                        disabled={props.purchasable}
                        onClick={props.handlePurchaseClick}>
                            Purchase Now
                    </button>
                    </li>
            </ul>
            
        
        
    ); 
}

export default buildcontrols;