import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_URL + "/auth";
const tokenKey = "token";

function setJwt(jwt) {
  axios.defaults.headers.common["token"] = jwt;
}

setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
// /**
//  * Logs a user in with the provided credentials
//  * @function login
//  * @param {string} usernameOrEmail The username or email to login with
//  * @param {string} password A password to log in with
//  * @param {string} authToken A token to be used instead of a username/email or password
//  * @returns {object} The user object
//  */
export const login = async (usernameOrEmail, password, authToken) => {
  try {
    const request =
      usernameOrEmail && password
        ? { data: { usernameOrEmail, password } }
        : { headers: { authorization: authToken } };
    const response = await axios(`${apiEndpoint}/login`, {
      method: "POST",
      ...request,
    });
    localStorage.setItem(tokenKey, response.data.token);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// /**
//  * Registers a user with the provided credentials
//  * @param {string} email A user's email address
//  * @param {string} fullName A user's full name
//  * @param {string} username A user's username
//  * @param {string} password A user's password
//  * @returns {object} The user object
//  */
export const registerUser = async (username, fullName, email, password) => {
  try {
    const response = await axios.post(`${apiEndpoint}/register`, {
      email,
      fullName,
      username,
      password,
    });
    console.log(response.data.token);
    localStorage.setItem(tokenKey, response.data.token);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * update buisness profile by user id.
 * @param {buissness details} business
 * @param {*} userId
 */

export const updateBusinessDetails = async (userId, business) => {
  try {
    await axios.put(`${apiEndpoint}/updateDetails/${userId}`, business);
  } catch (err) {
    throw new Error(err.response.data.error);
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

export const generateOtp = async (userId) => {
  try {
    const response = await axios.get(`${apiEndpoint}/generate-otp/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
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
  localStorage.removeItem(tokenKey);
  window.location.reload(false);
}