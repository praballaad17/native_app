import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const PatientLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="patient-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="subscription"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="appointment"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="patient-consultations"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="consultation-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="upload-prescription"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="patient-upload-medical"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="doctor-interaction"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="view-prescription"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="edit-profile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default PatientLayout;
