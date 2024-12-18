import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomForm from "../../components/CustomForm";
import { postDocument } from "../../services/patientServices";
import { generateURLUpload, uploadFileToS3 } from "../../services/awsServices";
import { useLoader } from "../../hooks/useLoader";
import useAuthListener from "../../hooks/useAuthListener";
import { FILETYPE } from "../../constants";

const MedicalDataForm = () => {
  const { setIsLoading } = useLoader();
  const { jwt } = useAuthListener();
  const fields = [
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
    {
      label: "Select Medical Form",
      key: "imageOrPdf",
      type: "imageOrPdf",
    },
  ];

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      formData.reportType = "medicalRecords";
      console.log("Form Submitted", formData);
      const { url } = await generateURLUpload(jwt, FILETYPE.MEDICALRECORD);

      await uploadFileToS3(formData.imageOrPdf[0], url);
    } catch (error) {
      console.log("error uploading prescription", error);
    }
    setIsLoading(false);
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
