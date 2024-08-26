import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Use any icon library you like

const DosageTab = ({ selectedMeals, setSelectedMeals }) => {
  const handleSelectMeal = (meal) => {
    setSelectedMeals((prevMeals) => ({
      ...prevMeals,
      [meal]: !prevMeals[meal], // Toggle the selection of the meal
    }));
  };

  return (
    <View style={styles.container}>
      {/* Breakfast */}
      <TouchableOpacity
        style={[
          styles.mealOption,
          selectedMeals.breakfast && styles.selectedMeal, // Highlight if selected
        ]}
        onPress={() => handleSelectMeal("breakfast")}
      >
        <Icon
          name="coffee" // Breakfast icon (e.g., coffee cup)
          size={40}
          color={selectedMeals.breakfast ? "#FFA500" : "#000"} // Orange if selected
        />
        <Text style={styles.text}>Breakfast</Text>
      </TouchableOpacity>

      {/* Lunch */}
      <TouchableOpacity
        style={[
          styles.mealOption,
          selectedMeals.lunch && styles.selectedMeal, // Highlight if selected
        ]}
        onPress={() => handleSelectMeal("lunch")}
      >
        <Icon
          name="food" // Lunch icon (e.g., food plate)
          size={40}
          color={selectedMeals.lunch ? "#FFA500" : "#000"} // Orange if selected
        />
        <Text style={styles.text}>Lunch</Text>
      </TouchableOpacity>

      {/* Dinner */}
      <TouchableOpacity
        style={[
          styles.mealOption,
          selectedMeals.dinner && styles.selectedMeal, // Highlight if selected
        ]}
        onPress={() => handleSelectMeal("dinner")}
      >
        <Icon
          name="silverware-fork-knife" // Dinner icon (e.g., fork and knife)
          size={40}
          color={selectedMeals.dinner ? "#FFA500" : "#000"} // Orange if selected
        />
        <Text style={styles.text}>Dinner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-around", // Distribute the icons evenly
    padding: 20,
  },
  mealOption: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  selectedMeal: {
    backgroundColor: "#f0f0f0", // Light gray background for selected item
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default DosageTab;
