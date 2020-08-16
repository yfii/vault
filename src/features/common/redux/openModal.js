import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMMON_OPEN_MODAL } from './constants';

export function openModal() {
  return {
    type: COMMON_OPEN_MODAL,
  };
}

export function useOpenModal() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(state => state.common.modalIsOpen);
  const boundAction = useCallback(() => dispatch(openModal()), [dispatch]);

  return { modalIsOpen, openModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true,
      };

    default:
      return state;
  }
}
