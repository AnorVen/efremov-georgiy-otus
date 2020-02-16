import {
  ERROR_REQUEST,
  EDIT_POST,
  DELETE_POST,
  ADD_POST,
  LOADING_POSTS,
  GET_POST_REQUEST,
} from '../Constats';

const initialState = {
  posts: {
    '-M09dxPj97lYHNKCADZf': {
      date: 1581800478142,
      text: 'awdawd',
    },
  },
  error: false,
  loading: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST: {
      return { ...state, posts: action.payload };
    }
    case DELETE_POST: {
      return { ...state, posts: action.payload };
    }
    case EDIT_POST: {
      return { ...state, posts: action.payload };
    }

    case LOADING_POSTS: {
      return { ...state, posts: action.payload, loading: false, error: false };
    }
    case GET_POST_REQUEST: {
      return { ...state, loading: true };
    }
    case ERROR_REQUEST: {
      return { ...state, loading: false, error: action.payload.message };
    }
    default:
      return state;
  }
}
