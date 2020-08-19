import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_DEPOSIT_BEGIN,
  VAULT_FETCH_DEPOSIT_SUCCESS,
  VAULT_FETCH_DEPOSIT_FAILURE,
} from './constants';
import { deposit } from "../../web3";
import Web3 from 'web3';

export function fetchDeposit(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_DEPOSIT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { account, provider, amount, contractAddress } = data;
      const web3 = new Web3(provider);
      deposit({ web3, account, amount, contractAddress }).then(
        data => {
          dispatch({
            type: VAULT_FETCH_DEPOSIT_SUCCESS,
            data,
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: VAULT_FETCH_DEPOSIT_FAILURE,
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  };
}

export function useFetchDeposit() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchDepositPending } = useSelector(
    state => ({
      fetchDepositPending: state.vault.fetchDepositPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      dispatch(fetchDeposit(data));
    },
    [dispatch],
  );

  return {
    fetchDeposit: boundAction,
    fetchDepositPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_DEPOSIT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDepositPending: true,
      };

    case VAULT_FETCH_DEPOSIT_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchDepositPending: false,
      };

    case VAULT_FETCH_DEPOSIT_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDepositPending: false,
      };

    default:
      return state;
  }
}