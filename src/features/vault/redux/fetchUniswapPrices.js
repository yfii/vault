import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_UNISWAP_PRICES_BEGIN,
  VAULT_FETCH_UNISWAP_PRICES_SUCCESS,
  VAULT_FETCH_UNISWAP_PRICES_FAILURE,
} from './constants';
import { fetchUniswapPrice } from "../../web3";
import async from 'async';

export function fetchUniswapPrices(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_UNISWAP_PRICES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // args.error here is only for test coverage purpose.
      const { uniswapList, web3 } = data;
      async.map(uniswapList, (token, callback) => {
        fetchUniswapPrice({
          web3,
          pricepath: token.pricepath,
        }).then(
          data => {
            // console.log(data)
            return callback(null, {name: token.name, price: data })
          }
        ).catch(
          error => {
            // console.log(error)
            return callback(error, null)
          }
        ) 
      }, (error, tokens) => {
        if(error) {
          console.log(error.message || error)
          console.log(tokens)
          dispatch({
            type: VAULT_FETCH_UNISWAP_PRICES_FAILURE,
          })
          return reject(error.message || error)
        }
        dispatch({
          type: VAULT_FETCH_UNISWAP_PRICES_SUCCESS,
          data: tokens,
        })
        resolve()
      })
    });

    return promise;
  };
}

export function useFetchUniswapPrices() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { price, fetchUniswapPricesPending } = useSelector(
    state => ({
      price: state.vault.price,
      fetchUniswapPricesPending: state.vault.fetchUniswapPricesPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      return dispatch(fetchUniswapPrices(data));
    },
    [dispatch],
  );

  return {
    price,
    fetchUniswapPrices: boundAction,
    fetchUniswapPricesPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_UNISWAP_PRICES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchUniswapPricesPending: true,
      };

    case VAULT_FETCH_UNISWAP_PRICES_SUCCESS:
      // The request is success
      const newPrice = state.price; 
      for(let value of action.data) {  
        newPrice[value.name].usd = value.price
      };
      return {
        ...state,
        price: newPrice,
        fetchUniswapPricesPending: false,
      };

    case VAULT_FETCH_UNISWAP_PRICES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchUniswapPricesPending: false,
      };

    default:
      return state;
  }
}