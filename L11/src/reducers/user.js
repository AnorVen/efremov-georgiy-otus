import {LOGIN, LOGIN_WITH_EMAIL, LOGIN_WITH_GOOGLE, LOGOUT,SIGNING_IN_PROGRESS} from "../constatns";
import {loadToken, saveToken, removeToken} from '../utils/storage'
export const initialState = {
    auth: '',
    userInfo: {},
    loading: false,

}

export const userReducer = (state = initialState, action)=>{
  switch (action.type) {
    case SIGNING_IN_PROGRESS:{
      return {...state, loading: true}
    }
    case LOGIN_WITH_GOOGLE:{
      return {...state, loading: false, auth: action.payload}
    }
    case LOGIN_WITH_EMAIL:{
      return {...state,auth: action.payload, loading: false}
    }
    case LOGIN:{
      saveToken(action.payload);
      return {...state, auth: action.payload}
    }
    case LOGOUT: {
      removeToken();
      return {...state, auth: ''}
    }
    default: return state
  }
}
