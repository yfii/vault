import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_FARM_BEGIN,
  VAULT_FETCH_FARM_SUCCESS,
  VAULT_FETCH_FARM_FAILURE,
} from './constants';
import { farm } from "../../web3";
import Web3 from 'web3';

export function fetchFarm(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_FARM_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/vault/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { account, provider, contractAddress } = data;
      const web3 = new Web3(provider);

      farm({
        web3,
        account,
        contractAddress
      }).then(
        () => {
          dispatch({
            type: VAULT_FETCH_FARM_SUCCESS,
          })
          resolve();
        }
      ).catch(
        error => {
          dispatch({
            type: VAULT_FETCH_FARM_FAILURE,
          })
          reject(error.message || error);
        }
      )
    });

    return promise;
  };
}

export function useFetchFarm() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchFarmPending } = useSelector(
    state => ({
      fetchFarmPending: state.vault.fetchFarmPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(data => dispatch(fetchFarm(data)), [dispatch]);

  return {
    fetchFarm: boundAction,
    fetchFarmPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_FARM_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchFarmPending: true,
      };

    case VAULT_FETCH_FARM_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchFarmPending: false,
      };

    case VAULT_FETCH_FARM_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchFarmPending: false,
      };

    default:
      return state;
  }
}