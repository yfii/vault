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
import { useSnackbar } from 'notistack';
//  hooks
import { useAccount } from '../../common/redux/hooks';
import { useFetchBalances, useFetchApproval, useFetchDeposit, useFetchClaim, useFetchWithdraw, useFetchFarm, useFetchHarvest } from '../redux/hooks';



import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionOpenedPool(props) {
  const classes = useStyles();
  const { pool, closeCard, index } = props;

  const { account, provider } = useAccount();
  const { tokens } = useFetchBalances();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositPending } = useFetchDeposit();
  const { fetchClaim, fetchClaimPending } = useFetchClaim();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const { fetchFarm, fetchFarmPending } = useFetchFarm();
  const { fetchHarvest, fetchHarvestPending } = useFetchHarvest();

  const [depositedBalance, setDepositedBalance] = useState();

  const { enqueueSnackbar } = useSnackbar();

  // const handleClickVariant = (variant) => () => {
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar('This is a success message!', { variant });
  // };
  const handleDepositedBalance = event => {
    setDepositedBalance(event.target.value);
  };

  const onApproval = () => {
    fetchApproval({
      account,
      provider,
      tokenAddress: pool.tokenAddress,
      contractAddress: pool.earnContractAddress,
      index
    }).then(
      () => enqueueSnackbar(`Approval success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Approval error: ${error}`, {variant: 'error'})
    )
  }

  const onDeposit = () => {
    // alert(`onDeposit: ${depositedBalance}`)
    fetchDeposit({
      account,
      provider,
      amount: depositedBalance,
      contractAddress: pool.earnContractAddress,
    })
  }

  const onClaim = () => {
    // alert('onClaim')
    fetchClaim({
      account,
      provider,
      contractAddress: pool.earnContractAddress,
    })
  }

  const onWithdraw = () => {
    // alert('Withdraw')
    fetchWithdraw({
      account,
      provider,
      amount: pool.depositedBalance,
      contractAddress: pool.earnContractAddress,
    })
  }

  const onFarm = () => {
    fetchFarm({
      account,
      provider,
      contractAddress: pool.earnContractAddress,
    })
  }

  const onHarvest = () => {
    fetchHarvest({
      account,
      provider,
      contractAddress: pool.strategyContractAddress,
    })
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
              {depositedBalance>pool.allowance ? (
                  <Button 
                    color="primary" 
                    onClick={onApproval}
                    disabled={fetchApprovalPending}
                  >
                    {fetchApprovalPending ? 'Approval...' : 'Approval'}
                  </Button>
               ) : (
                <Button 
                  color="primary" 
                  onClick={onDeposit}
                  disabled={!Boolean(depositedBalance) || (depositedBalance==0) || fetchDepositPending}
                >
                  {fetchDepositPending ? 'Deposit...' : 'Deposit'}
                </Button>
              )}
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
                <h5 className={classes.textCenter}>{pool.depositedBalance}{pool.token}</h5>
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
                <h5>{pool.claimPendingBalance}{pool.earnedToken}</h5>
                <p>Something descriptions<br/>contents for pending</p>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
      <Button color="primary" onClick={closeCard}>展开/关闭</Button>
      <Button color="primary" onClick={onFarm}>Farm</Button>
      <Button color="primary" onClick={onHarvest}>Harvest</Button>
      <div style={{display: 'flex', justifyContent : "space-around", alignItems : "center", alignContent: "space-around"}}>
        <h4>Community contribution</h4>
        <Button color="primary" disabled>Just Mining</Button>
        <Button color="primary" disabled>Claim bonus into the Pool</Button>
        <h4>More functions is coming...</h4>
      </div>
    </div>
  )
}