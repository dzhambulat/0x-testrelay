import React, { Component } from 'react';
import {getProviderEngine, getContractAddress, ROPSTEN_CONFIGS} from './utils/provider_engine';
import { ContractAddresses, getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
import { DECIMALS, NULL_ADDRESS, ZERO } from './utils/constants';
import { Web3Wrapper } from '@0x/web3-wrapper';
import Web3 from 'web3';
import {
  assetDataUtils,
  BigNumber,
  ContractWrappers,
  generatePseudoRandomSalt,
  Order,
  orderHashUtils,
  signatureUtils,
} from '0x.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.makeSellOrder = this.makeSellOrder.bind(this);
    this.makeBuyOrder = this.makeBuyOrder.bind(this);

    window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
          // Request account access if needed
          await window.ethereum.enable();
          if(window.web3) {
            
            const pe = getProviderEngine();
            this.providerEngine = pe;
            this._0xcontract = getContractAddress(ROPSTEN_CONFIGS.networkId);
            const addresses = getContractAddressesForNetworkOrThrow(ROPSTEN_CONFIGS.networkId);
            this.zrxToken = addresses.zrxToken;
            this.etherToken = addresses.etherToken;
            this.web3Wrapper = new Web3Wrapper(pe);
     
            this.contractWrappers = new ContractWrappers(pe, { networkId: ROPSTEN_CONFIGS.networkId });
         }
        } catch (error) {
          // User denied account access...\
          console.log(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        if(window.web3) {
          const pe = getProviderEngine();
          this.providerEngine = pe;
          this._0xcontract = getContractAddress(ROPSTEN_CONFIGS.networkId);
          const addresses = getContractAddressesForNetworkOrThrow(ROPSTEN_CONFIGS.networkId);
          this.zrxToken = addresses.zrxToken;
          this.etherToken = addresses.etherToken;
          this.web3Wrapper = new Web3Wrapper(pe);
   
          this.contractWrappers = new ContractWrappers(pe, { networkId: ROPSTEN_CONFIGS.networkId });
       }
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });

  }
  async makeSellOrder() {
    alert('dd');

    const [leftMaker] = await this.web3Wrapper.getAvailableAddressesAsync();
    alert(leftMaker);
    const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(10), DECIMALS);
    const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.4), DECIMALS);
    const makerAssetData = assetDataUtils.encodeERC20AssetData(this.zrxToken);
    const takerAssetData = assetDataUtils.encodeERC20AssetData(this.etherToken);

    const leftMakerZRXApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
      this.zrxToken,
      leftMaker,
    );

    const leftOrder = {
      exchangeAddress: this._0xcontract,
      makerAddress: leftMaker,
      takerAddress: NULL_ADDRESS,
      senderAddress: NULL_ADDRESS,
      feeRecipientAddress: NULL_ADDRESS,
      expirationTimeSeconds: 400,
      salt: generatePseudoRandomSalt(),
      makerAssetAmount,
      takerAssetAmount,
      makerAssetData,
      takerAssetData,
      makerFee: ZERO,
      takerFee: ZERO,
    };

    const leftOrderHashHex = orderHashUtils.getOrderHashHex(leftOrder);
    const leftOrderSignature = await signatureUtils.ecSignHashAsync(this.providerEngine, leftOrderHashHex, leftMaker);
    const leftSignedOrder = { ...leftOrder, signature: leftOrderSignature };
    alert(JSON.stringify(leftSignedOrder));
  }
  makeBuyOrder() {

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
