import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";

const CustomToggleButton = ({
  task1 = "Task 1",
  task2 = "Task 2",
  setIsTask1Active,
  isTask1Active,
}) => {
  // const [isTask1Active, setIsTask1Active] = useState(true);

  const toggleTask = () => {
    setIsTask1Active(!isTask1Active);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#007BFF",
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        onPress={toggleTask}
        style={{
          flex: 1,
          backgroundColor: isTask1Active ? "#007BFF" : "white",
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color: isTask1Active ? "white" : "#007BFF", fontSize: 16 }}
        >
          {task1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleTask}
        style={{
          flex: 1,
          backgroundColor: isTask1Active ? "white" : "#007BFF",
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ color: isTask1Active ? "#007BFF" : "white", fontSize: 16 }}
        >
          {task2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomToggleButton;
