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
        <Stack.Screen
          name="select-membership"
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

        <Stack.Screen
          name="refer-earn"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="pill-reminder"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="about-us"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="need-help"
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
