import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalSearchParams } from "expo-router";
import { GENDEROPTIONS, USERS } from "../../constants";
import CustomForm from "../../components/CustomForm";
import { editPatientDetails } from "../../services/patientServices";
import { editDoctorDetails } from "../../services/doctorServices";

const ProfileEdit = () => {
  const { Profile, Fields, user } = useLocalSearchParams();

  const profile = JSON.parse(Profile);
  const fields = JSON.parse(Fields);

  const handleFormSubmit = (formData) => {
    let res;
    if (user === USERS.EXECUTIVE) {
      res = editExecutiveDetails(formData, profile._id);
    } else if (user === USERS.DOCTOR) {
      res = editDoctorDetails(formData, profile._id);
    } else if (user === USERS.PATIENT) {
      res = editPatientDetails(formData, profile._id);
    }
    console.log("Form Submitted", formData);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={styles.container}>
          <View className="border-b py-4 mb-4 border-black-100">
            <Text className="text-2xl font-psemibold">
              Hi {user === USERS.DOCTOR ? "Dr." : ""}{" "}
              {profile.name.length ? profile.name : "there"}!
            </Text>
            <Text className="text-lg text-gray-600">Joined us Aug, 2024</Text>
          </View>
          <Text className="text-lg font-psemibold">Details</Text>
          <CustomForm
            fields={fields}
            onSubmit={handleFormSubmit}
            data={profile}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ProfileEdit;
