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
export const patientRegister = async (formData) => {
  try {
    const response = await axios(`${apiEndpoint}/register`, {
      method: "POST",
      ...formData,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const editPatientDetails = async (formData, patientId) => {
  try {
    const response = await axios(`${apiEndpoint}/edit-profile/:${patientId}`, {
      method: "PUT",
      ...formData,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const postAppointment = async (formData) => {
  try {
    const response = await axios(`${apiEndpoint}/post-appointment`, {
      method: "POST",
      ...formData,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getAppointment = async (patientId) => {
  try {
    const response = await axios(
      `${apiEndpoint}/get-appointment/${patientId}`,
      {
        method: "GET",
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const postPhoto = async (patientId, file) => {
  try {
    const response = await axios(`${apiEndpoint}/post-photo/${patientId}`, {
      method: "POST",
      file,
      headers: {
        "Content-Type": "multipart/form-data", // Ensure proper headers for file uploads
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const postDocument = async (patientId, formData) => {
  try {
    if (formData.isPdf) {
      const response = await axios(
        `${apiEndpoint}/post-document-pdf/${patientId}`,
        {
          method: "POST",
          formData,
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper headers for file uploads
          },
        }
      );
      return response.data;
    } else {
      const response = await axios(
        `${apiEndpoint}/post-document-images/${patientId}`,
        {
          method: "POST",
          formData,
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper headers for file uploads
          },
        }
      );
      return response.data;
    }
  } catch (err) {
    throw new Error(err.response.data.error);
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

export const FetchAllDoctorList = async (page, limit = 10) => {
  try {
    const response = await axios.get(`${apiEndpoint}/get-doctor-list`, {
      params: {
        page: page,
        limit: limit,
      },
    });
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error(
      `Error: ${err.response?.status} - ${err.response?.data?.error}`
    );
  }
};

export const ConsultDoctorList = async (speciality = "") => {
  console.log(speciality, apiEndpoint);
  try {
    const response = await axios.get(
      `${apiEndpoint}/consult-list/${speciality}`
    );
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error(
      `Error: ${err.response?.status} - ${err.response?.data?.error}`
    );
  }
};

export const getAllowedDoctors = async (patientId) => {
  try {
    const response = await axios.get(
      `${apiEndpoint}/allowed-doctors/${patientId}`
    );
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error(
      `Error: ${err.response?.status} - ${err.response?.data?.error}`
    );
  }
};
