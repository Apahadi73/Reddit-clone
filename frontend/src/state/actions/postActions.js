import axios from "axios";
import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../../constant";
import { logout } from "./userActions";

// creates new post
export const createPost = (newPost) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
    });

    //   extracts user info from the state in the store
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/posts`, newPost, config);

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: POST_CREATE_FAIL,
      payload: message,
    });
  }
};

// fetches all the posts from backend and dispatches action
export const fetchPostList = () => async (dispatch) => {
  try {
    // prepares the app for data fetch
    dispatch({ type: POST_LIST_REQUEST });
    // loads data into the store

    const { data } = await axios.get(`/api/posts`);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// creates comment is a post
export const createComment = (newComment, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_CREATE_REQUEST,
    });

    //   extracts user info from the state in the store
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/posts/${id}/comments`,
      newComment,
      config
    );

    dispatch({
      type: COMMENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COMMENT_CREATE_FAIL,
      payload: message,
    });
  }
};
