import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui icons
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// sections for this page
import sectionWalletStyle from "../jss/sections/sectionWalletStyle";
//  hooks
import { useAccount } from '../../common/redux/hooks';

const useStyles = makeStyles(sectionWalletStyle);

export default function SectionWallet() {
  const classes = useStyles();
  const { account } = useAccount();
  const address = account.substring(0,6)+'...'+account.substring(account.length-4,account.length)
  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12} sm={3}>
        <Card className={classes.walletCard}>
          <CardBody style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              className={classes.walletTitle}
            >
              Wallet
            </Typography>
            <Typography 
              variant="subtitle1"
              className={classNames(classes.walletAddress, classes.mlAuto)}
              noWrap
            >
              { address }
            </Typography>
          </CardBody>
        </Card>
      </Grid>
    </Grid>
  );
}