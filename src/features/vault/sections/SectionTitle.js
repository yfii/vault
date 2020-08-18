import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import sectionTitleStyle from "../jss/sections/sectionTitleStyle";

const useStyles = makeStyles(sectionTitleStyle);
export default function SectionTitle() {
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      <h2 className={classNames(classes.title)}>
        Deposit WETH into this vault to earn YFII
      </h2>
    </Grid>
  )
}
