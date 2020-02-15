import {
  DELETE_USER,
  EDIT_USER,
  ERROR_REQUEST_USER,
  LOAD_ALL_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  REQUEST_USER,
  UPDATE_USER,
  USER_ABOUT,
} from '../Constats';

const initialState = {
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: '',
    uid: '',
  },
  about: '',
  loading: false,
  error: {},
  allUsersList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, user: action.payload, loading: false, error: {} };
    }
    case UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case USER_ABOUT: {
      return { ...state, about: action.payload };
    }
    case LOGOUT: {
      return {
        ...state,
        user: {
          displayName: '',
          email: '',
          photoURL: '',
          emailVerified: '',
          uid: '',
        },
      };
    }
    case REGISTER: {
      return { ...state, user: action.payload, loading: false, error: {} };
    }

    case EDIT_USER: {
      return { ...state, user: action.payload };
    }
    case DELETE_USER: {
      return {
        ...state,
        user: {
          displayName: '',
          email: '',
          photoURL: '',
          emailVerified: '',
          uid: '',
        },
      };
    }
    case LOAD_ALL_USERS: {
      return { ...state, allUsersList: action.payload };
    }
    case REQUEST_USER: {
      return { ...state, loading: true };
    }
    case ERROR_REQUEST_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
}
