import axios from "axios";
import { API_URL } from "./API";
import { getCookie } from "./Cookie";

const oAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: getCookie("token"),
  },
});

// Add a response interceptor
oAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    alert("Error Encountered:\n\n" + error.message);

    return error;
  }
);
export default oAxios;
