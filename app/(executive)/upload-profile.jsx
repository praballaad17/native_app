import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ImageUpload from "../../components/ImagePicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const UploadProfile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                 roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      try {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          // If an image is selected (not cancelled),
          // update the file state variable
          setFile(result.assets[0].uri);

          // Clear any previous errors
          setError(null);
        }
      } catch (error) {
        Alert("Failed", "Photo canot be selected, Try again!");
      }
    }
  };

  const submit = () => {
    //
    router.push("/approval-pending");
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Text className="text-xl font-psemibold capitalize">
              partner, lets do just last step !
            </Text>

            <ImageUpload file={file} error={error} />

            <CustomButton
              title={"Select"}
              handlePress={pickImage}
              containerStyles="w-full mt-7"
              isLoading={isSubmitting}
            />

            <CustomButton
              title={"Upload Profile Photo"}
              handlePress={submit}
              containerStyles="w-full mt-1"
              isLoading={isSubmitting}
            />
            <CustomButton
              title={"Cancel"}
              handlePress={() => {}}
              containerStyles="w-full mt-1"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default UploadProfile;
