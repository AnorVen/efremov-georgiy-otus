import {
  GET_DETAILS_REQUEST,
  GET_DATE,
  DETAILS,
  ERROR_REQUEST,
  TARGET_COUNTRY,
  GET_CITY,
  EDIT_POST,
  DELETE_POST,
  ADD_POST,
  LOADING_POSTS,
  GET_POST_REQUEST,
} from '../Constats';

const initialState = {
  posts: [{ text: 'awfawf', date: 1581457505755 }],
  error: false,
  loading: false,
};
export default function(state = initialState, action) {
  let newPosts = [...state.posts];
  switch (action.type) {
    case ADD_POST: {
      newPosts.push(action.payload);
      return { ...state, posts: newPosts };
    }
    case DELETE_POST: {
      newPosts.map((post) => {
        if (post.id !== action.payload.id) {
          return post;
        }
      });
      return { ...state, posts: newPosts };
    }
    case EDIT_POST: {
      newPosts.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload;
        }
        return post;
      });
      return { ...state, posts: newPosts };
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
