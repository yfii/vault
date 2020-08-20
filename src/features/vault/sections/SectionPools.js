import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import BigNumber from "bignumber.js";
// @material-ui/core components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionActions'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import CustomInput from "components/CustomInput/CustomInput.js";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
// sections for this section
// import SectionOpenedPool from "./SectionOpenedPool";
import { useSnackbar } from 'notistack';
//  hooks
import { useAccount } from '../../common/redux/hooks';
import { useFetchBalances, useFetchPoolBalances, useFetchPrice, useFetchApproval, useFetchDeposit, useFetchClaim, useFetchWithdraw, useFetchFarm, useFetchHarvest } from '../redux/hooks';

import SectionModal from "./SectionModal";

import logo from 'images/SNX-logo.png'

import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionPools() {
  const { t, i18n } = useTranslation();
  const { account, provider } = useAccount();
  const { pools, fetchPoolBalances } = useFetchPoolBalances();
  const { tokens, fetchBalances } = useFetchBalances();
  const { price, fetchPrice } = useFetchPrice();
  const [ openedCardList, setOpenCardList ] = useState([]);
  const classes = useStyles();

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
    return new BigNumber(number).dividedBy(decimals);
  }

  const onApproval = (pool, index) => {
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

  const onDeposit = (pool, event) => {
    // alert(`onDeposit: ${depositedBalance}`)
    event.stopPropagation();
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

  const onClaim = (pool) => {
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

  const onWithdraw = (pool) => {
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

  const onFarm = (pool) => {
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

  const onHarvest = (pool) => {
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

  const openCard = id => {
    return setOpenCardList(
      openedCardList => {
        if(openedCardList.includes(id)) {
          return openedCardList.filter(item => item!==id)
        } else {
          return [...openedCardList, id]
        }
      }
    )
  } 

  useEffect(() => {
    fetchBalances({account, provider, tokens});
  }, [account, provider,fetchBalances]);

  useEffect(() => {
    fetchPoolBalances({account, provider, pools, price});
  }, [account, provider, price, fetchPoolBalances]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchBalances({account, provider, tokens});
    }, 10000);
    return () => clearInterval(id);
  }, [account, provider,fetchBalances]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchPoolBalances({account, provider, pools, price});
    }, 10000);
    return () => clearInterval(id);
  }, [account, provider, price, fetchPoolBalances]);
  
  useEffect(() => {
    fetchPrice();
  }, [account, provider,fetchPoolBalances]);

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={10}>
        {pools.map((pool, index) => {
          return <Accordion
            key={ index }
            expanded={ Boolean(openedCardList.includes(index))}
            onChange={ () => openCard(index) }
                 >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={classes.details}
            >
              <GridItem xs={12}>
                <GridContainer>
                  <SectionModal pool={pool} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
                  <GridItem xs={12} sm={4} style={{
                    display: "flex",
                    justifyContent : "space-around",
                    alignItems : "center",
                    alignContent: "space-around",
                  }}>
                    <Avatar alt={pool.token} src={require(`../../../images/${pool.token}-logo.png`)} />
                    <div
                      style={{
                        fontSize: "1.5rem"
                      }}
                    >{
                      new BigNumber(
                        byDecimals(tokens[pool.token].tokenBalance)
                      ).multipliedBy(
                        new BigNumber(10000)
                      ).dividedToIntegerBy(
                        new BigNumber(1)
                      ).dividedBy(
                        new BigNumber(10000)
                      ).toString()
                    }</div>
                    <div>
                      <h5>{pool.token}</h5>
                      <h6>{t('Vault-Balance')}</h6>
                    </div>
                  </GridItem>
                  {
                    openedCardList.includes(index) ? (
                      <GridItem xs={12} sm={8}
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
                              placeholder: `${t('Vault-Input-1')}${pool.token}${t('Vault-Input-2')}`,
                              type: "number",
                              autoComplete: "off"
                          }}
                          formControlProps={{
                            onClick: (event) => event.stopPropagation(),
                            onFocus: (event) => event.stopPropagation(),
                              fullWidth: true,
                              className: classes.formControl,
                              onChange: handleDepositedBalance,
                          }}
                          // onClick={e=>e.stopPropagation()}
                        />
                        {depositedBalance>pool.allowance ? (
                          <Button
                            color="primary"
                            onClick={onApproval.bind(this, pool, index)}
                            disabled={fetchApprovalPending}
                          >
                            {fetchApprovalPending ? `${t('Vault-ApproveING')}` : `${t('Vault-ApproveButton')}`}
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            onClick={onDeposit.bind(this, pool)}
                            onFocus={(event) => event.stopPropagation()}
                            disabled={
                              !Boolean(depositedBalance) || (depositedBalance==0) || fetchDepositPending || (new BigNumber(depositedBalance).toNumber() > byDecimals(tokens[pool.token].tokenBalance).toNumber())
                            }
                          >
                            {fetchDepositPending ? `${t('Vault-DepositING')}` : `${t('Vault-DepositButton')}`}
                          </Button>
                        )}
                        {/* </FormControl> */}
                      </GridItem>
                    ) : (
                      <GridItem xs={12} sm={8}
                        style={{
                          display: "flex",
                          justifyContent : "space-around",
                          alignItems : "center",
                          alignContent: "space-around",
                        }}
                      >
                        <div>
                          <h5>{byDecimals(pool.depositedBalance).toFormat(4)}</h5>
                          <h6>{t('Vault-ListDeposited')} { pool.token }</h6>
                        </div>
                        <div>
                          <h5>{byDecimals(pool.claimAbleBalance).toFormat(4)}</h5>
                          <h6>{t('Vault-ListEarned')} { pool.earnedToken }</h6>
                        </div>
                        <div>
                          <h5>{byDecimals(pool.claimPendingBalance).toFormat(4)}</h5>
                          <h6>{t('Vault-ListPending')} { pool.earnedToken }</h6>
                        </div>
                      </GridItem>
                    )}
                </GridContainer>
              </GridItem>
              {/* <Card key={index}
                style={{
                borderRadius: "50rem",
                borderStyle: "solid",
                borderWidth: "2px",
                backgroudColor: "#f2f2f2",
                // borderColor: "rgb(233, 30, 99)",
                boxShadow: "0 0",
                // opacity: 0.5

                }}
                >
                <CardBody style={{
                display: "flex",
                justifyContent : "space-around",
                alignItems : "center",
                alignContent: "space-around",
                backgroudColor: "#f2f2f2",
              }}> */}



            </AccordionSummary>
            <AccordionDetails>
              <GridItem xs={12}>
                <GridContainer>
                  <GridItem xs={12} md={4} style={{
                    display: "flex",
                    justifyContent : "space-between",
                    alignItems : "center",
                    alignContent: "space-around"
                  }}>
                    <Card className={classes.cardWrap}>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{t('Vault-Deposited')}</h4>
                        <h5 className={classes.textCenter}>{byDecimals(pool.depositedBalance).toFormat(4)} {pool.token}</h5>
                        <Button
                          color="primary"
                          round
                          block
                          onClick={onWithdraw.bind(this, pool)}
                          disabled={fetchWithdrawPending}
                        >
                          {fetchWithdrawPending ? `${t('Vault-WithdrawING')}`: `${t('Vault-WithdrawButton')}`}
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} md={4}>
                    <Card className={classes.cardWrap}>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{t('Vault-Earned')}</h4>
                        <h5 className={classes.textCenter}>{byDecimals(pool.claimAbleBalance).toFormat(4)} {pool.earnedToken}</h5>
                        <Button color="primary" round block onClick={onClaim.bind(this, pool)} disabled={fetchClaimPending}>
                          {fetchClaimPending ? `${t('Vault-ClaimING')}` : `${t('Vault-ClaimButton')}`}
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} md={4}>
                    <Card className={classes.cardWrap}>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{t('Vault-Pending')}</h4>
                        <h5>{byDecimals(pool.claimPendingBalance).toFormat(4)} {pool.earnedToken}</h5>
                        <p>{t('Vault-PendingDescription')}<br/>{t('Vault-PendingContent')}</p>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <Card>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{t('Vault-Idle')}</h4>
                        <h5 className={classes.textCenter}>{byDecimals(pool.idle).toFormat(4)} {pool.token}</h5>
                        <Button color="primary" round block onClick={onFarm.bind(this, pool)} disabled={fetchFarmPending}>
                          {fetchFarmPending?`${t('Vault-FarmING')}`:`${t('Vault-FarmButton')}`}
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <Card>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{t('Vault-Yield')}</h4>
                        <h5 className={classes.textCenter}>{byDecimals(pool.yield).toFormat(4)} {pool.earnedToken}</h5>
                        <Button color="primary" round block onClick={onHarvest.bind(this, pool)} disabled={fetchHarvestPending}>
                        {fetchHarvestPending?`${t('Vault-HarvestING')}`:`${t('Vault-HarvestButton')}`}
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridItem>
                    {/* <Asset asset={ asset } startLoading={ this.startLoading } /> */}
                    {/* <SectionOpenedPool closeCard={openCard.bind(this, index)} pool={pool} index={index} key={index}/> */}

              </AccordionDetails>
              </Accordion>})}
                {/* <div><ArrowDropDownIcon onClick={openCard.bind(this, index)} fontSize="large"/></div> */}
              {/* </CardBody>
            </Card>
          )
          
        })} */}
      </GridItem>
    </GridContainer>
  )
}
