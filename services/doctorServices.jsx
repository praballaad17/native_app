import axios from "axios";
import "@env";

const apiEndpoint = process.env.API_URL + "/doctor";
const tokenKey = "token";

// /**
//  * Logs a user in with the provided credentials
//  * @function login
//  * @param {string} usernameOrEmail The username or email to login with
//  * @param {string} password A password to log in with
//  * @param {string} authToken A token to be used instead of a username/email or password
//  * @returns {object} The user object
//  */
export const verifyDoctor = async (usernameOrEmail, password, authToken) => {
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

export const submitDoctorDetails = async (details) => {
  try {
    const response = await axios(`${apiEndpoint}/submit-details`, {
      method: "POST",
      ...details,
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getAppointments = async () => {
  console.log("getAppointments");
  try {
    const response = await axios(`${apiEndpoint}/get-appoitments`, {
      method: "GET",
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
