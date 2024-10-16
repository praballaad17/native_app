import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { MMKV } from "react-native-mmkv";

const ResumeUpload = () => {
  const [pdfUri, setPdfUri] = useState(null);
  // const storage = new MMKV();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      console.log(result);

      if (result.canceled === false) {
        setPdfUri(result.assets[0].uri);
        Alert.alert(
          "Success",
          "Resume Uploaded Successfully!",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: handleSubmit },
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

  const handleSubmit = (url) => {
    // storage.set("resumeUrl", url);
    router.push("/upload-profile");
  };

  const uploadPdfToServer = async (pdfUri) => {
    const formData = new FormData();

    // Create a FormData object and append the PDF file
    formData.append("pdf", {
      uri: pdfUri, // File path from the document picker
      type: "application/pdf", // MIME type
      name: "resume.pdf", // Custom name for the file
    });
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
