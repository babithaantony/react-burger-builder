import React from 'react';
import BurgerIngradient from './BurgerIngradient/BurgerIngradient';
import classes from './Burger.module.css';


const burger = (props) => {
    
    let transformedIngradients = Object.keys(props.ingradients)
        .map(igKey => { 
            return [...Array(props.ingradients[igKey])].map((_, i) => {
                
                return <BurgerIngradient key={igKey + i} type={igKey} />
            })
        }).reduce((arr, el) => {
            return arr.concat(el)
        },[]);

        if(transformedIngradients.length === 0){
            transformedIngradients = <p>Please add ingradients!</p>;
        }

    return(
        <div className={classes.Burger}>
            <BurgerIngradient type="breadTop" />
            {transformedIngradients}
            <BurgerIngradient type="breadBottom" />
        </div>
    )

}

export default burger;