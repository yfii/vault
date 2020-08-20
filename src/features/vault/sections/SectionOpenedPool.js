import React, { useState, useEffect } from 'react';
import moment from "moment";
import BigNumber from "bignumber.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
// core components
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { useSnackbar } from 'notistack';
//  hooks
import { useAccount } from '../../common/redux/hooks';
import { useFetchBalances, useFetchApproval, useFetchDeposit, useFetchClaim, useFetchWithdraw, useFetchFarm, useFetchHarvest } from '../redux/hooks';
// sections for this section
import SectionModal from "./SectionModal";

import sectionOpenedPoolStyle from "../jss/sections/sectionOpenedPoolStyle";

const useStyles = makeStyles(sectionOpenedPoolStyle);

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

  const [ modalOpen, setModalOpen ] = useState({ isOpen: false, depositedTime: 0,func: null });

  const [depositedBalance, setDepositedBalance] = useState();

  const { enqueueSnackbar } = useSnackbar();

  // const handleClickVariant = (variant) => () => {
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar('This is a success message!', { variant });
  // };
  const handleDepositedBalance = event => {
    setDepositedBalance(event.target.value);
  };

  const byDecimals = number => {
    const decimals = new BigNumber(10).exponentiatedBy(18);
    return new BigNumber(number).dividedBy(decimals).toFormat(4);
  }

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
      amount: new BigNumber(depositedBalance).toString(),
      contractAddress: pool.earnContractAddress,
    }).then(
      () => enqueueSnackbar(`Deposit success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Deposit error: ${error}`, {variant: 'error'})
    )
  }

  const onClaim = () => {
    const time = new BigNumber(pool.depositedTime).multipliedBy(1000).toNumber();
    const nowTime = new Date().getTime();
    const depositedTime = new BigNumber(nowTime).minus(time).toNumber();
    const func = () => {
      fetchClaim({
        account,
        provider,
        contractAddress: pool.earnContractAddress,
      }).then(
        () => enqueueSnackbar(`Claim success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Claim error: ${error}`, {variant: 'error'})
      )
    }
    if (depositedTime < 1000*60*60*24) {
      setModalOpen({
        isOpen: true,
        depositedTime,
        func
      })
    } else {
      fetchClaim({
        account,
        provider,
        contractAddress: pool.earnContractAddress,
      }).then(
        () => enqueueSnackbar(`Claim success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Claim error: ${error}`, {variant: 'error'})
      )
    }    
  }

  const onWithdraw = () => {
    // alert('Withdraw')
    const time = new BigNumber(pool.depositedTime).multipliedBy(1000).toNumber();
    const nowTime = new Date().getTime();
    const depositedTime = new BigNumber(nowTime).minus(time).toNumber();
    const func = () => {
      fetchWithdraw({
        account,
        provider,
        amount: pool.depositedBalance,
        contractAddress: pool.earnContractAddress,
      }).then(
        () => enqueueSnackbar(`Withdraw success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Withdraw error: ${error}`, {variant: 'error'})
      )
    }
    if (depositedTime < 1000*60*60*24) {
      setModalOpen({
        isOpen: true,
        depositedTime,
        func
      })
    } else {
      fetchWithdraw({
        account,
        provider,
        amount: pool.depositedBalance,
        contractAddress: pool.earnContractAddress,
      }).then(
        () => enqueueSnackbar(`Withdraw success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Withdraw error: ${error}`, {variant: 'error'})
      )
    }    
  }

  const onFarm = () => {
    fetchFarm({
      account,
      provider,
      contractAddress: pool.earnContractAddress,
    }).then(
      () => enqueueSnackbar(`Farm success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Farm error: ${error}`, {variant: 'error'})
    )
  }

  const onHarvest = () => {
    fetchHarvest({
      account,
      provider,
      contractAddress: pool.strategyContractAddress,
    }).then(
      () => enqueueSnackbar(`Harvest success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Harvest error: ${error}`, {variant: 'error'})
    )
  }

  return (
    <GridContainer>
      <SectionModal pool={pool} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      <GridItem xs={12}>
        <Paper className={classes.root}>
          <GridContainer>
            <GridItem xs={12} style={{ 
              display: "flex",
              justifyContent : "space-between",
              alignItems : "center",
              alignContent: "space-around"
            }}>
              <div>logo</div>
              <div>{byDecimals(tokens[pool.token].tokenBalance)}</div>
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
                    disabled={
                      !Boolean(depositedBalance) || (depositedBalance==0) || fetchDepositPending || (new BigNumber(depositedBalance).toNumber() > byDecimals(tokens[pool.token].tokenBalance))
                    }
                  >
                    {fetchDepositPending ? 'Deposit...' : 'Deposit'}
                  </Button>
                )}
            </div>
            </GridItem>
            <GridItem xs={12} style={{ 
              display: "flex",
              justifyContent : "space-between",
              alignItems : "center",
              alignContent: "space-around"
            }}>
              <Card>
                <CardBody>
                  <h4 className={classes.cardTitle}>Deposited</h4>
                  <h5 className={classes.textCenter}>{byDecimals(pool.depositedBalance)} {pool.token}</h5>
                  <Button 
                    color="primary"
                    round
                    block
                    onClick={onWithdraw}
                    disabled={fetchWithdrawPending}
                  >
                    {fetchWithdrawPending ? 'Withdraw...': 'Withdraw'}
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4 className={classes.cardTitle}>Earned</h4>
                  <h5 className={classes.textCenter}>{byDecimals(pool.claimAbleBalance)} {pool.earnedToken}</h5>
                  <Button color="primary" round block onClick={onClaim} disabled={fetchClaimPending}>
                    {fetchClaimPending ? 'claim...' : 'claim'}
                  </Button>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4 className={classes.cardTitle}>Pending</h4>
                  <h5>{byDecimals(pool.claimPendingBalance)} {pool.earnedToken}</h5>
                  <p>Something descriptions<br/>contents for pending</p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Paper>
      </GridItem>
      <Button color="primary" onClick={closeCard}>展开/关闭</Button>
      <GridItem xs={12}>
        <GridContainer>
          <GridItem xs={6}>
            <Card>
              <CardBody>
                <h4 className={classes.cardTitle}>Idle</h4>
                <h5 className={classes.textCenter}>{byDecimals(pool.idle)} {pool.token}</h5>
                <Button color="primary" round block onClick={onFarm} disabled={fetchFarmPending}>
                  {fetchFarmPending?'Farm...':'Farm'}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={6}>
            <Card>
              <CardBody>
                <h4 className={classes.cardTitle}>Yield</h4>
                <h5 className={classes.textCenter}>{byDecimals(pool.yield)} {pool.earnedToken}</h5>
                <Button color="primary" round block onClick={onHarvest} disabled={fetchHarvestPending}>
                {fetchHarvestPending?'Harvest...':'Harvest'}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
  )
}