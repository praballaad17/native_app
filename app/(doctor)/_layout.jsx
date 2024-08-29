import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const DocLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="photo-upload"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="personal-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="apointments"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="get-varified-notification"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default DocLayout;
