import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMMON_CLOSE_MODAL } from '../redux/constants';

export function closeModal() {
  return {
    type: COMMON_CLOSE_MODAL,
  };
}

export function useCloseModal() {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector(state => state.common.modalIsOpen);
  const boundAction = useCallback(() => dispatch(closeModal()), [dispatch]);

  return { modalIsOpen, closeModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false,
      };

    default:
      return state;
  }
}
