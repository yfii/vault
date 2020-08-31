import React, { useEffect } from 'react';
import { withRouter } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import FooterLinks from 'components/Footer/FooterLinks.js'
// sections for this page
import SectionTitle from './sections/SectionTitle';
import SectionWallet from './sections/SectionWallet';
import SectionPools from './sections/SectionPools';
// hooks
import { useAccount } from 'features/common/redux/hooks';


import vaultPageStyle from "./jss/vaultPageStyle";

const useStyles = makeStyles(vaultPageStyle);

function VaultPage(props) {
  const classes = useStyles();
  const { account } = useAccount();

  window.scrollTo(0, 0);
  document.body.scrollTop = 0;

  useEffect(() => {
    if (!account) { 
      return props.history.push('/')
    }
  }, [account, props.history]);
  return (
    <>
      <SectionTitle />
      <SectionWallet />
      <SectionPools />
    </>
  );
}

export default withRouter(VaultPage);
