import axios from "axios";
import "@env";

const apiEndpoint = process.env.API_URL + "/patient";
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
    const response = await axios.post(`${apiEndpoint}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
