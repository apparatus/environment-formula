import { SHOW_TOAST, HIDE_TOAST } from '../constants';

export const showToast = (message) => {
  return {
    type: SHOW_TOAST,
    message
  };
};

export const hideToast = () => {
  return {
    type: HIDE_TOAST
  };
};
