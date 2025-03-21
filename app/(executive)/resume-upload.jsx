import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { MMKV } from "react-native-mmkv";
import { generateURLUpload, uploadFileToS3 } from "../../services/awsServices";
import useAuthListener from "../../hooks/useAuthListener";
import { FILETYPE } from "../../constants";

const ResumeUpload = () => {
  const [pdfUri, setPdfUri] = useState(null);
  const { jwt, userId } = useAuthListener();
  // const storage = new MMKV();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      console.log(result);

      if (result.canceled === false) {
        setPdfUri(result.assets[0].uri);
        handleUpload();
      } else {
        
      }
    } catch (error) {
      Alert.alert("Cancelled", "Error picking document");
      console.error("Error picking document:", error);
    }
  };

  const handleUpload = async () => {
    try {
      const filename = new Date() + `_${FILETYPE.EXECUTIVERESUME}`;
      const s3key = `${userId}/${FILETYPE.EXECUTIVERESUME}/${filename}`;
      const { url } = await generateURLUpload(jwt, s3key);
      await uploadFileToS3(pdfUri, url);
    } catch (error) {
      Alert.alert("Error", "Failed to upload the PDF.");
      console.log("error uploading resume", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full flex-1 items-center justify-center bg-white">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Text className="text-3xl font-pbold">Hi Executive</Text>
            <Text className="text-xl font-psemibold capitalize">
              get instant verification by the ulten team , just in two simple
              steps
            </Text>
            <CustomButton
              title="Upload Resume"
              handlePress={pickDocument}
              containerStyles="w-full mt-7"
            />
            <Text className="text-2xl font-pbold mt-5">OR</Text>
            <CustomButton
              title="Fill Form"
              handlePress={() => router.push("/executive-resume-form")}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ResumeUpload;
