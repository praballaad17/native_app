import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const deleteAccount = () => {
    // Logic to delete the account
    console.log("Account deleted");
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.subheading}>App Preference</Text>
            {/* Dark Mode Toggle */}
            <View style={styles.settingRow}>
              <View style={styles.subRow}>
                <Icon name="brightness-6" size={24} color="#888" />
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={(value) => setIsDarkMode(value)}
              />
            </View>
            <Text style={styles.subheading}>Privacy & Security</Text>
            {/* Notifications Toggle */}
            <View style={styles.settingRow}>
              <View style={styles.subRow}>
                <Icon name="notifications" size={24} color="#888" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={(value) => setIsNotificationsEnabled(value)}
              />
            </View>

            {/* Account Settings */}
            <TouchableOpacity
              style={styles.settingRow}
              // onPress={() => router.push("/account-settings")}
            >
              <View style={styles.subRow}>
                <Icon name="account-circle" size={24} color="#888" />
                <Text style={styles.settingText}>Account Settings</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            {/* Privacy Policy */}
            <TouchableOpacity
              style={styles.settingRow}
              // onPress={() => router.push("/privacy-policy")}
            >
              <View style={styles.subRow}>
                <Icon name="policy" size={24} color="#888" />
                <Text style={styles.settingText}>Privacy Policy</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
            <CustomButton
              title={"Delete Account"}
              handlePress={deleteAccount}
              containerStyles="mt-4 bg-white border border-red-300  min-h-[42px]"
              textStyles="text-orange-600 text-sm"
              // isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 15,
    // fontWeight: "bold",
    // marginBottom: 10,
    color: "#888",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  subRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 18,
    marginLeft: 10,
  },
  arrow: {
    fontSize: 22,
    color: "#888",
  },
});
