import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_WITHDRAW_BEGIN,
  VAULT_FETCH_WITHDRAW_SUCCESS,
  VAULT_FETCH_WITHDRAW_FAILURE,
  VAULT_FETCH_WITHDRAW_DISMISS_ERROR,
} from './constants';
import { withdraw } from "../../web3";
import Web3 from 'web3';

export function fetchWithdraw(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_WITHDRAW_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { account, provider, amount, tokenDecimals, contractAddress } = data;
      const web3 = new Web3(provider);
      withdraw({
        web3,
        account,
        amount, tokenDecimals, contractAddress
      }).then(
          data => {
            dispatch({
              type: VAULT_FETCH_WITHDRAW_SUCCESS,
              data,
            });
            console.log(data)
            resolve(data);
          },
        ).catch(
          // Use rejectHandler as the second argument so that render errors won't be caught.
          error => {
            dispatch({
              type: VAULT_FETCH_WITHDRAW_FAILURE,
              data: { error: error.message || error },
            });
            reject(error);
          }
        )
    });
    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchWithdrawError() {
  return {
    type: VAULT_FETCH_WITHDRAW_DISMISS_ERROR,
  };
}

export function useFetchWithdraw() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchWithdrawPending, fetchWithdrawError } = useSelector(
    state => ({
      fetchWithdrawPending: state.vault.fetchWithdrawPending,
      fetchWithdrawError: state.vault.fetchWithdrawError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      dispatch(fetchWithdraw(data));
    },
    [dispatch],
  );

  const boundDismissFetchWithdrawError = useCallback(() => {
    dispatch(dismissFetchWithdrawError());
  }, [dispatch]);

  return {
    fetchWithdraw: boundAction,
    fetchWithdrawPending,
    fetchWithdrawError,
    dismissFetchWithdrawError: boundDismissFetchWithdrawError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_WITHDRAW_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchWithdrawPending: true,
        fetchWithdrawError: null,
      };

    case VAULT_FETCH_WITHDRAW_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchWithdrawPending: false,
        fetchWithdrawError: null,
      };

    case VAULT_FETCH_WITHDRAW_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchWithdrawPending: false,
        fetchWithdrawError: action.data.error,
      };

    case VAULT_FETCH_WITHDRAW_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchWithdrawError: null,
      };

    default:
      return state;
  }
}