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
import { router } from "expo-router";
import ToggleSwitch from "./ToggleSwitch";
import CustomDropdownSelect from "./CustomDropDownSelect";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { formateDate, PDFGeneratorFromImages } from "../utils/utils";
import { DATEOPTIONS } from "../constants";
import CustomToggleButton from "./utilities/CustomToggleButton";

// CustomForm Component
const CustomForm = ({ fields, onSubmit, data }) => {
  // State to manage form data dynamically
  const [formData, setFormData] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [isPdf, setIsPdf] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    institute: "",
    grade: "",
    from: new Date(),
    till: new Date(),
  });
  const [showEducationDatePicker, setEducationShowDatePicker] = useState({
    from: false,
    till: false,
  });

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
    onSubmit({ ...formData, isPdf }); // Call parent onSubmit function
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

    if (result.canceled === false) {
      const images = [];
      result.assets.map((item) => {
        images.push(item.uri);
      });
      console.log(fieldKey, typeof result.assets[0].uri);

      //const pdfURL = PDFGeneratorFromImages(images); //need to check this function

      handleInputChange(fieldKey, result.assets[0].uri); // Store the image URIs in an array
    }
  };

  const handleTextNumberInput = (type, key, text) => {
    if (type === "number") {
      handleInputChange(key, Number(text));
    } else {
      handleInputChange(key, text);
    }
  };

  // education functions
  const handleEducation = () => {
    const { institute, grade, from, till } = currentEducation;
    if (institute && grade && from && till) {
      setFormData({
        ...formData,
        education: [...formData.education, { institute, grade, from, till }],
      });

      setCurrentEducation({
        institute: "",
        grade: "",
        from: new Date(),
        till: new Date(),
      });
    }
  };

  const onDateChange = (event, selectedDate, field) => {
    setCurrentEducation({
      ...currentEducation,
      [field]: selectedDate,
    });
    setEducationShowDatePicker({ ...showDatePicker, [field]: false });
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, idx) => idx !== index),
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {fields.map((item, index) => {
          if (
            !item ||
            !item.label ||
            !item.placeholder ||
            !item.key ||
            !item.type
          ) {
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
                      {formData[key]
                        ? formateDate(formData[key])
                        : placeholder || "Select date"}
                    </Text>
                  </TouchableOpacity>

                  {/* Date Picker */}
                  {showDatePicker === key && (
                    <DateTimePicker
                      value={
                        formData[key] ? new Date(formData[key]) : new Date()
                      }
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
                  {/* <ToggleSwitch isEnabled={isPdf} setIsEnabled={setIsEnabled} /> */}
                  <CustomToggleButton
                    task1={"Select Image"}
                    task2={"Select PDF"}
                    isTask1Active={!isPdf}
                    setIsTask1Active={setIsEnabled}
                  />
                  {!isPdf ? (
                    <>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleImagePick(key)}
                      >
                        <Text style={styles.buttonText}>Select Image</Text>
                      </TouchableOpacity>
                      <Image
                        // key={`${item}-${index}`} // Ensure unique keys
                        key={index}
                        source={{ uri: formData[key] }}
                        className="mx-2"
                        style={{ width: 300, height: 400 }}
                      />
                      {/* <FlatList
                        horizontal
                        data={formData[key] || []}
                        renderItem={({ item, index }) => (
                          <Image
                            // key={`${item}-${index}`} // Ensure unique keys
                            key={index}
                            source={{ uri: item }}
                            className="mx-2"
                            style={{ width: 300, height: 400 }}
                          />
                        )}
                        keyExtractor={(item, index) => `${item}-${index}`} // Ensure unique keys
                        // scrollEnabled={false} // Disable scroll for the inner FlatList
                      /> */}
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
              ) : type === "education" ? (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Institute Name"
                    value={currentEducation.institute}
                    onChangeText={(e) =>
                      setCurrentEducation({ ...currentEducation, institute: e })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Grade"
                    value={currentEducation.grade}
                    onChangeText={(e) =>
                      setCurrentEducation({ ...currentEducation, grade: e })
                    }
                  />
                  <View className="flex-row justify-between my-2 items-center">
                    <Text className="border border-black-100 flex-1 py-2 px-4 mr-3">
                      {currentEducation.from
                        ? currentEducation.from.toLocaleDateString(
                            "en-US",
                            DATEOPTIONS
                          )
                        : "Select Date"}
                    </Text>
                    <Button
                      title="From Date"
                      onPress={() =>
                        setEducationShowDatePicker({
                          ...showEducationDatePicker,
                          from: true,
                        })
                      }
                    />
                  </View>
                  {showEducationDatePicker.from && (
                    <DateTimePicker
                      value={currentEducation.from}
                      mode="date"
                      display="default"
                      onChange={(e, selectedDate) =>
                        onDateChange(e, selectedDate, "from")
                      }
                    />
                  )}
                  <View className="flex-row justify-between my-2 items-center">
                    <Text className="border border-black-100 flex-1 py-2 px-4 mr-3">
                      {currentEducation.till
                        ? currentEducation.till.toLocaleDateString(
                            "en-US",
                            DATEOPTIONS
                          )
                        : "Select Date"}
                    </Text>
                    <Button
                      title="Till Date"
                      onPress={() =>
                        setEducationShowDatePicker({
                          ...showEducationDatePicker,
                          till: true,
                        })
                      }
                    />
                  </View>

                  {showEducationDatePicker.till && (
                    <DateTimePicker
                      value={currentEducation.till}
                      mode="date"
                      display="default"
                      onChange={(e, selectedDate) =>
                        onDateChange(e, selectedDate, "till")
                      }
                    />
                  )}
                  <Button title="Add Education" onPress={handleEducation} />
                  <View style={styles.skillsContainer}>
                    {formData.education && formData.education.length ? (
                      formData.education.map((edu, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.rectangleBox}
                          onPress={() => removeEducation(index)}
                        >
                          <View className="flex-row justify-between">
                            <Text className="text-lg font-bold">
                              {edu.institute}
                            </Text>
                            <Text className="text-lg font-bold">✕</Text>
                          </View>
                          <Text className="text-sm"> {edu.grade}</Text>
                          <Text>
                            {edu.from.toLocaleDateString("en-US", DATEOPTIONS)}-
                            {edu.till.toLocaleDateString("en-US", DATEOPTIONS)}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text>No Education Added</Text>
                    )}
                  </View>
                </>
              ) : type === "skills" ? (
                <>
                  <Text style={styles.label}>Skills</Text>
                  <View
                    className="flex-row items-center"
                    // style={styles.skillsInputWrapper}
                  >
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="Add a skill"
                      value={formData.currentSkill}
                      onChangeText={(text) =>
                        handleInputChange("currentSkill", text)
                      }
                    />
                    <Button
                      // className="mx-2"
                      title="Add"
                      onPress={addSkill}
                      style={styles.button}
                    />
                  </View>
                  <View style={styles.skillsContainer}>
                    {formData.skills.map((skill, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.skillBadge}
                        onPress={() => removeSkill(index)}
                      >
                        <Text style={styles.skillText}>{skill} ✕</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
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
                    renderItem={({ item, index }) => (
                      <Image
                        key={`${item}-${index}`} // Ensure unique keys
                        source={{ uri: item }}
                        className="mx-2"
                        style={{ width: 300, height: 400 }}
                      />
                    )}
                    keyExtractor={(item, index) => `${item}-${index}`} // Ensure unique keys
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
                  selectedValue={formData[key] ? formData[key] : ""}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder={placeholder || `Enter ${label}`}
                  value={
                    formData[key] !== undefined ? formData[key].toString() : ""
                  }
                  onChangeText={(text) =>
                    handleTextNumberInput(type, key, text)
                  }
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
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomForm;
