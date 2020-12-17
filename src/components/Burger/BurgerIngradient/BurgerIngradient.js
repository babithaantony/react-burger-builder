import React from 'react';
import classes from './BurgerIngradient.module.css';
import propTypes from 'prop-types';

class BurgerIngradient extends React.Component {

    render(){
        let ingradient = null;
            switch(this.props.type){
                case("breadBottom"):
                    ingradient = <div className={classes.BreadBottom}></div>;
                    break;
                case("breadTop"):
                    ingradient = (
                        <div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>
                    );
                    break;
                
                case("meat"):
                    ingradient = <div className={classes.Meat}></div>;
                    break;
                case("cheese"):
                    ingradient = <div className={classes.Cheese}></div>;
                    break;
                case("bacon"):
                    ingradient = <div className={classes.Bacon}></div>;
                    break;
                case("salad"):
                    ingradient = <div className={classes.Salad}></div>;
                    break;
                default:
                    ingradient = null;
                    break;
            }
        return ingradient;
    }

}

BurgerIngradient.propTypes = {
    type: propTypes.string.isRequired
};

export default BurgerIngradient;