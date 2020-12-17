import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/BurgerOrderSummary/BurgerOrderSummary'
import axios from '../../axios-orders';

import Modal from '../../components/Modal/Modal';

import Aux from '../../hoc/Auxi';

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

    //purchase button enabled/disabled status change
    //button gets enabled or disabled based on the 'purchasebele' value
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

    //add ingradient/quantity from the builded burger
    //fired on '+' button click
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

    //remove the ingradient/quantity from the builded burger
    //fired on '-' button click
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

    //purchase now click event
    
    handlePurchaseClick = () =>{
        this.setState({
            purchaseNow:true
        });
    }

    //purchase close
    purchaseCloseClick = () =>{
        
        this.setState({
            purchaseNow:false
        });
    }

    //order noe clck
    //send the data to the server
    continueCheckOut = () => {

        const order = {
            ingradients: this.state.ingradients,
            price: this.state.totalPrice,
            customer: {
                name: 'Babitha Antony',
                phone: '123456',
                address: 'test address',
                zipcode: '1256',
                country: 'US'
            },
            deliveryMethod: 'Pick Up'
        }

        axios.post('/orders.json', order)
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error);
        });
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