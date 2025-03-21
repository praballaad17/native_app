import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Alert,
  Button,
} from "react-native";
import CustomButton from "./CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import PDFViewer from "./PDFViewer";
import { router } from "expo-router";
import ToggleSwitch from "./ToggleSwitch";
import CustomDropdownSelect from "./CustomDropDownSelect";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { PDFGeneratorFromImages } from "../utils/utils";

// CustomForm Component
const CustomForm = ({ fields, onSubmit, data }) => {
  // State to manage form data dynamically
  const [formData, setFormData] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [isPdf, setIsPdf] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({});
    }
  }, [data]);

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

  const setIsEnabled = () => {
    handleInputChange("imageOrPdf", null);
    setIsPdf(!isPdf);
  };

  // Submitting the form
  const handleSubmit = () => {
    setFormData({
      ...formData,
      isPdf,
    });
    onSubmit(formData); // Call parent onSubmit function
  };

  const pickDocument = async (fieldKey) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled === false) {
        handleInputChange(fieldKey, result.assets[0].uri);
      }

      //   if (result.canceled === false) {
      //     handleInputChange(fieldKey, result.assets[0].uri);
      //     Alert.alert(
      //       "Success",
      //       "Resume Uploaded Successfully!",
      //       [
      //         {
      //           text: "Cancel",
      //           onPress: () => console.log("Cancel Pressed"),
      //           style: "cancel",
      //         },
      //         { text: "OK", onPress: () => console.log("pdf uploaded") },
      //       ],
      //       { cancelable: false }
      //     );
      //   } else {
      //     Alert.alert("Cancelled", "File selection was cancelled.");
      //   }
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

    console.log(result);

    if (result.canceled === false) {
      const images = [];
      result.assets.map((item) => {
        images.push(item.uri);
      });

      const pdfURL = PDFGeneratorFromImages(images);

      handleInputChange(fieldKey, pdfURL); // Store the image URI
    }
  };

  const handleTextNumberInput = (type, key, text) => {
    if (type === "number") {
      handleInputChange(key, Number(text));
    } else {
      handleInputChange(key, text);
    }
  };

  const renderItem = ({ item }) => {
    if (!item || !item.label || !item.placeholder || !item.key || !item.type) {
      console.error(
        `check ${item} the fields array for the following field: label, placeholder, key, type`
      );
      return null; // Return null if item or its properties are undefined
    }

    const { label, key, placeholder, type } = item;

    return (
      <View style={styles.formField}>
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
                {formData[key] ? formData[key] : placeholder || "Select date"}
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
        ) : type === "imageOrPdf" ? (
          <>
            <ToggleSwitch isEnabled={isPdf} setIsEnabled={setIsEnabled} />
            {!isPdf ? (
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
                      className="mx-2"
                      style={{ width: 300, height: 400 }}
                    />
                  )}
                  keyExtractor={(item) => item}
                  // scrollEnabled={false} // Disable scroll for the inner FlatList
                />
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => pickDocument(key)}
                >
                  <Text style={styles.buttonText}>Select PDF</Text>
                </TouchableOpacity>
                {formData[key] ? (
                  <View>
                    <Text style={styles.pdfText}>
                      Selected PDF: {formData[key]}
                    </Text>
                    <Button
                      title="View"
                      onPress={() =>
                        router.push({
                          pathname: "/pdf-view",
                          params: {
                            pdfurl: formData[key],
                          },
                        })
                      }
                    />
                    {/* <PDFViewer pdfUri={formData[key]} /> */}
                  </View>
                ) : null}
              </>
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
                  className="mx-2"
                  style={{ width: 300, height: 400 }}
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
              <View>
                <Text style={styles.pdfText}>
                  Selected PDF: {formData[key]}
                </Text>
                <Button
                  title="View"
                  onPress={() =>
                    router.push({
                      pathname: "/pdf-view",
                      params: {
                        pdfurl: formData[key],
                      },
                    })
                  }
                />
              </View>
            ) : null}
          </>
        ) : type === "dropdown" ? (
          <CustomDropdownSelect
            options={item.options}
            placeholder={item.placeholder}
            onSelect={(option) => handleInputChange(key, option)}
            selectedValue={formData[key] || ""}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder || `Enter ${label}`}
            value={formData[key] || ""}
            onChangeText={(text) => handleTextNumberInput(type, key, text)}
            keyboardType={type === "number" ? "numeric" : "default"} // Handle different input types
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          initialNumToRender={10}
          windowSize={5}
        />
        {/* {fields.map((field, index) => {
        
        return (
          
        );
      })} */}
        <CustomButton
          title="Submit"
          containerStyles=""
          handlePress={handleSubmit}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
