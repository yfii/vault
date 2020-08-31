import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import FooterLinks from 'components/Footer/FooterLinks.js'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// sections for this page
import SectionPools from "features/vault/sections/SectionPools.js";
// style for this page
import welcomePageStyle from "./jss/welcomePageStyle.js";
// resource file
// hooks
import { useOpenModal } from 'features/common/redux/hooks';
import { connect } from 'react-redux';
import { connectWallet } from './redux/actions.js';

const useStyles = makeStyles(welcomePageStyle);

export default function WelcomePage() {
  const { t } = useTranslation();
  const { openModal } = useOpenModal();
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  
  return (
    <>
      <SectionPools />
    </>
  );
}
