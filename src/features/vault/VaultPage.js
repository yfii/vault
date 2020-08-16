import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// sections for this page
import SectionTitle from './sections/SectionTitle';
import SectionWallet from './sections/SectionWallet';
import SectionPools from './sections/SectionPools';


import vaultPageStyle from "./jss/vaultPageStyle";

const useStyles = makeStyles(vaultPageStyle);

export default function VaultPage() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  return (
    <div className={classes.page}>
      <Header
        brand="Vault"
        links={<HeaderLinks/>}
        color="primary"
      />
      <div className={classes.main}>
        <div className={classes.container}>
          <SectionTitle />
          <SectionWallet />
          <SectionPools />
        </div>
      </div>
    </div>
  );
}
