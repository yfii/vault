import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { COMMON_SET_ACCOUNT } from './constants';

export function setAccount(data) {
  return {
    type: COMMON_SET_ACCOUNT,
    data
  };
}

export function useAccount() {
  const dispatch = useDispatch();

  const { account, provider } = useSelector(
    state => ({
      account: state.common.account,
      // account: "0xfB1b5Df432B12959d1F7e7d2F9661b43ba0D5bf3",
      provider: state.common.provider,
    }),
    shallowEqual,
  );
  const boundAction = useCallback((data) => dispatch(setAccount(data)), [dispatch]);

  return { account, provider, setAccount: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_ACCOUNT:
      return {
        ...state,
        account: action.data.account,
        provider: action.data.provider
      };

    default:
      return state;
  }
}