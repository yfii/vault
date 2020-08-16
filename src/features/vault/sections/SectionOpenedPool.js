import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { useFetchBalances } from '../redux/hooks';

import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionOpenedPool(props) {
  const classes = useStyles();
  const { pool, closeCard } = props;

  const { tokens } = useFetchBalances();

  const [depositedBalance, setDepositedBalance] = useState();
  const handleDepositedBalance = event => {
    console.log(depositedBalance)
    setDepositedBalance(event.target.value);
  };

  const onDeposit = () => {
    alert(`onDeposit: ${depositedBalance}`)
  }

  const onClaim = () => {
    alert('onClaim')
  }

  const onWithdraw = () => {
    alert('Withdraw')
  }

  return (
    <div style={{width: '100%'}}>
      <Card raised>
        <CardBody>
          <div 
            style={{ 
              display: "flex",
              justifyContent : "space-around",
              alignItems : "center",
              alignContent: "space-around"
            }}
          >
            <div>logo</div>
            <div>{tokens[pool.token].tokenBalance}</div>
            <div>
              <h5>{pool.token}</h5>
              <h6>Balance</h6>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent : "space-around",
                alignItems : "center",
                alignContent: "space-around"
              }}
            >
              <CustomInput
                id="password"
                inputProps={{
                  placeholder: `Input numbers of ${pool.token} you want to deposit`,
                  type: "number",
                  autoComplete: "off"
                }}
                formControlProps={{
                  fullWidth: true,
                  className: classes.formControl,
                  onChange: handleDepositedBalance,
                }}
              />
              <Button 
                color="primary" 
                onClick={onDeposit}
                disabled={
                  !Boolean(depositedBalance) || (depositedBalance==0)
                }
              >
                Deposit
              </Button>
            </div>
          </div>
          <div
            style={{ 
              display: "flex",
              justifyContent : "space-between",
              alignItems : "center",
              alignContent: "space-around"
            }}
          >
            <Card style={{ width: "20rem" }}>
              <CardBody>
                <h4 className={classes.cardTitle}>Deposited</h4>
                <h5 className={classes.textCenter}>{pool.stakedBalance}{pool.token}</h5>
                <Button color="primary" round block onClick={onWithdraw}>Withdraw</Button>
              </CardBody>
            </Card>
            <Card style={{ width: "20rem" }}>
              <CardBody>
                <h4 className={classes.cardTitle}>Earned</h4>
                <h5 className={classes.textCenter}>{pool.claimAbleBalance}{pool.earnedToken}</h5>
                <Button color="primary" round block onClick={onClaim}>claim</Button>
              </CardBody>
            </Card>
            <Card style={{ width: "20rem" }}>
              <CardBody>
                <h4 className={classes.cardTitle}>Pending</h4>
                <h5>未知{pool.earnedToken}</h5>
                <p>Something descriptions<br/>contents for pending</p>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
      <Button color="primary" onClick={closeCard}>展开/关闭</Button>
      <div style={{display: 'flex', justifyContent : "space-around", alignItems : "center", alignContent: "space-around"}}>
        <h4>Community contribution</h4>
        <Button color="primary" disabled>Just Mining</Button>
        <Button color="primary" disabled>Claim bonus into the Pool</Button>
        <h4>More functions is coming...</h4>
      </div>
    </div>
  )
}