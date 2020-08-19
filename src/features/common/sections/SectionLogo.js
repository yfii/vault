import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// sections for this page
// style for this page
import SectionLogoStyle from "../jss/SectionLogoStyle";

const useStyles = makeStyles(SectionLogoStyle);

export default function SectionLogo() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src={require('../../../images/YFII-logo.png')} alt="YFII Logo" />
      </div>
      <div className="brand">YFII</div>
    </div>  
  );
}
