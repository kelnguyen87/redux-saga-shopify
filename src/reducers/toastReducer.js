import * as types from '../actions/action-types';

const defaultState = {
  isToastActive: false,
  toastMessage: '',
};


export default function toastReducer(state = defaultState, action) {
  switch (action.type) {
    case types.TOAST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
