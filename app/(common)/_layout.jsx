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
            headerTitle: "Location",
          }}
        />
        <Stack.Screen
          name="notification"
          options={{
            headerTitle: "Notifications",
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
            headerTitle: "Select Membership",
          }}
        />
        <Stack.Screen
          name="payments-methods"
          options={{
            headerTitle: "Payments Methods",
          }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{
            headerTitle: "Edit Profile",
          }}
        />
        <Stack.Screen
          name="refer-earn"
          options={{
            headerTitle: "Refer & Earn",
          }}
        />
        <Stack.Screen
          name="pill-reminder"
          options={{
            headerTitle: "Pill Reminder",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerTitle: "Settings",
          }}
        />
        <Stack.Screen
          name="about-us"
          options={{
            headerTitle: "About Us",
          }}
        />
        <Stack.Screen
          name="need-help"
          options={{
            headerTitle: "Need Help",
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default CommonLayout;
