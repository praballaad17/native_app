import axios from "axios";
import "@env";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { URLS } from "../constants";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/auth";
const tokenKey = "authToken";

function setJwt(jwt) {
  axios.defaults.headers.common["token"] = jwt;
}

// Save JWT Token
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync(tokenKey, token);
    console.log("token is saved");
  } catch (error) {
    console.log("Error saving the token", error);
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(tokenKey);
    if (token) {
      // Token exists, proceed with auto-login
      console.log("token is ", token);
      return token;
    } else {
      // No token, prompt for login
      console.log("token does not exists");
      return null;
    }
  } catch (error) {
    console.log("Error retrieving the token", error);
    return null;
  }
};

const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("authToken");
    console.log("token is deleted");
  } catch (error) {
    console.log("Error deleting the token", error);
  }
};

// /**
//  * Logs a user in with the provided credentials
//  * @function login
//  * @param {string} usernameOrEmail The username or email to login with
//  * @param {string} password A password to log in with
//  * @param {string} authToken A token to be used instead of a username/email or password
//  * @returns {object} The user object
//  */
export const generateOTPIfUser = async (number) => {
  try {
    console.log(apiEndpoint);
    const response = await axios.post(`${apiEndpoint}/get-otp-if-user`, {
      number,
    });
    console.log("generateOTPIfUser res", response.status);

    return response.data;
  } catch (err) {
    console.log("generateOTPIfUser error: ", err);
    throw new Error(err.response);
  }
};

export const verifyOtpWithUser = async (form) => {
  console.log(form);
  try {
    const response = await axios.post(
      `${apiEndpoint}/verify-otp-with-user`,
      form
    );
    console.log("res", response.status);
    // if(response.data.status)
    saveToken(response.data.token);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data);
  }
};

export const generateOTP = async (number) => {
  try {
    console.log(typeof number);
    const response = await axios.post(`${apiEndpoint}/get-otp`, {
      number,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};

export const verifyOtp = async (form) => {
  try {
    const response = await axios.post(`${apiEndpoint}/verify-otp`, form);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data);
  }
};

export const getUserByUserId = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/user/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const resetPassOtp = async (email) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/forgot-pass-generate-otp/${email}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axios.put(`${apiEndpoint}/change-password`, {
      ...data,
    });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};

export async function logout() {
  console.log("logout enter!");
  deleteToken();
  router.replace(URLS.AUTHSIGNIN);
}
