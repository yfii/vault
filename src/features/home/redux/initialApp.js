import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { HOME_INITIAL_APP } from './constants';
import { COMMON_SET_ACCOUNT } from '../../common/redux/constants';

export function initialApp(data) {
  return dispatch => {
    dispatch({ type: COMMON_SET_ACCOUNT, data })
    dispatch({ type: HOME_INITIAL_APP })
  };
}

export function useInitialApp() {
  const dispatch = useDispatch();
  const isInit = useSelector(state => state.home.isInit);
  const boundAction = useCallback((data) => dispatch(initialApp(data)), [dispatch]);

  return { isInit, initialApp: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_INITIAL_APP:
      return {
        ...state,
        isInit: true,
      };

    default:
      return state;
  }
}