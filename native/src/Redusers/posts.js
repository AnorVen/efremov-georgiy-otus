import {
  ERROR_REQUEST,
  EDIT_POST,
  DELETE_POST,
  ADD_POST,
  LOADING_POSTS,
  GET_POST_REQUEST,
  LIKE_POST,
} from '../Constats';

const initialState = {
  posts: {},
  error: false,
  loading: false,
  likes: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LIKE_POST: {
      const newLikes = {...state.likes};
      let like = Object.entries(action.payload);
      for (let [key, val] of like) {
        if (newLikes[key]) {
          delete newLikes[action.payload.id];
        } else {
          newLikes[key] = val;
        }
      }

      return {...state, likes: newLikes};
    }
    case ADD_POST: {
      const newPosts = {...state.posts};
      for (let [key, value] of Object.entries(action.payload)) {
        newPosts[key] = value;
      }
      return {...state, posts: newPosts};
    }
    case DELETE_POST: {
      const newPosts = {...state.posts};
      delete newPosts[action.payload];
      return {...state, posts: newPosts};
    }
    case EDIT_POST: {
      return {...state, posts: action.payload};
    }

    case LOADING_POSTS: {
      return {...state, posts: action.payload, loading: false, error: false};
    }
    case GET_POST_REQUEST: {
      return {...state, loading: true};
    }
    case ERROR_REQUEST: {
      return {...state, loading: false, error: action.payload.message};
    }
    default:
      return state;
  }
}
