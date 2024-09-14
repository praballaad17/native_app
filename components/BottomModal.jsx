import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const BottomSheetModal = ({ visible, closeModal, updateProfileImage }) => {
  const options = [
    {
      title: "choose profile image",
      function: () => {
        pickImage();
        closeModal();
      },
    },
    { title: "option 2", function: pickImage },
    { title: "option 3", function: pickImage },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                 roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      try {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          // If an image is selected (not cancelled),
          // update the file state variable
          updateProfileImage(result.assets[0].uri);

          // Clear any previous errors
          setError(null);
        }
      } catch (error) {
        Alert("Failed", "Photo canot be selected, Try again!");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal Component */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        {/* Transparent overlay */}
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeModal}
          activeOpacity={1}
        >
          {/* Bottom sheet */}
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.sheetTitle}>Select an Option</Text>

            {options.map((item, idx) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={item.function}
                key={idx}
              >
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent overlay
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default BottomSheetModal;
