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

export const doctorRegister = async (formData) => {
  try {
    const response = await axios.post(`${apiEndpoint}/register`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    return error;
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
