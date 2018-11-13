import  ProviderEngine  from 'web3-provider-engine';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
import {SignerSubprovider} from '@0x/subproviders';

export const ROPSTEN_NETWORK_ID = 3;
export const ROPSTEN_CONFIGS = {
    rpcUrl: 'https://ropsten.infura.io/',
    networkId: ROPSTEN_NETWORK_ID,
};

export const getProviderEngine = ()=>{
    const pe = new ProviderEngine();
    console.log(window.web3);
    pe.addProvider(new SignerSubprovider(window.web3.currentProvider));

    return pe;
}

export const getContractAddress = (networkId) => {
    return getContractAddressesForNetworkOrThrow(networkId);
}
