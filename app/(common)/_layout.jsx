import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CommonLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="location"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="notification"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="image-picker"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default CommonLayout;
