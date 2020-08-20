import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_PRICE_BEGIN,
  VAULT_FETCH_PRICE_SUCCESS,
  VAULT_FETCH_PRICE_FAILURE,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchPrice() {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_PRICE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      const doRequest = axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,curve-dao-token,yfii-finance,spaghetti&vs_currencies=usd');

      doRequest.then(
        res => {
          dispatch({
            type: VAULT_FETCH_PRICE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: VAULT_FETCH_PRICE_FAILURE,
          });
          reject(error.message || error);
        },
      );
    });

    return promise;
  };
}

export function useFetchPrice() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { price, fetchPricePending } = useSelector(
    state => ({
      price: state.vault.price,
      fetchPricePending: state.vault.fetchPricePending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    () => {
      dispatch(fetchPrice());
    },
    [dispatch],
  );

  return {
    price,
    fetchPrice: boundAction,
    fetchPricePending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_PRICE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPricePending: true,
      };

    case VAULT_FETCH_PRICE_SUCCESS:
      // The request is success
      return {
        ...state,
        price: action.data,
        fetchPricePending: false,
      };

    case VAULT_FETCH_PRICE_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPricePending: false,
      };

    default:
      return state;
  }
}