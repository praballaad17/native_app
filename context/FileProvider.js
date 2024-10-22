import { useContext, createContext, useState, useEffect } from "react";
import { USERS } from "../constants/index";
export const FileContext = createContext();
import * as FileSystem from "expo-file-system";

export function useFile() {
  return useContext(FileContext);
}
const fileUri = FileSystem.documentDirectory + "tempData.json";

export const FileProvider = ({ children }) => {
  const writeData = async (key, value) => {
    try {
      // Check if the file already exists
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      let currentData = {};

      if (fileInfo.exists) {
        // If the file exists, read the existing data
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        currentData = JSON.parse(fileContents);
      }

      // Add or update the key-value pair
      currentData[key] = value;

      // Write the updated data back to the file
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(currentData));
      console.log("Data written successfully");
    } catch (error) {
      console.error("Error writing data:", error);
    }
  };

  // Read data from the file
  const readData = async (key) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        // Read the file
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        const currentData = JSON.parse(fileContents);

        // Return the value for the given key
        if (currentData[key] !== undefined) {
          return currentData[key];
        } else {
          console.log(`Key '${key}' not found`);
          return null;
        }
      } else {
        console.log("No data found");
        return null;
      }
    } catch (error) {
      console.error("Error reading data:", error);
      return null;
    }
  };

  const storeFile = async (fileUri, fileName) => {
    try {
      // Define the directory and file path where you want to store the file
      const fileDirectory = FileSystem.documentDirectory + "storedFiles/";
      const fileDestination = fileDirectory + fileName; // File name should include the extension, e.g., 'example.pdf' or 'image.jpg'

      // Ensure the directory exists (create if necessary)
      const dirInfo = await FileSystem.getInfoAsync(fileDirectory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(fileDirectory, {
          intermediates: true,
        });
      }

      // Copy the file to the destination path
      await FileSystem.copyAsync({
        from: fileUri,
        to: fileDestination,
      });

      console.log(`File successfully stored at ${fileDestination}`);
      return fileDestination; // Return the path to the saved file
    } catch (error) {
      console.error("Error storing file:", error);
    }
  };

  const retrieveFile = async (fileName) => {
    try {
      // Define the directory and file path where the file was stored
      const fileDirectory = FileSystem.documentDirectory + "storedFiles/";
      const filePath = fileDirectory + fileName;

      // Check if the file exists
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        console.log(`File found at ${filePath}`);
        return filePath; // Return the path to the file if it exists
      } else {
        console.log("File not found");
        return null; // File doesn't exist
      }
    } catch (error) {
      console.error("Error retrieving file:", error);
    }
  };

  const deleteData = async (key) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        // Read the existing data
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        const currentData = JSON.parse(fileContents);

        // Check if the key exists in the current data
        if (currentData.hasOwnProperty(key)) {
          // Delete the key-value pair
          delete currentData[key];

          // Write the updated data back to the file
          await FileSystem.writeAsStringAsync(
            fileUri,
            JSON.stringify(currentData)
          );
          console.log(`Key '${key}' deleted successfully`);
        } else {
          console.log(`Key '${key}' does not exist`);
        }
      } else {
        console.log("No data found to delete");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Delete or clear the file
  const deleteFile = async () => {
    await FileSystem.deleteAsync(fileUri);
  };

  const value = {
    writeData,
    readData,
    deleteFile,
    deleteData,
    storeFile,
    retrieveFile,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export default useFile;
