import axios from "axios";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/utility";

export const createFileMetaData = async (formData, token) => {
  try {
    const response = await axios.post(
      `${apiEndpoint}/create-file-metaData`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
