import { useCallback } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import UniLogin from "@unilogin/provider";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { HOME_CREATE_WEB3MODAL } from './constants';

const random = parseInt(Math.random() * Number(process.env.INFURA_RANDOM), 10)
const INFURA_ID = process.env["INFURA_ID_" + random] ? process.env["INFURA_ID_" + random] : process.env.INFURA_ID_0;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID
    }
  },
  torus: {
    package: Torus
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: process.env.FORTMATIC_KEY
    }
  },
  authereum: {
    package: Authereum
  },
  unilogin: {
    package: UniLogin
  }
};


export function createWeb3Modal() {
  return dispatch => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions
    })
    console.log(web3Modal)
    console.log("web3Modal.cachedProvider: "+web3Modal.cachedProvider)
    // if (web3Modal.cachedProvider) {
    //   onConnect(web3Modal);
    // }
    // onConnect(web3Modal);
    dispatch({ type: HOME_CREATE_WEB3MODAL, data: web3Modal })
  };
}

export function useWeb3Modal() {
  const dispatch = useDispatch();
  const web3Modal = useSelector(state => state.home.web3Modal, shallowEqual);
  const boundAction = useCallback(() => dispatch(createWeb3Modal()), [dispatch]);

  return { web3Modal, createWeb3Modal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CREATE_WEB3MODAL:
      return {
        ...state,
        web3Modal: action.data,
      };

    default:
      return state;
  }
}