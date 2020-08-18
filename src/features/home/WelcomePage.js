import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// sections for this page
import SectionModal from "features/common/sections/SectionModal.js";
// style for this page
import welcomePageStyle from "./jss/welcomePageStyle.js";
// resource file
import image from "images/background.png";
// hooks
import { useOpenModal } from 'features/common/redux/hooks';

const useStyles = makeStyles(welcomePageStyle);

export default function WelcomePage() {
  const { openModal } = useOpenModal();
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  
  return (
    <div 
      className={classes.navigation}
      style={{ backgroundImage: "url(" + image + ")" }}
    >
      <Header
        brand="YFII"
        color="transparent"
        links={<HeaderLinks/>}
      />
      <GridContainer>
        <GridItem xs={12} style={{display: 'flex', alignItems: "center", justifyContent: "space-around",height: "300px"}}>
          <div>
            <div className={classes.yfiiSize}>
              YFII
            </div>
            <h6 className={classes.leftText}>
              A Better Way For Everyone To Get Rich.
            </h6>
          </div>
          <div>
            <h6 className={classes.text}>
              This porject is in beta, Use at your own risk.
              <br />
              Connect your wallet to continue.
            </h6>
            <Button color="rose" round onClick={openModal}>
              Connect
            </Button>
          </div>
          <SectionModal />
        </GridItem>
      </GridContainer>
    </div>
  );
}
