import React, { Component } from 'react';
import {getProviderEngine, getContractAddress, ROPSTEN_CONFIGS} from './utils/provider_engine';
import { Web3Wrapper } from '@0x/web3-wrapper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.makeSellOrder = this.makeSellOrder.bind(this);
    this.makeBuyOrder = this.makeBuyOrder.bind(this);

    if(window.web3) {
      const pe = getProviderEngine();
      let _0xcontract = getContractAddress(ROPSTEN_CONFIGS.networkId);
    }

  }
  makeSellOrder() {
    alert('fff');
  }
  makeBuyOrder() {
    alert('buy');
  }
  handleChange(event) {
    this.setState({signedOrder: event.target.value});
  }
  render() {
    return (
      <div className="App">
        
        { !window.web3 &&
          <h2>
            You have to use Metamask
          </h2>
        }
        <button onClick={this.makeSellOrder}>Create Sell Order</button> 

        <input type="text" value={this.state.signedOrder} onChange={this.handleChange}/>
        <button onClick={this.makeBuyOrder}>Create Buy Order</button> 
      </div>
    );
  }
}

export default App;
