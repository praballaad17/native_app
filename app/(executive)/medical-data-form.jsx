import { View, Text, Alert } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomForm from "../../components/CustomForm";

const MedicalDataForm = () => {
  const fields = [
    {
      label: "Patient Name",
      key: "patientName",
      placeholder: "Enter Patient name",
      type: "text",
    },
    {
      label: "Report Name",
      key: "reportName",
      placeholder: "Enter Report Name",
      type: "text",
    },
    {
      label: "Report By",
      key: "reporter",
      placeholder: "Enter Report issued by",
      type: "text",
    },
    {
      label: "Date",
      key: "recordDate",
      placeholder: "Select the date for Medical Record",
      type: "date",
    },
  ];

  const handleFormSubmit = (formData) => {
    Alert.alert("Form Submitted", JSON.stringify(formData, null, 2));
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl font-pbold my-4">Medical Data Form</Text>
            <CustomForm fields={fields} onSubmit={handleFormSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MedicalDataForm;
