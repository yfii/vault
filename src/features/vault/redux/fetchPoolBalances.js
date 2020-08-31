import { useCallback } from 'react';
import { earnContractABI, erc20ABI, IUniswapV2Router02 } from "../../configure";
import BigNumber from "bignumber.js";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_POOL_BALANCES_BEGIN,
  VAULT_FETCH_POOL_BALANCES_SUCCESS,
  VAULT_FETCH_POOL_BALANCES_FAILURE,
} from './constants';
import { fetchDepositedBalance, fetchEarnedBalance, fetchAllowance, fetchEarningsPerShare, fetchIdle, fetchClaimAbleTokens, fetchDepositedTime, fetchClaimPendingBalance, fetchUniswapPrice } from "../../web3";
import Web3 from 'web3';
import async from 'async';

export function fetchPoolBalances(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_POOL_BALANCES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // args.error here is only for test coverage purpose.
      const { account, provider, pools } = data;
      const web3 = new Web3(provider);
      async.map(pools, (pool, callback) => {
        const earnContract = new web3.eth.Contract(earnContractABI, pool.earnContractAddress)
        const erc20Contract = new web3.eth.Contract(erc20ABI, pool.tokenAddress)
        const uniSwapContract = new web3.eth.Contract(IUniswapV2Router02, "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");

        async.parallel([
          (callbackInner) => { 
            fetchDepositedBalance({
              contract: earnContract,
              account,
            }).then(
              data => {
                // console.log(data)
                return callbackInner(null, data)
              }
            ).catch(
              error => {
                // console.log(error)
                return callbackInner(error, {depositedBalance: 0, payout: 0})
              }
            ) 
          },
          (callbackInner) => {
            fetchEarnedBalance({
              contract: earnContract,
              account,
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => callbackInner(error, 0)
            )
          },
          (callbackInner) => {
            fetchAllowance({
              web3,
              contractAddress: pool.earnContractAddress,
              contract: erc20Contract,
              account,
            }).then(
              data => {
                // console.log('data:' + data);
                return callbackInner(null, data)
              }
            ).catch(
              error => {
                // console.log(error)
                callbackInner(error, 0)
              }
            )
          },
          (callbackInner) => {
            if (pool.isCrv) {
              fetchEarningsPerShare({
                contract: earnContract,
                account,
              }).then(
                data => {
                  // console.log(data)
                  return callbackInner(null, data)
                }
              ).catch(
                error => callbackInner(error, {earningsPerShare: 0, totalStake: 0})
              )
            } else {
              return callbackInner(null, {earningsPerShare: 0, totalStake: 0})
            }
          },
          (callbackInner) => {
            fetchIdle({
              contract: erc20Contract,
              contractAddress:pool.earnContractAddress,
              account,
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => callbackInner(error, 0)
            ) 
          },
          (callbackInner) => {
            fetchDepositedTime({
              contract: earnContract,
              account,
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => callbackInner(error, 0)
            ) 
          },
          (callbackInner) => {
            fetchClaimAbleTokens({
              web3,
              contractAddress:pool.strategyContractAddress,
              account,
              isCrv: Boolean(pool.isCrv),
              crvGauge: pool.crvGauge,
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => callbackInner(error, 0)
            ) 
          }, 
        ], async (error, data) => {
          if (error) {
            return callback(null, pool)
          }
          pool.depositedBalance = data[0].depositedBalance || 0;
          pool.payout = data[0].payout || 0;
          pool.claimAbleBalance = data[1] || 0
          pool.allowance = data[2] || 0
          pool.earningsPerShare = data[3].earningsPerShare || 0;
          pool.totalStake = data[3].totalStake || 0;
          pool.idle = data[4] || 0;
          pool.magnitude = new BigNumber(10).exponentiatedBy(40).toNumber();
          pool.depositedTime = data[5] || 0;
          pool.claimAbleTokens = data[6] || 0;
          try {
            if (pool.isYFII){
              pool.yield = pool.claimAbleTokens;
            }else{
              pool.yield = await fetchUniswapPrice({
                amount: pool.claimAbleTokens,
                pathprice: pool.pathprice,
                contract: uniSwapContract,
              })
            }
            
          } catch(err) {
            console.log(err)
          }
          if (pool.isCrv) {
            pool.earningsPerShare = new BigNumber(pool.earningsPerShare).plus(
              new BigNumber(pool.yield).multipliedBy(
                new BigNumber(pool.magnitude)
              ).dividedBy(
                new BigNumber(pool.totalStake || 1)
              )
            ).toNumber();
            pool.claimPendingBalance = new BigNumber(pool.earningsPerShare).multipliedBy(
              new BigNumber(pool.depositedBalance)
            ).dividedBy(
              new BigNumber(pool.magnitude)
            ).minus(
              new BigNumber(pool.payout)
            ).minus(
              new BigNumber(pool.claimAbleBalance)
            ).toNumber();
            callback(null, pool)
          } else {
            fetchClaimPendingBalance({
              amount: pool.yield,
              contract: earnContract,
              account
            }).then(
              data => {
                pool.claimPendingBalance = data
                return callback(null, pool)
              }
            ).catch(
              error => {
                console.log(error)
                return callback(null, pool)
              }
            ) 
          }
        })
      }, (error, pools) => {
        if(error) {
          dispatch({
            type: VAULT_FETCH_POOL_BALANCES_FAILURE,
          })
          return reject(error.message || error)
        }
        dispatch({
          type: VAULT_FETCH_POOL_BALANCES_SUCCESS,
          data: pools,
        })
        resolve()
      })
    });

    return promise;
  };
}

export function useFetchPoolBalances() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { pools, fetchPoolBalancesPending } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchPoolBalancesPending: state.vault.fetchPoolBalancesPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      return dispatch(fetchPoolBalances(data));
    },
    [dispatch],
  );

  return {
    pools,
    fetchPoolBalances: boundAction,
    fetchPoolBalancesPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_POOL_BALANCES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPoolBalancesPending: true,
      };

    case VAULT_FETCH_POOL_BALANCES_SUCCESS:
      // The request is success
      return {
        ...state,
        pools: action.data,
        fetchPoolBalancesPending: false,
      };

    case VAULT_FETCH_POOL_BALANCES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPoolBalancesPending: false,
      };

    default:
      return state;
  }
}