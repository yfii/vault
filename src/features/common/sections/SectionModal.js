import React from 'react';
// @material-ui/core components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { useCloseModal } from '../redux/hooks';
// sections for this page
import SectionWallet from './SectionWallet'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getLibrary = provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export default function SectionModal() {
  const { modalIsOpen, closeModal } = useCloseModal();

  const fullScreen = window.innerWidth < 450;
  return (
    <Dialog
      open={modalIsOpen}
      TransitionComponent={Transition}
      onClose={closeModal}
      fullWidth={ true }
      maxWidth={ 'sm' }
      fullScreen={ fullScreen }
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <SectionWallet />
      </Web3ReactProvider>
    </Dialog>   
  );
}
