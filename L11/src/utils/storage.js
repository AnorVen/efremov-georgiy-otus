import AsyncStorage from '@react-native-community/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

export const saveToken = async token => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {
    console.log(e);
  }
};

export const loadToken = async () => {
  try {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.log(e);
  }
};
