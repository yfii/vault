import React from 'react';
// @material-ui/core components
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
// sections for this page
import SectionTitle from './sections/SectionTitle';
import SectionWallet from './sections/SectionWallet';
import SectionPools from './sections/SectionPools';
// hooks

export default function VaultPage() {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  return (
    <>
      <SectionTitle />
      <SectionWallet />
      <SectionPools />
    </>
  );
}