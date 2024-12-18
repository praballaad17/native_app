import { View, Text, Alert } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomForm from "../../components/CustomForm";
import { generateURLUpload, uploadFileToS3 } from "../../services/awsServices";
import { useLoader } from "../../hooks/useLoader";
import { FILETYPE } from "../../constants";
import useAuthListener from "../../hooks/useAuthListener";

const PrescriptionForm = () => {
  const { setIsLoading } = useLoader();
  const { jwt } = useAuthListener();
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
    {
      label: "Select Prescription",
      key: "imageOrPdf",
      type: "imageOrPdf",
    },
  ];

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    formData.reportType = "prescription";
    console.log("Form Submitted", formData);
    try {
      const { url } = await generateURLUpload(jwt, FILETYPE.PRESCRIPTION);
      console.log(url);
      await uploadFileToS3(formData.imageOrPdf, url);
    } catch (error) {
      console.log("error uploading prescription", error);
    }
    setIsLoading(false);
  };
  return (
    <View className="h-full w-full justify-center h-100 py-4 px-2 my-6">
      <Text className="font-pbold text-2xl my-2">Prescription Form</Text>
      <CustomForm fields={fields} onSubmit={handleFormSubmit} />
    </View>
  );
};

export default PrescriptionForm;
