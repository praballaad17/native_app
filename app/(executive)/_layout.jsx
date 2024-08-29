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
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default ExecutiveLayout;
