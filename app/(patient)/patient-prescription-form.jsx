import { View, Text, Alert } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomForm from "../../components/CustomForm";
import { generateURLUpload, uploadFileToS3 } from "../../services/awsServices";
import { useLoader } from "../../hooks/useLoader";
import { FILETYPE, URLS } from "../../constants";
import useAuthListener from "../../hooks/useAuthListener";
import useUserType from "../../context/UserProvider";
import { createFileMetaData } from "../../services/utilityServices";
import { router } from "expo-router";

const PrescriptionForm = () => {
  const { setIsLoading } = useLoader();
  const { jwt, userId } = useAuthListener();
  const { userType } = useUserType();
  const fields = [
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
      placeholder: "Select Prescription",
      key: "imageOrPdf",
      type: "imageOrPdf",
    },
  ];

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    formData.reportType = FILETYPE.PRESCRIPTION;
    console.log("Form Submitted", formData);
    try {
      const filename = new Date() + `_${FILETYPE.PRESCRIPTION}`;
      const s3key = `${userId}/${FILETYPE.PRESCRIPTION}/${filename}`;

      const { url } = await generateURLUpload(jwt, s3key, formData.isPdf);
      formData.key = s3key;
      formData.userType = userType;
      formData.patientId = userId;
      if (formData.isPdf) {
        await uploadFileToS3(formData.imageOrPdf, url);
      } else {
        await uploadFileToS3(formData.imageOrPdf, url); //send the first image for now.
      }
      await createFileMetaData(formData, jwt);

      // router.push(URLS.PATIENTPRESCRIPTIONLIST);
      router.back();
    } catch (error) {
      console.log("error uploading prescription", error);
    }
    setIsLoading(false);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="h-full w-full justify-center h-100 py-4 px-2 my-6">
            <Text className="font-pbold text-2xl my-2">Prescription Form</Text>
            <CustomForm fields={fields} onSubmit={handleFormSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PrescriptionForm;
