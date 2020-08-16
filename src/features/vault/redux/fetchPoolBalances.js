import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_POOL_BALANCES_BEGIN,
  VAULT_FETCH_POOL_BALANCES_SUCCESS,
  VAULT_FETCH_POOL_BALANCES_FAILURE,
  VAULT_FETCH_POOL_BALANCES_DISMISS_ERROR,
} from './constants';
import { fetchDepositedBalance, fetchEarnedBalance } from "../../web3";
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
              contractABI: pool.earnContractABI,
              contractAddress:pool.earnContractAddress,
              tokenDecimals: pool.tokenDecimals,
              account,
              callback: callbackInner
            }) 
          },
          (callbackInner) => {
            fetchEarnedBalance({
              web3,
              contractABI: pool.earnContractABI,
              contractAddress: pool.earnContractAddress,
              tokenDecimals: pool.earnedTokenDecimals,
              account,
              callback: callbackInner
            })},
        ], (err, data) => {
          pool.stakedBalance = data[0]
          pool.claimAbleBalance = data[1]
          callback(null, pool)
        })
      }, (err, pools) => {
        if(err) {
          console.log(err)
          dispatch({
            type: VAULT_FETCH_POOL_BALANCES_FAILURE,
            data: err,
          })
          return reject()
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

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchPoolBalancesError() {
  return {
    type: VAULT_FETCH_POOL_BALANCES_DISMISS_ERROR,
  };
}

export function useFetchPoolBalances() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { pools, account, provider, fetchPoolBalancesPending, fetchPoolBalancesError } = useSelector(
    state => ({
      pools: state.vault.pools,
      account: state.common.account,
      provider: state.common.provider,
      fetchPoolBalancesPending: state.vault.fetchPoolBalancesPending,
      fetchPoolBalancesError: state.vault.fetchPoolBalancesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      dispatch(fetchPoolBalances(data));
    },
    [dispatch],
  );

  const boundDismissFetchPoolBalancesError = useCallback(() => {
    dispatch(dismissFetchPoolBalancesError());
  }, [dispatch]);

  return {
    pools,
    account,
    provider,
    fetchPoolBalances: boundAction,
    fetchPoolBalancesPending,
    fetchPoolBalancesError,
    dismissFetchPoolBalancesError: boundDismissFetchPoolBalancesError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_POOL_BALANCES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPoolBalancesPending: true,
        fetchPoolBalancesError: null,
      };

    case VAULT_FETCH_POOL_BALANCES_SUCCESS:
      // The request is success
      return {
        ...state,
        pools: action.data,
        fetchPoolBalancesPending: false,
        fetchPoolBalancesError: null,
      };

    case VAULT_FETCH_POOL_BALANCES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPoolBalancesPending: false,
        fetchPoolBalancesError: action.data,
      };

    case VAULT_FETCH_POOL_BALANCES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPoolBalancesError: null,
      };

    default:
      return state;
  }
}