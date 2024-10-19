import axios from "axios";
import "@env";

const apiEndpoint = process.env.API_URL + "/executive";
const tokenKey = "token";

// /**
//  * Logs a user in with the provided credentials
//  * @function login
//  * @param {string} usernameOrEmail The username or email to login with
//  * @param {string} password A password to log in with
//  * @param {string} authToken A token to be used instead of a username/email or password
//  * @returns {object} The user object
//  */
export const executiveRegister = async (formData) => {
  try {
    const response = await axios.post(`${apiEndpoint}/register`, formData);

    return response;
  } catch (error) {
    console.error("Error creating executive:", error);
    return error;
  }
};

export const editExecutiveDetails = async (formData, id) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/edit-details/${id}`,
      formData
    );

    if (response.data.success) {
      Alert.alert("Success", "PDF uploaded successfully!");
    } else {
      Alert.alert("Error", "Failed to upload the PDF.");
    }
  } catch (error) {
    console.error("Error uploading PDF:", error);
    Alert.alert("Error", "An error occurred while uploading.");
  }
};

export const verifyExecutive = async (patientId, executiveId) => {
  try {
    const response = await axios(
      `${apiEndpoint}/verify-executive/${patientId}/${executiveId}`,
      {
        method: "POST",
      }
    );

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getPatientListByExecutiveId = async (executiveId) => {
  try {
    const response = await axios(`${apiEndpoint}/get-patient/${executiveId}`, {
      method: "GET",
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const addPatientByExecutive = async (formData, id) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/add-patinet/${id}`,
      formData
    );

    return response;
  } catch (error) {
    console.error("Error uploading PDF:", error);
    Alert.alert("Error", "An error occurred while uploading.");
  }
};

export const addWithdraw = async (formData) => {
  try {
    const response = await axios.post(`${apiEndpoint}/add-withdraw`, formData);

    return response;
  } catch (error) {
    throw new Error(err.response.data.error);
  }
};

export const getWithdraw = async (executiveId) => {
  try {
    const response = await axios(`${apiEndpoint}/get-withdraw/${executiveId}`, {
      method: "GET",
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
