import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const CustomDropdownSelect = ({
  options,
  onSelect,
  placeholder,
  selectedValue,
  // setSelectedValue,
  containerStyles,
  dropdownStyle,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  // Handle selecting an option from the dropdown
  const handleSelect = (option) => {
    console.log(option.value);
    // setSelectedValue(option);
    setIsVisible(false);
    onSelect(option.value); // Pass the selected option to parent via onSelect prop
  };

  console.log(selectedValue);

  return (
    <View className={`w-full mb-2 ${containerStyles}`}>
      {/* Display the selected value */}
      <TouchableOpacity
        style={styles.dropdown}
        className={`flex-row justify-between ${dropdownStyle}`}
        onPress={toggleDropdown}
      >
        <Text style={styles.dropdownText}>
          {selectedValue ? selectedValue : placeholder}
        </Text>
        <FontAwesome name="angle-down" size={24} color="black" />
      </TouchableOpacity>

      {/* Render the dropdown options when visible */}
      {isVisible && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    color: "black",
  },
  dropdownMenu: {
    position: "absolute",
    width: "100%",
    top: "0px",
    zIndex: 100,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "white",
    maxHeight: "auto", // Set a max height for the dropdown menu
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default CustomDropdownSelect;
