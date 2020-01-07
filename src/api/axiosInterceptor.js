import Axios from "axios";
import { notification } from "antd";
export const base_url = "http://shresthastore.com/api/public/";
// export const base_url = "http://localhost/stock/public/";

export const axiosInstance = Axios.create({
  baseURL: base_url,
  timeout: 10000
});

//add token to all request
axiosInstance.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = "Bearer " + token;
  return config;
});

axiosInstance.interceptors.response.use(
  //handle on success
  function(response) {
    if (response.data && response.data.message) {
      notification.success({
        message: response.data.message,
        duration: 5
      });
    }
    return response.data;
  },

  //handle on error
  function(error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        // notification.error({
        //   message: error.response.data.message,
        //   duration: 5
        // });
      }
    } else {
      notification.error({
        message: "Some unusual error occured, please try again",
        duration: 5
      });
      return Promise.reject({
        error: "Some unusual error occured, please try again"
      });
    }
    return Promise.reject(error.response.data);
  }
);
