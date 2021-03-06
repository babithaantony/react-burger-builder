import React, { Component } from 'react';

import Modal from '../../UI/Modal/Modal'
import Aux from '../Auxi/Auxi'

const withErrorHandler = (WrappedComponent ,axios) => {
    return class extends Component{

        state = {
            error: null
        }
        componentWillMount(){
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });
            
        }

        errorHandlerConfirmed = () => {
            this.setState({error : null});
        }

        render(){
            return <Aux>
                        <Modal show={this.state.error} 
                        handleCloseClick={this.errorHandlerConfirmed}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux>
        }
    } 
}

export default withErrorHandler;