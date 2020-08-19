import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_POOL_BALANCES_BEGIN,
  VAULT_FETCH_POOL_BALANCES_SUCCESS,
  VAULT_FETCH_POOL_BALANCES_FAILURE,
} from './constants';
import { fetchDepositedBalance, fetchEarnedBalance, fetchAllowance, fetchEarningsPerShare, fetchIdle, fetchClaimAbleTokens, fetchDepositedTime } from "../../web3";
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
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { account, provider, pools } = data;
      const web3 = new Web3(provider);
      async.map(pools, (pool, callback) => {
        async.parallel([
          (callbackInner) => { 
            fetchDepositedBalance({
              web3,
              contractAddress: pool.earnContractAddress,
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
              web3,
              contractAddress: pool.earnContractAddress,
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
              tokenAddress: pool.tokenAddress,
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
            fetchEarningsPerShare({
              web3,
              contractAddress:pool.earnContractAddress,
              account,
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => callbackInner(error, 0)
            ) 
          },
          (callbackInner) => {
            fetchIdle({
              web3,
              tokenAddress: pool.tokenAddress,
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
              web3,
              contractAddress:pool.earnContractAddress,
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
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => callbackInner(error, 0)
            ) 
          },
        ], (error, data) => {
          pool.depositedBalance = data[0].depositedBalance || 0;
          pool.payout = data[0].payout || 0;
          pool.claimAbleBalance = data[1] || 0
          pool.allowance = data[2] || 0
          pool.earningsPerShare = data[3].earningsPerShare || 0;
          pool.totalStake = data[3].earningsPerShare || 0;
          pool.idle = data[4] || 0;
          pool.magnitude = new BigNumber(10).exponentiatedBy(40).toNumber();
          // pool.claimAbleTokens = data[5] || 0;
          pool.depositedTime = data[5] || 0;
          pool.claimAbleTokens = data[6] || 0;
          // pool.depositedTime = 1597839811;
          // pool.claimPendingBalance = earningsPerShare*pool.depositedBalance/magnitude - payout;
          callback(null, pool)
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