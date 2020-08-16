import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import sectionTitleStyle from "../jss/sections/sectionTitleStyle";

const useStyles = makeStyles(sectionTitleStyle);
export default function SectionTitle() {
  const classes = useStyles();

  return (
    <h1 className={classNames(classes.title, classes.textCenter)}>
      Deposit WETH into this vault to earn YFII
    </h1>
  )
}
