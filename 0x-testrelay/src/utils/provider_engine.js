import { Web3ProviderEngine } from '0x.js';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';
import {SignerSubprovider} from '@0x/subproviders';

export const ROPSTEN_NETWORK_ID = 3;
export const ROPSTEN_CONFIGS = {
    rpcUrl: 'https://ropsten.infura.io/',
    networkId: ROPSTEN_NETWORK_ID,
};

export const getProviderEngine = ()=>{
    const pe = new Web3ProviderEngine();
    pe.addProvider(new SignerSubprovider(window.web3.currentProvider));
    pe.start();

    return pe;
}

export const getContractAddress = (networkId) => {
    return getContractAddressesForNetworkOrThrow(networkId);
}
