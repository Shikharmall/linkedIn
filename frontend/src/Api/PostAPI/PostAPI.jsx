import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API for adding post

export const addPostAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/addPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting my posts

export const getMyPostsAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getMyPosts`, {
      method: "GET",
      withCredentials: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting all posts

export const getAllPostsAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getAllPosts`, {
      method: "GET",
      withCredentials: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

