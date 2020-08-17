import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_CLAIM_BEGIN,
  VAULT_FETCH_CLAIM_SUCCESS,
  VAULT_FETCH_CLAIM_FAILURE,
  VAULT_FETCH_CLAIM_DISMISS_ERROR,
} from './constants';
import { claim } from "../../web3";
import Web3 from 'web3';

export function fetchClaim(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_CLAIM_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { account, provider, contractAddress } = data;
      const web3 = new Web3(provider);
      claim({
        web3,
        account,
        contractAddress
      }).then(
          data => {
            dispatch({
              type: VAULT_FETCH_CLAIM_SUCCESS,
              data,
            });
            console.log(data)
            resolve(data);
          },
        ).catch(
          // Use rejectHandler as the second argument so that render errors won't be caught.
          error => {
            dispatch({
              type: VAULT_FETCH_CLAIM_FAILURE,
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
export function dismissFetchClaimError() {
  return {
    type: VAULT_FETCH_CLAIM_DISMISS_ERROR,
  };
}

export function useFetchClaim() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchClaimPending, fetchClaimError } = useSelector(
    state => ({
      fetchClaimPending: state.vault.fetchClaimPending,
      fetchClaimError: state.vault.fetchClaimError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      dispatch(fetchClaim(data));
    },
    [dispatch],
  );

  const boundDismissFetchClaimError = useCallback(() => {
    dispatch(dismissFetchClaimError());
  }, [dispatch]);

  return {
    fetchClaim: boundAction,
    fetchClaimPending,
    fetchClaimError,
    dismissFetchClaimError: boundDismissFetchClaimError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_CLAIM_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchClaimPending: true,
        fetchClaimError: null,
      };

    case VAULT_FETCH_CLAIM_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchClaimPending: false,
        fetchClaimError: null,
      };

    case VAULT_FETCH_CLAIM_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchClaimPending: false,
        fetchClaimError: action.data.error,
      };

    case VAULT_FETCH_CLAIM_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchClaimError: null,
      };

    default:
      return state;
  }
}