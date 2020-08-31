import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_CLAIM_BEGIN,
  VAULT_FETCH_CLAIM_SUCCESS,
  VAULT_FETCH_CLAIM_FAILURE,
} from './constants';
import { claim } from "../../web3";

export function fetchClaim({ address, web3, contractAddress, index }) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_CLAIM_BEGIN,
      index
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      claim({
        web3,
        address,
        contractAddress
      }).then(
          data => {
            dispatch({
              type: VAULT_FETCH_CLAIM_SUCCESS,
              data, index
            });
            resolve(data);
          },
        ).catch(
          // Use rejectHandler as the second argument so that render errors won't be caught.
          error => {
            dispatch({
              type: VAULT_FETCH_CLAIM_FAILURE,
              index
            });
            reject(error.message || error);
          }
        )
    });
    return promise;
  };
}

export function useFetchClaim() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchClaimPending } = useSelector(
    state => ({
      fetchClaimPending: state.vault.fetchClaimPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      return dispatch(fetchClaim(data));
    },
    [dispatch],
  );

  return {
    fetchClaim: boundAction,
    fetchClaimPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_CLAIM_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchClaimPending: {
          ...state.fetchClaimPending,
          [action.index]: true
        },
      };

    case VAULT_FETCH_CLAIM_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchClaimPending: {
          ...state.fetchClaimPending,
          [action.index]: false
        },
      };

    case VAULT_FETCH_CLAIM_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchClaimPending: {
          ...state.fetchClaimPending,
          [action.index]: false
        },
      };

    default:
      return state;
  }
}