import axios from "axios";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/aws";

export const generateURLUpload = async (token, s3key) => {
  console.log("generateURLUpload: ", s3key);
  try {
    const response = await axios(`${apiEndpoint}/generate-aws-url-upload`, {
      method: "GET",
      params: {
        s3key,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
    throw new Error(err.response.data.error);
  }
};

export const generateURLView = async (key) => {
  try {
    const response = await axios(`${apiEndpoint}/generate-aws-url-view`, {
      method: "GET",
      params: {
        key,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const uploadFileToS3 = async (image, presignedUrl) => {
  const response = await fetch(image);
  const blob = await response.blob();

  const uploadResponse = await fetch(presignedUrl, {
    method: "PUT",
    body: blob,
    headers: {
      //"Content-Type": image.type ? image.type : "image/jpeg", // Ensure it matches the file type
    },
  });
  if (!uploadResponse.ok) {
    console.log("Failed to upload image");
  } else {
    console.log("Uploaded Successfully!");
  }
};
