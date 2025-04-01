import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
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
  const [dropdownPosition, setDropdownPosition] = React.useState(null);

  // Toggle the visibility of the dropdown
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  // Handle selecting an option from the dropdown
  const handleSelect = (option) => {
    setIsVisible(false);
    onSelect(option.value); // Pass the selected option to parent via onSelect prop
  };

  const handleLayout = (event) => {
    const { x, y, height } = event.nativeEvent.layout;
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width; // Get screen width
    const optionHeight = 50;
    const dropdownHeight = Math.min(options.length * optionHeight, 200); // Adjust this value based on your dropdown height
    const dropdownY = screenHeight - dropdownHeight - 20; // 20px padding from the bottom

    setDropdownPosition({
      x: 0,
      y: dropdownY,
      height: dropdownHeight,
      width: screenWidth,
    }); // Set width to screen width
  };

  return (
    <View style={styles.dropdownButton}>
      <TouchableOpacity
        // style={styles.dropdownButton}
        onPress={toggleDropdown}
        onLayout={handleLayout}
      >
        <Text>{selectedValue || placeholder || "Select an option"}</Text>
      </TouchableOpacity>

      {isVisible && dropdownPosition && (
        <Modal transparent={true} animationType="fade">
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={() => setIsVisible(false)}
          />
          <View
            style={[
              styles.dropdownList,
              {
                top: dropdownPosition.y,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
              }, // Set width
            ]}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelect(option)}
              >
                <Text>{option.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownList: {
    position: "absolute",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
    zIndex: 1000,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default CustomDropdownSelect;
