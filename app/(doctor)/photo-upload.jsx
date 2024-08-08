import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import * as ImagePicker from "expo-image-picker";
import CustomButton from '../../components/CustomButton';

const PhotoUpload = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const submit = () => {
        //
    }

      // Function to pick an image from the device's media library
    const pickImage = async () => {
        const { status } = await ImagePicker.
            requestMediaLibraryPermissionsAsync();

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
            const result =
                await ImagePicker.launchImageLibraryAsync();

            if (!result.cancelled) {

                // If an image is selected (not cancelled), 
                // update the file state variable
                setFile(result.uri);

                // Clear any previous errors
                setError(null);
            }
        }
    };
  return (
    <View>
      <Text>PhotoUpload</Text>

      <CustomButton 
        title={"Upload"} handlePress={pickImage} containerStyles="mt-7" isLoading={isSubmitting} />
    
        {/* Conditionally render the image or error message */}
            {file ? (
                // Display the selected image
                <View style={styles.imageContainer}>
                    <Image source={{ uri: file }}
                        style={styles.image} />
                </View>
            ) : (
                // Display an error message if there's 
                // an error or no image selected
                <Text style={styles.errorText}>{error}</Text>
            )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    header: {
        fontSize: 20,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageContainer: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginTop: 16,
    },
});

export default PhotoUpload