import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PhotoUpload = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const submit = () => {
    //
    router.push("/personal-details");
  };

  // Function to pick an image from the device's media library
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
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setFile(result.assets[0].uri);

        // Clear any previous errors
        setError(null);
      }
    }
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text>PhotoUpload</Text>

            {/* Conditionally render the image or error message */}
            {file ? (
              // Display the selected image
              <View>
                <Text>Image:</Text>
                <Image
                  resizeMode="contain"
                  className="w-full h-[65vh]"
                  source={{ uri: file }}
                />
              </View>
            ) : (
              // Display an error message if there's
              // an error or no image selected
              <View className="w-full">
                <View style={styles.container}>
                  <View
                    resizeMode="contain"
                    className="w-full h-[65vh] border-[black] mt-5"
                    style={styles.squareBox}
                  />
                </View>
                <Text>{error}</Text>
              </View>
            )}

            <CustomButton
              title={"Select"}
              handlePress={pickImage}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <CustomButton
              title={"Upload"}
              handlePress={submit}
              containerStyles="mt-1"
              isLoading={isSubmitting}
            />
            <CustomButton
              title={"Cancel"}
              handlePress={() => {}}
              containerStyles="mt-1"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center", // Centers the square in the middle of the screen
    alignItems: "center", // Centers the square horizontally
  },
  squareBox: {
    borderWidth: 2, // Thickness of the border
    borderColor: "black", // Color of the border
    backgroundColor: "white", // Background color (can be set to 'transparent' for a transparent square)
  },
});
export default PhotoUpload;
