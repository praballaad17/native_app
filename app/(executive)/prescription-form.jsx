import { View, Text, Alert } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomForm from "../../components/CustomForm";

const PrescriptionForm = () => {
  const fields = [
    {
      label: "Patient Name",
      key: "patientName",
      placeholder: "Enter Patient name",
      type: "text",
    },
    {
      label: "Prescription By",
      key: "prescriptionBy",
      placeholder: "Enter Prescription By",
      type: "text",
    },
    {
      label: "Date",
      key: "recordDate",
      placeholder: "Select the date for Medical Record",
      type: "date",
    },
    { label: "Profile Picture", key: "profilePicture", type: "image" }, // Image field
    { label: "Upload Resume", key: "resume", type: "pdf" }, // PDF field
  ];

  const handleFormSubmit = (formData) => {
    Alert.alert("Form Submitted", JSON.stringify(formData, null, 2));
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text>Prescription Form</Text>
            <CustomForm fields={fields} onSubmit={handleFormSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PrescriptionForm;
