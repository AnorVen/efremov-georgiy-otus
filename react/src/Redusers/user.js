import {
  DELETE_USER,
  EDIT_USER,
  ERROR_REQUEST_USER,
  LOAD_ALL_USERS,
  LOGIN,
  LOGOUT,
  REGISTER,
  REQUEST_USER,
} from '../Constats';

const initialState = {
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: '',
    uid: '',
  },
  loading: false,
  error: false,
  allUsersList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return { ...state, user: action.payload, loading: false, error: false };
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
      return { ...state, user: action.payload };
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
      return { ...state, error: true, loading: false };
    }
    default:
      return state;
  }
}
