import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_COINGECKO_PRICE_BEGIN,
  VAULT_FETCH_COINGECKO_PRICE_SUCCESS,
  VAULT_FETCH_COINGECKO_PRICE_FAILURE,
} from './constants';
import { coingeckoApi } from '../../configure'

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchCoingeckoPrice() {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_COINGECKO_PRICE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      const doRequest = axios.get(coingeckoApi);

      doRequest.then(
        res => {
          dispatch({
            type: VAULT_FETCH_COINGECKO_PRICE_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: VAULT_FETCH_COINGECKO_PRICE_FAILURE,
          });
          reject(error.message || error);
        },
      );
    });

    return promise;
  };
}

export function useFetchCoingeckoPrice() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { price, fetchCoingeckoPricePending } = useSelector(
    state => ({
      price: state.vault.price,
      fetchCoingeckoPricePending: state.vault.fetchCoingeckoPricePending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => dispatch(fetchCoingeckoPrice()), [dispatch]);

  return {
    price,
    fetchCoingeckoPrice: boundAction,
    fetchCoingeckoPricePending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_COINGECKO_PRICE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchCoingeckoPricePending: true,
      };

    case VAULT_FETCH_COINGECKO_PRICE_SUCCESS:
      // The request is success
      const newPrice = state.price;
      for(let key in action.data){
        newPrice[key] = action.data[key]
      }
      return {
        ...state,
        price: newPrice,
        fetchCoingeckoPricePending: false,
      };

    case VAULT_FETCH_COINGECKO_PRICE_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchCoingeckoPricePending: false,
      };

    default:
      return state;
  }
}