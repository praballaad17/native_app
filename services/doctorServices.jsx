import axios from "axios";
import { saveToken } from "./AuthenticationServices";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/doctor";
const tokenKey = "token";

// /**
//  * Logs a user in with the provided credentials
//  * @function login
//  * @param {string} usernameOrEmail The username or email to login with
//  * @param {string} password A password to log in with
//  * @param {string} authToken A token to be used instead of a username/email or password
//  * @returns {object} The user object
//  */

export const doctorRegister = async (formData) => {
  try {
    const response = await axios.post(`${apiEndpoint}/register`, formData);
    saveToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    return error;
  }
};

export const addDoctorProfile = async (formData, userId) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/add-doctor-profile/${userId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw new Error(err.response);
  }
};

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

export const editDoctorDetails = async (formData, id) => {
  try {
    const response = await axios.put(
      `${apiEndpoint}/edit-profile/${id}`,
      formData
    );

    return response.data;
  } catch (error) {
    return error;
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

export const getAppointments = async (doctorId) => {
  try {
    const response = await axios(
      `${apiEndpoint}/get-appointments/${doctorId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getActivePatients = async (doctorId) => {
  try {
    const response = await axios(
      `${apiEndpoint}/get-patient-active/${doctorId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getInActivePatients = async (doctorId) => {
  try {
    const response = await axios(
      `${apiEndpoint}/get-patient-inactive/${doctorId}`,
      {
        method: "GET",
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const convertActivePatientToInactive = async (relationId) => {
  console.log("Relation ID: ", relationId);
  try {
    const response = await axios(
      `${apiEndpoint}/convert-active-patient-to-inactive/${relationId}`,
      {
        method: "PUT",
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
export const convertInactivePatientToActive = async (relationId) => {
  console.log("Relation ID: ", relationId);
  try {
    const response = await axios(
      `${apiEndpoint}/convert-inactive-patient-to-active/${relationId}`,
      {
        method: "PUT",
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
