import request from 'axios';

const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8081';

export const callApi = ({ method, endpoint, data, params }) => {
  const fullUrl = (endpoint.indexOf(API_BASE) !== 0) ? API_BASE + endpoint : endpoint;

  const options = {
    method: method || (data ? 'post' : 'get'),
    url: fullUrl,
    data,
    params
  };

  return request(options)
    .then((response) => {
      return response.data;
    }, (error) => {
      return Promise.reject(error.message ? error : {
        message: 'Something bad happened'
      });
    });
};

export const CALL_API = Symbol('Call API');

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, data: postData, params: queryParams } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi({
    endpoint,
    data: postData,
    params: queryParams
  }).then((data) => next(actionWith({
    data,
    type: successType
  })), (error) => next(actionWith({
    type: failureType,
    error: error.message || 'Something bad happened'
  })));
};
