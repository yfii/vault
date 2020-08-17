import React, { useState, useEffect } from 'react';
//  hooks
import { useAccount } from '../common/redux/hooks';
import { useInitialApp } from './redux/hooks';
//  walletConnect
import { injected } from "../configure";
//  core pages
import { LoadingPage } from "../common";

export default function App({ children }) {
  const { isInit, initialApp } = useInitialApp();

  useEffect(() => {
    injected.isAuthorized().then(
      isAuthorized => {
        if (isAuthorized) {
          injected.activate()
          .then(({account, provider}) => {
            const data = { account, provider };
            initialApp(data);
            // setAccount(data).then(()=>setInit(true))
          })
          .catch((e) => {
            console.log(e)
          })
        } else {
          initialApp({ account: null, provider: null});
        }
      });
  }, [initialApp])

  return (
    <>
      { isInit ? children : <LoadingPage /> }
    </>
  );
}
