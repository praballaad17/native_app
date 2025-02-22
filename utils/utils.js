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
export  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8; // 08:00 AM
    const endHour = 20; // 08:00 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }

    return slots;
  };