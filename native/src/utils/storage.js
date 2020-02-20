import AsyncStorage from '@react-native-community/async-storage';

const EMAIL = 'email';
const PASSWORD = 'pass';

export const saveToken = async token => {
  try {
    await AsyncStorage.setItem(EMAIL, token.email);
    await AsyncStorage.setItem(PASSWORD, token.password);
  } catch (e) {
    console.log(e);
  }
};
export const savePassword = async password => {
  try {
    await AsyncStorage.setItem(PASSWORD, password);
  } catch (e) {
    console.log(e);
  }
};
export const saveEmail = async email => {
  try {
    await AsyncStorage.setItem(EMAIL, email);
  } catch (e) {
    console.log(e);
  }
};
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(EMAIL);
    await AsyncStorage.removeItem(PASSWORD);
  } catch (e) {
    console.log(e);
  }
};

export const loadToken = async () => {
  try {
    return {
      email: await AsyncStorage.getItem(EMAIL),
      password: await AsyncStorage.getItem(PASSWORD),
    };
  } catch (e) {
    console.log(e);
  }
};
