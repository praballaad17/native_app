import { View, Text } from "react-native";
import React from "react";
import GetVarifiedNotification from "../(doctor)/get-varified-notification";

const home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="test-3xl text-green">Hello doctor home!</Text>
      <GetVarifiedNotification />
    </View>
  );
};

export default home;
