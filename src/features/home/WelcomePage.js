import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// sections for this page
import SectionModal from "features/common/sections/SectionModal.js";
import SectionSelect from "./sections/SectionSelect.js";
// style for this page
import welcomePageStyle from "./jss/welcomePageStyle.js";
// resource file
// hooks
import { useOpenModal } from 'features/common/redux/hooks';

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
    <div 
      className={classes.navigation}
      style={{ 
        backgroundImage: `url("https://vaultimages.thersshub.com/static/media/background.63c7684a.png")` 
      }}
    >
      <Header 
        brand="YFII"
        color="transparent"
        fixed
        links={<HeaderLinks dropdownHoverColor="info"/>}
        changeColorOnScroll={{
          height: 400,
          color: "info"
        }}
      />
      <GridContainer>
        <GridItem xs={12} style={{display: 'flex', alignItems: "center", justifyContent: "space-around",height: "100vh"}}>
          <div>
            <div className={classes.yfiiSize}>
              YFII
            </div>
            <h6 className={classes.leftText}>
              {t('Home-Subtitle')}
            </h6>
          </div>
          <div>
            <h6 className={classes.text}>
              {t('Home-Warning')}
              <br />
              {t('Home-ConnectWallet')}
            </h6>
            <Button color="rose" round onClick={openModal}>
              {t('Home-ConnectButton')}
            </Button>
          </div>
          <SectionModal />
          <SectionSelect />
        </GridItem>
      </GridContainer>
    </div>
  );
}
