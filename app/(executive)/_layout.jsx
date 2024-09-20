import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ExecutiveLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="resume-upload"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="upload-pdf"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="upload-profile"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="approval-pending"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="patient-profile-form"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="medical-data-form"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="prescription-form"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="view-patient-profile" />

        <Stack.Screen
          name="executive-resume-form"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="payouts"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default ExecutiveLayout;
