import { Redirect, Link, router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState(null);

  // const handlePress = (buttonName) => {
  //   Alert.alert(`You pressed ${buttonName}`);
  // };
  useEffect(() => {
    setUser("patient");
    // setUser("doctor");
  }, []);

  if (!user) {
    return <Redirect href="/role" />;
  }

  if (user === "patient") {
    return <Redirect href="/patient-home" />;
  }

  if (user === "doctor") {
    return <Redirect href="/doctor-home" />;
  }

  return <Redirect href="/home" />;
}
