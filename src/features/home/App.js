import React, { useState, useEffect } from 'react';
//  hooks
import { useAccount } from '../common/redux/hooks';
import { useInitialApp } from './redux/hooks';
//  walletConnect
import { injected } from "../configure";
//  core pages
import { LoadingPage } from "../common";

import { SnackbarProvider } from 'notistack';

export default function App({ children }) {
  const { isInit, initialApp } = useInitialApp();

  useEffect(() => {
    const data = {account: null, provider: null}
    async function fetchData(){
      try {
        const isAuthorized = await injected.isAuthorized();
        if (isAuthorized) {
          const {account, provider} = await injected.activate();
          data.account = account;
          data.provider = provider;
        }
        initialApp(data);
      } catch {
        initialApp(data);
      }
    }
    fetchData();
  }, [initialApp])

  return (
    <SnackbarProvider>
      { isInit ? children : <LoadingPage /> }
    </SnackbarProvider>
  );
}
