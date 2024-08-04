import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  // return <Redirect href={'/home'} />

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl ">Hello  asdffd</Text>
      <StatusBar style="auto" />
    </View>
  );
}
 