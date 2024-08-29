import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

const EditProfile = () => {
  const params = useLocalSearchParams();
  console.log("patient", params);
  const { name, age, gender, contact, address, profileImage } = params;
  const [profileData, setProfileData] = useState(params);
  // const navigation = useNavigation();

  const handleImageChange = () => {
    //   navigation.navigate("ImagePicker", {
    //     onImageSelected: (uri) => {
    //       setProfileData((prevData) => ({ ...prevData, profileImage: uri }));
    //     },
    //   });
  };

  const handleSave = () => {
    // Save profile data logic here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profileData.profileImage }}
        style={styles.profileImage}
      />
      <Button title="Change Profile Picture" onPress={handleImageChange} />

      <TextInput
        style={styles.input}
        value={profileData.name}
        placeholder="Name"
        onChangeText={(text) => setProfileData({ ...profileData, name: text })}
      />
      <TextInput
        style={styles.input}
        value={profileData.age.toString()}
        placeholder="Age"
        keyboardType="numeric"
        onChangeText={(text) =>
          setProfileData({ ...profileData, age: parseInt(text) })
        }
      />
      <TextInput
        style={styles.input}
        value={profileData.gender}
        placeholder="Gender"
        onChangeText={(text) =>
          setProfileData({ ...profileData, gender: text })
        }
      />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default EditProfile;
