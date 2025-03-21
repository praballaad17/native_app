import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const CustomButtonFlex = ({ title, handlePress, isLoading, disabled, containerStyles, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading || disabled}
      style={[
        {
          backgroundColor: disabled ? "#ccc" : "#007bff",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        },
        containerStyles,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[{ color: "#fff", fontSize: 16, fontWeight: "bold" }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButtonFlex;
