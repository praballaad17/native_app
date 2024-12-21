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
import useUserType from "../../context/UserProvider";
import { createFileMetaData } from "../../services/utilityServices";
import { router } from "expo-router";

const MedicalDataForm = () => {
  const { setIsLoading } = useLoader();
  const { jwt, userId } = useAuthListener();
  const { userType } = useUserType();
  const fields = [
    {
      label: "Report Name",
      key: "reportName",
      placeholder: "Enter Report Name",
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
      formData.reportType = FILETYPE.MEDICALRECORD;

      const filename = new Date().toISOString() + `_${FILETYPE.MEDICALRECORD}`;
      const s3key = `${userId}/${FILETYPE.MEDICALRECORD}/${filename}`;

      const { url } = await generateURLUpload(jwt, s3key);
      formData.key = s3key;
      formData.userType = userType;
      formData.patientId = userId;
      await uploadFileToS3(formData.imageOrPdf[0], url);
      await createFileMetaData(formData, jwt);

      router.push(MEDICALRECORDLIST);
    } catch (error) {
      console.log("error uploading medical record", error);
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
