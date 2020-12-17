import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/BurgerOrderSummary/BurgerOrderSummary'

import Modal from '../../components/Modal/Modal';

import Aux from '../../hoc/Aux';

const INGRADIENT_PRICES = {
    salad:1,
    bacon:2,
    meat:2,
    cheese:2
}
class BurgerBuilder extends Component{

    state = {
        ingradients: {
            salad :0 ,
            bacon: 0,            
            meat:0,
            cheese: 0
        },
        totalPrice: 4.50,
        purchasable: false,
        purchaseNow:false
    }

    setPurchasble = (ingradients) => {

      const  sum = Object.keys(ingradients).map(igKey => {
        return ingradients[igKey];
          }
      ).reduce(function(sum, el){
            return sum + el 
        });

        this.setState({
            purchasable: sum > 0
        });

    }

    addIngradientHandler = (type) =>{
        const oldCount = this.state.ingradients[type];
        const updatedCount = oldCount+1;
        const updatedIngradients = {
            ...this.state.ingradients
        }
        updatedIngradients[type] = updatedCount;
        const priceAddition = INGRADIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({
            totalPrice: newPrice,
            ingradients: updatedIngradients
        }); 
        
        this.setPurchasble(updatedIngradients);

    }

    removeIngradientHandler = (type) =>{

        const oldCount = this.state.ingradients[type];
        if(oldCount <= 0){
            return false;
        }
        const updatedCount = oldCount-1;
        const updatedIngradients = {
            ...this.state.ingradients
        }
        updatedIngradients[type] = updatedCount;
        const priceReduced = INGRADIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;

        const newPrice = oldPrice - priceReduced;

        this.setState({
            totalPrice: newPrice,
            ingradients: updatedIngradients
        });

        this.setPurchasble(updatedIngradients);
    }

    handlePurchaseClick = () =>{
        this.setState({
            purchaseNow:true
        });
    }

    purchaseCloseClick = () =>{
        
        this.setState({
            purchaseNow:false
        });
    }

    continueCheckOut = () => {
        alert("Continue!");
    }

    render(){

            const disabledIngradients = {
                ...this.state.ingradients
            }
            
            for(let key in disabledIngradients){
                disabledIngradients[key] = disabledIngradients[key] <= 0;
            }

            

        return(
            <Aux>
                <Modal 
                    show={this.state.purchaseNow}
                    handleCloseClick={this.purchaseCloseClick}>
                    <OrderSummary 
                        ingradients={this.state.ingradients} 
                        cancelPurchase={this.purchaseCloseClick} 
                        continueCheckOut={this.continueCheckOut}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingradients={this.state.ingradients} />
                <BuildControls 
                    ingradients={this.state.ingradients}
                    addIngradients={this.addIngradientHandler}
                    removeIngradients={this.removeIngradientHandler}
                    disabled = {disabledIngradients}
                    totalPrice={this.state.totalPrice} 
                    purchasable={!this.state.purchasable}
                    handlePurchaseClick={this.handlePurchaseClick} />
            </Aux>
        )
    }

}

export default BurgerBuilder;