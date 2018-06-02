import { AsycnStorage } from 'react-native';

import { FACEBOOK_LOGIN_SUCCESS } from './types';

// How to use AsyncStorage2
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsycnStorage.getItem('fb_token');

  if (token) {
    // Dispatch an action saying FB login is done
  } else {
    // Start up FB login process
  }
};
