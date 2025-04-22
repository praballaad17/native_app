import { Dimensions } from "react-native"; // Import Dimensions

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formateDate = (isoDate) => {
  const date = new Date(isoDate);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  // Format to dd-mm-yyyy
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

// Generate time slots for the day (e.g., 08:00 AM to 08:00 PM)
export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 8; // 08:00 AM
  const endHour = 20; // 08:00 PM

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }

  return slots;
};

// Add deviceHeight and deviceWidth functions
const deviceHeight = () => Dimensions.get("window").height;
const deviceWidth = () => Dimensions.get("window").width;

export const PDFGeneratorFromImages = async (imagePaths) => {
  try {
    const options = {
      imagePaths: imagePaths,
      name: new Date(),
      maxSize: {
        // optional maximum image dimension - larger images will be resized
        width: 900,
        height: Math.round((deviceHeight() / deviceWidth()) * 900),
      },
      quality: 0.7, // optional compression paramter
    };
    const pdf 

    console.log(pdf.filePath);
    return pdf.filePath;
  } catch (e) {
    console.log(e);
    return null;
  }
};

//age calculation function with dob = 2024-11-01T00:00:00.000Z
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
