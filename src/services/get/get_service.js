import {apiClient} from '../client';

export const GetService_ = async (payload) => {
    let queryParamString = ''
    if(payload.params !== ''){
        queryParamString = Object.keys(payload.params).map(key => key + '=' + payload.params[key]).join('&');
    }
    let config = {
      method: 'get',
      url: queryParamString !== '' ? `${payload.url}?`+queryParamString : `${payload.url}`,
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    return apiClient(config)
    .then(response => response)
    .catch(error => error);
};
