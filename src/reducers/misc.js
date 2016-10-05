import { SHOW_TOAST, HIDE_TOAST } from '../constants';

const initialState = {
  toast: {
    message: '',
    show: false
  }
};

const misc = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      return Object.assign({}, state, {
        toast: {
          message: action.message,
          show: true
        }
      });
    case HIDE_TOAST:
      return Object.assign({}, state, {
        toast: {
          message: '',
          show: false
        }
      });
    default:
      return state;
  }
};

export default misc;
