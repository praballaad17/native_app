import { View, Text, StyleSheet, Switch, TouchableOpacity, } from "react-native";
import React, {useState} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Dark Mode Toggle */}
            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={(value) => setIsDarkMode(value)}
              />
            </View>

            {/* Notifications Toggle */}
            <View style={styles.settingRow}>
              <Text style={styles.settingText}>Notifications</Text>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={(value) => setIsNotificationsEnabled(value)}
              />
            </View>

            {/* Account Settings Button */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => navigation.navigate("AccountSettings")}
            >
              <Text style={styles.settingText}>Account Settings</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            {/* Privacy Policy Button */}
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() => navigation.navigate("PrivacyPolicy")}
            >
              <Text style={styles.settingText}>Privacy Policy</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  settingText: { fontSize: 18 },
  arrow: { fontSize: 22, color: '#888' },
});
