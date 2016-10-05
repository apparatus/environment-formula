import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';

import { CALL_API } from '../middleware/api';

// eslint-disable-next-lint
export const login = (data) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
      endpoint: '',
      data
    }
  });
};
