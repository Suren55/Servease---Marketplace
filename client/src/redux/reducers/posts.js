import { createSelector } from "reselect";

export const GET_POST_LIST_REQUEST = "posts/GET_POST_LIST_REQUEST";
export const GET_POST_LIST_SUCCESS = "posts/GET_POST_LIST_SUCCESS";
export const GET_POST_LIST_FAILED = "posts/GET_POST_LIST_FAILED";

export const GET_CUSTOMER_POST_LIST_REQUEST = "posts/GET_CUSTOMER_POST_LIST_REQUEST";
export const GET_CUSTOMER_POST_LIST_SUCCESS = "posts/GET_CUSTOMER_POST_LIST_SUCCESS";
export const GET_CUSTOMER_POST_LIST_FAILED = "posts/GET_CUSTOMER_POST_LIST_FAILED";

export const CREATE_POST_REQUEST = "posts/CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "posts/CREATE_POST_SUCCESS";
export const CREATE_POST_FAILED = "posts/CREATE_POST_FAILED";

const initialState = {
  isLoading: false,
  postsList: [],
  customerPostList: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_LIST_REQUEST:
      return { ...state, isLoading: true };
    case GET_POST_LIST_SUCCESS:
      return { ...state, isLoading: false, postsList: action.payload };
    case GET_POST_LIST_FAILED:
      return { ...state, isLoading: false, postsList: [] };
    case CREATE_POST_REQUEST:
      return { ...state, isLoading: true };
    case CREATE_POST_SUCCESS:
    case CREATE_POST_FAILED:
      return { ...state, isLoading: false };
    case GET_CUSTOMER_POST_LIST_REQUEST:
      return { ...state, isLoading: true };
    case GET_CUSTOMER_POST_LIST_SUCCESS:
      return { ...state, isLoading: false, customerPostList: action.payload };
    case GET_CUSTOMER_POST_LIST_FAILED:
      return { ...state, isLoading: false, customerPostList: [] };

    default:
      return state;
  }
};

// actions
export const getPostsListRequest = () => ({
  type: GET_POST_LIST_REQUEST,
});

export const getPostsListSuccess = (payload) => ({
  type: GET_POST_LIST_SUCCESS,
  payload,
});

export const getPostsListFailed = () => ({
  type: GET_POST_LIST_FAILED,
});

export const getCustomerPostsListRequest = () => ({
  type: GET_CUSTOMER_POST_LIST_REQUEST,
});

export const getCustomerPostsListSuccess = (payload) => ({
  type: GET_CUSTOMER_POST_LIST_SUCCESS,
  payload,
});

export const getCustomerPostsListFailed = () => ({
  type: GET_CUSTOMER_POST_LIST_FAILED,
});

export const createPostRequest = (payload) => ({
  type: CREATE_POST_REQUEST,
  payload,
});

export const createPostSuccess = () => ({
  type: CREATE_POST_SUCCESS,
});

export const createPostFailed = () => ({
  type: CREATE_POST_FAILED,
});

// selectors

const selectPostsState = (state) => {
  return state.posts;
};

export const selectIsLoading = createSelector(selectPostsState, (state) => {
  return state.isLoading;
});

export const selectPostsList = createSelector(selectPostsState, (state) => {
  return state.postsList;
});

export const selectCustomerPostsList = createSelector(selectPostsState, (state) => {
  return state.customerPostList;
});

export default postsReducer;
