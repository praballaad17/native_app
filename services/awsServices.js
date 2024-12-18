import axios from "axios";

const apiEndpoint = process.env.EXPO_PUBLIC_API_URL + "/aws";

export const generateURLUpload = async (
  token,
  fileType,
  fileName = new Date()
) => {
  fileName = fileName + `_${fileType}`;
  console.log("generateURLUpload: ", fileName, fileType);
  try {
    const response = await axios(`${apiEndpoint}/generate-aws-url-upload`, {
      method: "GET",
      params: {
        fileName: fileName,
        fileType: fileType,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const generateURLView = async (fileName) => {
  try {
    const response = await axios(`${apiEndpoint}/generate-aws-url-view`, {
      method: "GET",
      params: {
        fileName: fileName,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// export const uploadFileToS3 = async (image, presignedUrl) => {
//   console.log();
//   const response = await fetch(image.url);
//   const blob = await response.blob();
//   console.log(response, blob);
//   const uploadResponse = await fetch(presignedUrl, {
//     method: "PUT",
//     body: blob,
//     headers: {
//       //"Content-Type": image.type ? image.type : "image/jpeg", // Ensure it matches the file type
//     },
//   });
//   if (!uploadResponse.ok) {
//     console.log("Failed to upload image");
//   } else {
//     console.log("Uploaded Successfully!");
//   }
// };

export const uploadFileToS3 = async (image, presignedUrl) => {
  console.log();
  const response = await fetch(image);
  const blob = await response.blob();
  console.log(response, blob);
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
