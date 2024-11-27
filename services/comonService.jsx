import axios from "axios";
import "@env";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/common";
// const apiEndpoint = "http://192.168.1.10:3003/api" + "/common";

export const getUser = async (userId, profileType) => {
  console.log(apiEndpoint);
  try {
    const response = await axios(
      `${apiEndpoint}/get-user/${userId}/${profileType}`,
      {
        method: "GET",
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
