import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FoodToggleButton = ({ isBeforeFood, setIsBeforeFood }) => {
  // Function to toggle between before and after food
  const toggleFoodTiming = (selection) => {
    setIsBeforeFood(selection === "before");
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {/* Before Food Button */}
        <TouchableOpacity
          style={[
            styles.option,
            isBeforeFood ? styles.selectedOption : styles.unselectedOption,
          ]}
          onPress={() => toggleFoodTiming("before")}
        >
          <Text
            style={[
              styles.optionText,
              isBeforeFood ? styles.selectedText : styles.unselectedText,
            ]}
          >
            Before Food
          </Text>
        </TouchableOpacity>

        {/* After Food Button */}
        <TouchableOpacity
          style={[
            styles.option,
            !isBeforeFood ? styles.selectedOption : styles.unselectedOption,
          ]}
          onPress={() => toggleFoodTiming("after")}
        >
          <Text
            style={[
              styles.optionText,
              !isBeforeFood ? styles.selectedText : styles.unselectedText,
            ]}
          >
            After Food
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  toggleContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#FFA500", // Orange for selected
  },
  unselectedOption: {
    backgroundColor: "#f0f0f0", // Light gray for unselected
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#fff", // White text for selected option
  },
  unselectedText: {
    color: "#000", // Black text for unselected option
  },
});

export default FoodToggleButton;
