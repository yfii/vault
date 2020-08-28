import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader'
//  hooks
import { useInitialApp } from './redux/hooks';
//  walletConnect
import { injected } from "../configure";
//  core pages
import { LoadingPage } from "../common";

import { SnackbarProvider } from 'notistack';

function App({ children }) {
  const { isInit, initialApp } = useInitialApp();

  useEffect(() => {
    const data = {account: '', provider: null}
    async function fetchData(){
      try {
        const isAuthorized = await injected.isAuthorized();
        if (isAuthorized) {
          const {account, provider} = await injected.activate();
          data.account = account || '';
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

export default hot(module)(App)
