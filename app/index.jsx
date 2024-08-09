import { Redirect, Link, router } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function Index() {
  const [user, setUser] = useState(false); 

  // const handlePress = (buttonName) => {
  //   Alert.alert(`You pressed ${buttonName}`);
  // };

  if(!user) {
    return <Redirect href="/role" />;
  }

  return <Redirect href="/home" />;

}
 