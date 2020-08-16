import React from 'react';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
  return (
    <div>
      <Card style={{ width: "40rem", margin: "0 auto" }}>
        <CardBody style={{ display: "flex" }}>
          <div className={classes.walletTitle}>wallet:</div>
          <div className={classNames(classes.walletAddress, classes.mlAuto)}>{ account }</div>
        </CardBody>
      </Card>
    </div>
  );
}