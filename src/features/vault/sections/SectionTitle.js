import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import sectionTitleStyle from "../jss/sections/sectionTitleStyle";

const useStyles = makeStyles(sectionTitleStyle);
export default function SectionTitle() {
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      <Typography variant="h1" className={classNames(classes.title)} noWrap>Deposit to Earn</Typography>
    </Grid>
  )
}
