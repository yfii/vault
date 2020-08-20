import React, { useState, useEffect } from 'react';
// @material-ui/core components
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// core components
import Button from "components/CustomButtons/Button.js";

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'

import { useAccount, useEagerConnect, useInactiveListener, useCloseModal } from '../redux/hooks';

import {
  injected,
  network,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  frame,
  authereum,
  fortmatic,
  portis,
  squarelink,
  torus
} from '../../configure';

const connectorsByName = {
  MetaMask: injected,
  TrustWallet: injected,
  WalletConnect: walletconnect,
  WalletLink: walletlink,
  Ledger: ledger,
  Trezor: trezor,
  // Frame: frame,
  Fortmatic: fortmatic,
  Portis: portis,
  Squarelink: squarelink,
  Torus: torus,
  Authereum: authereum
}

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

export default function SectionWallet() {
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  const { setAccount } = useAccount();

  const { closeModal } = useCloseModal();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useEffect(() => {
    if (account && active && library) {

      const data = {
        account,
        provider: library.provider
      }
      setAccount(data);
      closeModal();
    }
  }, [account, active, context, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const width = window.innerWidth

  return (
    
      <DialogContent>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: (width > 650 ? 'space-between' : 'center'), alignItems: 'center' }}
        >
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name]
            const activating = currentConnector === activatingConnector
            const connected = currentConnector === connector
            const disabled = !triedEager || !!activatingConnector || connected || !!error

            return (
              <div key={name} style={{ padding: '12px 0px', display: 'flex', justifyContent: 'space-between'  }}>
                <Button
                  style={{
                    padding: '16px',
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    border: '1px solid #E1E1E1',
                    fontWeight: 500,
                    display: 'flex',
                    justifyContent: 'space-between',
                    minWidth: '250px'
                  }}
                  variant='outlined'
                  color='primary'
                  disabled={disabled}
                  onClick={() => {
                    console.log('begin')
                    setActivatingConnector(currentConnector)
                    console.log(name)
                    console.log(connectorsByName[name])
                    activate(connectorsByName[name])
                    console.log('close')
                  }}
                >
                  <Typography style={ {
                  margin: '0px 12px',
                  color: 'rgb(1, 1, 1)',
                  fontWeight: 500,
                  fontSize: '1rem',
                } }
                    variant={ 'h3'}>
                    { name }
                  </Typography>
                    { (!activating && !connected) && <img style={
                      {
                        position: 'absolute',
                        right: '20px',

                        width: '30px',
                        height: '30px'
                      }
                    } src={"url"} alt=""/> }
                    {activating && <CircularProgress size={ 15 } style={{marginRight: '10px'}} />}
                    {(!activating && connected) && <div style={{ background: '#4caf50', borderRadius: '10px', width: '10px', height: '10px', marginRight: '10px' }}></div>}
                  {name}
                </Button>
              </div>
            )
          })}
        </div>
        <div style={{ width: '252px', margin: '12px 0px'  }}>
        <Button style={ {
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '20px',
            border: '1px solid #E1E1E1',
            fontWeight: 500,
            minWidth: '250px'
          } }
          variant='outlined'
          color='primary'
          onClick={() => { 
            if(deactivate) {
              deactivate()
            }
            if(connector && connector.close) {
              connector.close()
            }
          }}>
          <Typography style={ {
              marginLeft: '12px',
              fontWeight: '700',
              color: '#DC6BE5'
            } }
            variant={ 'h5'}
            color='primary'>
            Deactivate
          </Typography>
        </Button>
      </div>
      </DialogContent>     
  );
}
