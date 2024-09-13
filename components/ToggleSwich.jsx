import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const ToggleSwitch = ({ title, toggleTitle = false }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text className="text-base font-psemibold">{title}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#ffc375" }}
        thumbColor={isEnabled ? "#FF9C01" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default ToggleSwitch;
