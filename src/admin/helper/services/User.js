import api from "../ApiConfig";
import { Apis } from "../API";
import { setCookie, getCookie, eraseCookie } from "../Cookie";

const getUserLogin = async (toaster, data) => {
  try {
    let result = await api.post(Apis.GetUserLogin, data);
    if (result.data.error) {
      toaster.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserRegister = async (toaster, data) => {
  try {
    let result = await api.post(Apis.GetUserRegsiter, data);
    if (result.data.error) {
      toaster.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllUserList = async (toaster) => {
  try {
    let result = await api.get(Apis.GetAllUserList);
    if (result.data.error) {
      toaster.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserUpdate = async (toaster, data) => {
  try {
    let result = await api.post(Apis.GetUserUpdate, data);
    if (result.data.error) {
      toaster.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getDeleteUserList = async (toaster, id) => {
  try {
    let result = await api.post(Apis.GetDeleteUserList, {
      id: id,
    });
    if (result.data.error) {
      toaster.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const authenticate = (user, next) => {
  if (typeof window !== "undefined") {
    setCookie("token", user.token, 30);
    setCookie("role", user.role, 30);
    next();
  }
};
const logout = (next) => {
  if (typeof window !== "undefined") {
    eraseCookie("token");
    eraseCookie("role");
    eraseCookie("XSRF-token");
    window.location.reload();
    // window.location.href="/auth/login";
    // next();
  }
};

const isAuthenticate = (next) => {
  if (typeof window !== "undefined") {
    return false;
  }
  if (getCookie("token")) {
    return JSON.stringify(getCookie("token"));
  } else {
    return false;
  }
};

const UserService = { getUserLogin, getAllUserList, getUserUpdate, getDeleteUserList, authenticate, getUserRegister, logout, isAuthenticate };
export default UserService;
