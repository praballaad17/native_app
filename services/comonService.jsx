import axios from "axios";
import { FILETYPE } from "../constants/index";
import { generateURLUpload, uploadFileToS3 } from "./awsServices";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/common";

export const getUser = async (userId) => {
  console.log(apiEndpoint);
  try {
    const response = await axios(`${apiEndpoint}/get-user/${userId}`, {
      method: "GET",
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getPatientProfile = async (patientId) => {
  try {
    const response = await axios(`${apiEndpoint}/get-patient/${patientId}`, {
      method: "GET",
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const postPhoto = async (patientId, formdata) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/post-photo/${patientId}`,
      formdata
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const postMessage = async (formdata) => {
  try {
    const response = await axios.post(`${apiEndpoint}/post-message`, formdata);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
