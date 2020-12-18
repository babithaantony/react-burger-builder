import React from 'react';
import Button from '../BuildControls/Button';

import Aux from '../../../hoc/Auxi/Auxi'

const orderSummary = (props) => {

    let ingradients = Object.keys(props.ingradients);

    let ingradientSummary = ingradients.map((ingKey) => {
                                return <li key={ingKey}>{ingKey} : {props.ingradients[ingKey]}</li>
                            });
    
    let totalPrice  = props.totalPrice;
    totalPrice  = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(totalPrice);


    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your Burger is ready!</p>
            <ul>
                {ingradientSummary}
            </ul>
    <h4>Total Price: {totalPrice}</h4>
            <p>Ready to checkout?</p>
            <Button 
                btnType="Danger" 
                 onclick={props.cancelPurchase}>CANCEL</Button>
            <Button 
                btnType="Success"
                onclick={props.continueCheckOut}>CHECKOUT</Button>
        </Aux>
        
    );
}

export default orderSummary;