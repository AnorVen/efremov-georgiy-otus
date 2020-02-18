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
  ADD_TO_FRIENDS,
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
  allUsersList: {},
  friends: {},
  friendsPosts: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_FRIENDS: {
      const newFriends = action.payload;
      const newFriendsList = { ...state.friends, ...newFriends };
      return { ...state, friends: newFriendsList };
    }
    case LOAD_ALL_USERS: {
      const newAllUsers = action.payload;
      const newAllUsersList = { ...state.allUsersList, ...newAllUsers };
      return { ...state, allUsersList: newAllUsersList };
    }
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
        about: '',
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
        about: '',
      };
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
