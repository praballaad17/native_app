import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import CustomButton from "./CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

// CustomForm Component
const CustomForm = ({ fields, onSubmit }) => {
  // State to manage form data dynamically
  const [formData, setFormData] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);

  // Handler for updating field values
  const handleInputChange = (fieldKey, value) => {
    setFormData({
      ...formData,
      [fieldKey]: value,
    });
  };

  const handleDateChange = (event, selectedDate, fieldKey) => {
    const currentDate = selectedDate || formData[fieldKey];
    setShowDatePicker(null); // Close the picker after selecting
    handleInputChange(fieldKey, currentDate.toISOString().split("T")[0]); // Store date in YYYY-MM-DD format
  };

  // Submitting the form
  const handleSubmit = () => {
    onSubmit(formData); // Call parent onSubmit function
  };

  const pickDocument = async (fieldKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled === false) {
        handleInputChange(fieldKey, result.assets[0].uri);
        Alert.alert(
          "Success",
          "Resume Uploaded Successfully!",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => router.push("/upload-profile") },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Cancelled", "File selection was cancelled.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleImagePick = async (fieldKey) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (result.canceled === false) {
      console.log(result.assets.length);
      const images = [];
      result.assets.map((item) => {
        images.push(item.uri);
      });

      console.log(images);
      handleInputChange(fieldKey, images); // Store the image URI
    }
  };

  return (
    <ScrollView style={styles.container}>
      {fields.map((field, index) => {
        const { label, key, placeholder, type } = field;

        return (
          <View key={index} style={styles.formField}>
            <Text className="font-psemibold" style={styles.label}>
              {label}:
            </Text>

            {type === "date" ? (
              <>
                {/* Date Input */}
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowDatePicker(key)}
                >
                  <Text style={styles.dateText}>
                    {formData[key]
                      ? formData[key]
                      : placeholder || "Select date"}
                  </Text>
                </TouchableOpacity>

                {/* Date Picker */}
                {showDatePicker === key && (
                  <DateTimePicker
                    value={formData[key] ? new Date(formData[key]) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) =>
                      handleDateChange(event, selectedDate, key)
                    }
                  />
                )}
              </>
            ) : type === "image" ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleImagePick(key)}
                >
                  <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>
                <FlatList
                  horizontal
                  data={formData[key] || []}
                  renderItem={({ item }) => (
                    <Image
                      key={item}
                      source={{ uri: item }}
                      style={styles.imagePreview}
                    />
                  )}
                  keyExtractor={(item) => item}
                />
              </>
            ) : type === "pdf" ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => pickDocument(key)}
                >
                  <Text style={styles.buttonText}>Select PDF</Text>
                </TouchableOpacity>
                {formData[key] ? (
                  <Text style={styles.pdfText}>
                    Selected PDF: {formData[key]}
                  </Text>
                ) : null}
              </>
            ) : (
              <TextInput
                style={styles.input}
                placeholder={placeholder || `Enter ${label}`}
                value={formData[key] || ""}
                onChangeText={(text) => handleInputChange(key, text)}
                keyboardType={type === "number" ? "numeric" : "default"} // Handle different input types
              />
            )}
          </View>
        );
      })}
      <CustomButton
        title="Submit"
        containerStyles=""
        handlePress={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  formField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  imagePreview: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  pdfText: {
    marginTop: 10,
    color: "green",
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});

export default CustomForm;
