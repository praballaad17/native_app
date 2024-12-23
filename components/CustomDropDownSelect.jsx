import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
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

  console.log(options);

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

  const handleLayout = (event) => {
    const { x, y, height } = event.nativeEvent.layout;
    setDropdownPosition({ x, y: y + height });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
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
              { top: dropdownPosition.y, left: dropdownPosition.x },
            ]}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(option.key);
                  setIsVisible(false);
                }}
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
